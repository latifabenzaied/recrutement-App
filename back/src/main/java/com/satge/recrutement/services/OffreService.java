package com.satge.recrutement.services;
import com.satge.recrutement.entity.Offre;
import com.satge.recrutement.entity.User;
import com.satge.recrutement.repositories.OffreRepository;
import com.satge.recrutement.repositories.UserRepository;
import com.satge.recrutement.communication.OffreMapper;
import com.satge.recrutement.communication.OffreRequest;
import com.satge.recrutement.communication.OffreResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        User user = userRepository.findById(userId).get();
        Offre offre = offreRepository.findById(offreId).get();
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
        Offre offre = offreRepository.findById(offreId).get();
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

    public Offre update(Integer id, OffreRequest request) {
        Offre existingOffre = this.getOffreById(id);
        if(existingOffre != null) {
            existingOffre.setTitle(request.title());
            existingOffre.setDescription(request.description());
            existingOffre.setResponsabilites(request.responsabilites());
            existingOffre.setProfil(request.profil());
            existingOffre.setDateExpiration(request.expirationDate());
            existingOffre.setShareable(request.shareable());
            existingOffre.setTypeContrat(request.typeContrat());
            return offreRepository.save(existingOffre);
        }
        return existingOffre;
    }

    public void deleteOffre(Offre offre) {

        userRepository.findAll().forEach(user -> user.getFavoriteOffers().remove(offre));
        offreRepository.delete(offre);
    }

}
