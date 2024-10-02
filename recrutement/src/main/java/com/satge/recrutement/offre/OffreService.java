package com.satge.recrutement.offre;
import com.satge.recrutement.user.User;
import com.satge.recrutement.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OffreService {
    private final OffreMapper offreMapper;
    private final OffreRepository offreRepository;
    private final UserRepository userRepository;

    public Integer save(OffreRequest request, int id) {
        User user = userRepository.findById(id).get();
        Offre offre = offreMapper.toOffre(request);
        offre.setPublisher(user);
        return offreRepository.save(offre).getId();
    }

    public OffreResponse findById(Integer bookId) {
        return offreRepository.findById(bookId)
                .map(offreMapper::toOffreResponse)
                .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + bookId));
    }
    @Transactional
    public void addFavoriteOffer(int userId, int offreId) {
        System.out.println(userId);
        User user = userRepository.findById(userId).get();
        Offre offre = offreRepository.findById(offreId).orElseThrow(() -> new RuntimeException("Offer not found"));
        user.getFavoriteOffers().add(offre);
        userRepository.save(user);
    }


public List<OffreResponse> getNonArchivedOffres() {

    List<Offre> offres = offreRepository.findByArchivedFalse();
    return offres.stream()
            .map(offreMapper::toOffreResponse)
            .collect(Collectors.toList());
}

    public Integer updateArchivedStatus(Integer offreId) {
        Offre offre = offreRepository.findById(offreId)
                .orElseThrow(() -> new EntityNotFoundException("No book found with ID:: " + offreId));
        offre.setArchived(!offre.isArchived());
        offreRepository.save(offre);
        return offreId;
    }
    public List<Offre> getAllOffres() {
        return offreRepository.findAll();
    }


    public Offre getOffreById(Integer id) {
        return offreRepository.findById(id).orElse(null);
    }
    public Offre update(Offre offre) {
        return offreRepository.save(offre);
    }

    public void deleteOffre(Integer offreId) {

        Offre offre = offreRepository.findById(offreId).orElseThrow(() -> new EntityNotFoundException("Offre not found"));
        userRepository.findAll().forEach(user -> user.getFavoriteOffers().remove(offre));
        offreRepository.delete(offre);
    }

}
