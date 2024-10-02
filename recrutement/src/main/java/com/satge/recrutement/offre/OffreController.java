package com.satge.recrutement.offre;

import com.satge.recrutement.auth.AuthenticationService;
import com.satge.recrutement.notification.NotificationStorageService;
import com.satge.recrutement.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.time.LocalDate;
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
    @Autowired
    private NotificationStorageService notificationStorageService;
    @PostMapping("/AddOffre")
    public ResponseEntity<Integer> saveBook(
            @Valid @RequestBody OffreRequest request,
            User user
    )
    {
        Integer savedOffre = offreService.save(request, 2);
        Integer id=savedOffre;
        String titreOffre = request.title();
        LocalDateTime currentDateTime = LocalDateTime.now();
        String message = String.format("Nouvelle offre publiée : %s. Date de publication : %s. l'id: %d",
                titreOffre,
                currentDateTime.toString(),
                id);
        notificationStorageService.sendOrStoreNotification("all-users", message);
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
    @GetMapping("/test")
    public int test(@RequestParam String email) {
        return authservice.getUserIdByEmail(email);
    }
    @PatchMapping("/archived/{offer-id}")
    public ResponseEntity<Integer> updateArchivedStatus(
            @PathVariable("offer-id") Integer bookId

    ) {
        return ResponseEntity.ok(offreService.updateArchivedStatus(bookId));
    }
    @GetMapping("/all")
    public ResponseEntity<List<OffreResponse>> getAllOffres() {
        List<Offre> offres = offreService.getAllOffres();
        List<OffreResponse> offreResponses = offres.stream()
                .map(offreMapper::toOffreResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)  // Assurez-vous que le Content-Type est bien JSON
                .body(offreResponses);
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

    @PostMapping ("/update/{id}")
    public ResponseEntity<OffreResponse> updateOffre(
            @PathVariable("id") Integer id,
            @Valid @RequestBody OffreRequest request
    ) {

        Offre existingOffre = offreService.getOffreById(id);
        if (existingOffre == null) {
            return ResponseEntity.notFound().build();
        }
        existingOffre.setTitle(request.title());
        existingOffre.setDescription(request.description());
        existingOffre.setResponsabilites(request.responsabilites());
        existingOffre.setProfil(request.profil());
        existingOffre.setDateExpiration(request.expirationDate());
        existingOffre.setShareable(request.shareable());
        existingOffre.setTypeContrat(request.typeContrat());
        offreService.update(existingOffre);
        OffreResponse offreResponse = offreMapper.toOffreResponse(existingOffre);
        return ResponseEntity.ok(offreResponse);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteOffre(@PathVariable("id") Integer id) {
        Offre existingOffre = offreService.getOffreById(id);
        if (existingOffre == null) {
            return ResponseEntity.notFound().build();
        }

        offreService.deleteOffre(id);
        return ResponseEntity.noContent().build();
    }

//    @GetMapping("/userFavorites")
//    public ResponseEntity<List<Offre>> getFavoriteOffers(@RequestParam String email) {
//        int userId = authservice.getUserIdByEmail(email);
//        List<Offre> favoriteOffers = offreService.getFavoriteOffersByUserId(userId);
//        return ResponseEntity.ok(favoriteOffers);
//    }

}
