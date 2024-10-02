package com.satge.recrutement.user;

import com.satge.recrutement.offre.Offre;
import com.satge.recrutement.offre.OffreMapper;
import com.satge.recrutement.offre.OffreRepository;
import com.satge.recrutement.offre.OffreResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OffreRepository offreRepository;
    @Autowired
    private OffreMapper offreMapper;

    public User getUserById(String email) {
        return userRepository.findByEmail(email).get();
    }

    public Set<OffreResponse> getUserFavoriteOffersByEmail(String email) {
        User user = getUserById(email);
        if (user != null) {
            return user.getFavoriteOffers().stream()
                    .map(offreMapper::toOffreResponse)
                    .collect(Collectors.toSet());
        }
        return null;
    }
    public void removeFavoriteOffer(String email, Integer offerId) {
        User user = getUserById(email);
        Offre offer = this.offreRepository.findById(offerId).get();
        user.getFavoriteOffers().remove(offer);
        userRepository.save(user);
    }
}
