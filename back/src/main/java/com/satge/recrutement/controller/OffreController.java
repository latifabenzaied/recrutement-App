package com.satge.recrutement.controller;

import com.satge.recrutement.communication.OffreMapper;

import com.satge.recrutement.entity.Offre;
import com.satge.recrutement.services.AuthenticationService;
import com.satge.recrutement.services.NotificationService;

import com.satge.recrutement.communication.OffreRequest;
import com.satge.recrutement.communication.OffreResponse;
import com.satge.recrutement.services.OffreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("offre")
@RequiredArgsConstructor

public class OffreController {
    private final OffreService offreService;
    private final OffreMapper offreMapper;
    private final AuthenticationService authservice;
    private final NotificationService notificationService;

    @PostMapping("/AddOffre")
    public ResponseEntity<Integer> saveOffre(@Valid @RequestBody OffreRequest offreRequest)
    {
        Integer savedOffre = offreService.save(offreRequest,2);
        String message = String.format("Nouvelle offre publiée : %s. Date de publication : %s. l'id: %d",
                offreRequest.title(),
                LocalDateTime.now(),
                savedOffre);
        notificationService.sendOrStoreNotification("all-users", message);
        return ResponseEntity.ok(savedOffre);
    }

    @PostMapping("/addFavorite")
    public ResponseEntity<String> addFavorite(@RequestParam int offerId, @RequestParam String email) {
    int userId = authservice.getUserIdByEmail(email);
    offreService.addFavoriteOffer(userId,offerId);
    return ResponseEntity.ok("Favorite added successfully!");
}
    @GetMapping("/non-archived")
    public ResponseEntity<List<OffreResponse>> getNonArchivedOffres() {
        List<OffreResponse> offres = offreService.getNonArchivedOffres();
        return ResponseEntity.ok(offres);
    }

    @PatchMapping("/archived/{offer-id}")
    public ResponseEntity<Integer> updateArchivedStatus(@PathVariable("offer-id") Integer offerId)
    {
        return ResponseEntity.ok(offreService.updateArchivedStatus(offerId));
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<OffreResponse>> getAllOffres() {
        List<Offre> offres = offreService.getAllOffres();
        List<OffreResponse> offreResponses = offres.stream()
                .map(offreMapper::toOffreResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(offreResponses);
    }


    @GetMapping("/{id}")
    public ResponseEntity<OffreResponse> getOffreById(@PathVariable("id") Integer id) {
        Offre offre = offreService.getOffreById(id);
        if (offre == null) {
            return ResponseEntity.notFound().build();
        }
        OffreResponse offreResponse = offreMapper.toOffreResponse(offre);
        return ResponseEntity.ok(offreResponse);
    }
    @PatchMapping("/test/{id}")
    public ResponseEntity<Offre> test(
            @PathVariable("id") Integer id,
            @Valid @RequestBody OffreRequest request
    ) {
        offreService.update(id,request);
        return ResponseEntity.ok(offreService.update(id,request));
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<OffreResponse> updateOffre(
            @PathVariable("id") Integer id,
            @Valid @RequestBody OffreRequest request
    ) {
        if (offreService.update(id,request) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(offreMapper.toOffreResponse(offreService.update(id,request)));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseEntity.BodyBuilder> deleteOffre(@PathVariable("id") Integer id) {
        Offre existingOffre = offreService.getOffreById(id);
        if (existingOffre == null) {
            return ResponseEntity.notFound().build();
        }
        offreService.deleteOffre(existingOffre);
        return ResponseEntity.ok().build();
    }


}
