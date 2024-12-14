package com.satge.recrutement.services;

import com.satge.recrutement.entity.Offre;
import com.satge.recrutement.entity.User;
import com.satge.recrutement.repositories.UserRepository;
import com.satge.recrutement.communication.OffreMapper;
import com.satge.recrutement.repositories.OffreRepository;
import com.satge.recrutement.communication.OffreResponse;
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
