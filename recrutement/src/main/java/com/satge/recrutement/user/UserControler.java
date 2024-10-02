package com.satge.recrutement.user;

import com.satge.recrutement.offre.Offre;
import com.satge.recrutement.offre.OffreResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserControler {
    @Autowired
    private UserService userService;

    @GetMapping("/{email}")
    public User getUserById(@PathVariable String email) {
        return userService.getUserById(email);
    }
    @GetMapping("/favorite-offers/{email}")
    public Set<OffreResponse> getUserFavoriteOffers(@PathVariable String email) {
        return userService.getUserFavoriteOffersByEmail(email);
    }
    @DeleteMapping("/favorites/{email}/{offerId}")
    public void removeFavoriteOffer(@PathVariable String email, @PathVariable Integer offerId) {
        userService.removeFavoriteOffer(email, offerId);
    }
}
