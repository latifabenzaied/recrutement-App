package com.satge.recrutement.controller;

import com.satge.recrutement.communication.OffreResponse;
import com.satge.recrutement.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserControler {

    private final UserService userService;


    @GetMapping("/favorite-offers/{email}")
    public Set<OffreResponse> getUserFavoriteOffers(@PathVariable String email) {
        return userService.getUserFavoriteOffersByEmail(email);
    }
    @DeleteMapping("/favorites/{email}/{offerId}")
    public void removeFavoriteOffer(@PathVariable String email, @PathVariable Integer offerId) {
        userService.removeFavoriteOffer(email, offerId);
    }
}
