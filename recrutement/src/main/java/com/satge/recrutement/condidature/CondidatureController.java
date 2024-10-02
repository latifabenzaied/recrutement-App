package com.satge.recrutement.condidature;

import com.satge.recrutement.email.EmailService;
import com.satge.recrutement.notification.NotificationStorageService;
import com.satge.recrutement.user.User;
import com.satge.recrutement.user.UserRepository;
import com.satge.recrutement.user.UserService;
import org.springframework.core.io.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("condidature")
@RequiredArgsConstructor
public class CondidatureController {

    private final CondidatureService condidatureService;
    @Autowired
    private NotificationStorageService notificationStorageService;
    @Autowired
    private CandidatureMapper candidatureMapper;
    @Autowired
    private EmailService emailService;
    private final UserRepository userRepository;

    @PostMapping("/Add")
    public ResponseEntity<Condidature> createCondidature(
            @RequestPart("cv") MultipartFile cv,
            @RequestParam("email") String email,
            @RequestParam("offreId") Integer offreId) throws IOException {
        if (email == null || offreId == null) {
            return ResponseEntity.badRequest().build();
        }
        CondidatureRequest condidatureRequest = new CondidatureRequest();
        condidatureRequest.setCv(cv);
        Condidature condidature = condidatureService.createCondidature(condidatureRequest, email, offreId);
        String adminUserId = "admin"; // ID de l'administrateur
//        String message = "L'utilisateur " + userId + " a postulé à l'offre " + offerId;
        notificationStorageService.sendOrStoreNotification(adminUserId, "message");
        return ResponseEntity.ok(condidature);

    }

    @PatchMapping("/editstatus")
    public ResponseEntity<Condidature> updateCondidatureStatus(
            @RequestParam("id") Integer id,
            @RequestParam("status") CondidatureStatus newStatus,
            @RequestParam(value = "customMessage", required = false) String customMessage) {
        Condidature updatedCondidature = condidatureService.updateStatus(id, newStatus);
        emailService.sendStatusChangeEmail(updatedCondidature, customMessage);
        return ResponseEntity.ok(updatedCondidature);
    }
    //mes candidatures
    @GetMapping("/get/{email}")
    public ResponseEntity<List<CondidatureResponse>> getCandidaturesByUser(@PathVariable String email) {
        User user=userRepository.findByEmail(email).get();
        List<Condidature> candidatures = condidatureService.getCandidaturesByUser(user.getId());
        List<CondidatureResponse> response = candidatures.stream()
                .map(candidatureMapper::toCandidatureResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getByOffre/{offreId}")
    public ResponseEntity<List<CondidatureResponse>> getCandidaturesByOffre(@PathVariable Integer offreId) {
        List<Condidature> candidatures = condidatureService.getCandidaturesByOffre(offreId);
        List<CondidatureResponse> response = candidatures.stream()
                .map(candidatureMapper::toCandidatureResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }
    @GetMapping("/download-cv/{fileName}")
    public ResponseEntity<Resource> downloadCv(@PathVariable String fileName) {
        try {
            // Répertoire où les fichiers sont stockés
            String cvDirectory = "resources/cv_uploads/";
            Path filePath = Paths.get(cvDirectory, fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
