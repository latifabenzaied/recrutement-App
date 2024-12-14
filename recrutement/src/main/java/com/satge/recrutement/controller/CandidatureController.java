package com.satge.recrutement.controller;

import com.satge.recrutement.communication.CandidatureMapper;
import com.satge.recrutement.communication.CandidatureRequest;
import com.satge.recrutement.communication.CandidatureResponse;
import com.satge.recrutement.repositories.CandidatureRepository;
import com.satge.recrutement.entity.Candidature;
import com.satge.recrutement.entity.User;
import com.satge.recrutement.entity.CandidatureStatus;
import com.satge.recrutement.services.CvAnalysisService;
import com.satge.recrutement.services.EmailService;
import com.satge.recrutement.services.NotificationService;

import com.satge.recrutement.entity.Candidature;
import com.satge.recrutement.repositories.UserRepository;
import com.satge.recrutement.services.CandidatureService;
import com.satge.recrutement.tools.MyTools;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.core.io.Resource;
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

@Slf4j
@RestController
@RequestMapping("candidature")
//@RequiredArgsConstructor
@AllArgsConstructor

public class CandidatureController {

    private   CandidatureService candidatureService;
    private NotificationService notificationService;
    private CandidatureMapper candidatureMapper;
    private   EmailService emailService;
    private   UserRepository userRepository;
    private CandidatureRepository candidatureRepository;
//    private  CandidatureRequest candidatureRequest;

    private final MyTools myTools;
    private static final String FLASK_API_URL = "http://127.0.0.1:5000/check-compatibility"; // URL de votre API Flask
    private final CvAnalysisService cvAnalysisService;

    @PostMapping(value = "/Add",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> createCondidature(
            @RequestParam("cv") MultipartFile cv,
            @RequestParam("email") String email,
            @RequestParam("offreId") Integer offreId) throws IOException {
        if (email == null || offreId == null) {
            return ResponseEntity.badRequest().build();
        }

        String compatibilityResult=cvAnalysisService.analyzeCv(offreId, cv);
        String contentEmail= StringEscapeUtils.unescapeJava(compatibilityResult).substring(StringEscapeUtils.unescapeJava(compatibilityResult).indexOf(":")+2,StringEscapeUtils.unescapeJava(compatibilityResult).lastIndexOf("."));
        if (!compatibilityResult.contains("Oui")) {
            emailService.sendEmailEtat("latifabenzaied23@gmail.com","Retour suite à votre candidature",contentEmail);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(compatibilityResult);
        }
        CandidatureRequest candidatureRequest = CandidatureRequest.builder().cv(cv).build();
        candidatureRequest.setCv(cv);
        Candidature candidature = candidatureService.createCondidature(candidatureRequest, email, offreId);
        notificationService.sendOrStoreNotification("admin", "message");
        return ResponseEntity.status(HttpStatus.CREATED).body(candidature.toString());
    }

    @PatchMapping("/editstatus")
    public ResponseEntity<Candidature> updateCondidatureStatus(
            @RequestParam("id") Integer id,
            @RequestParam("status") CandidatureStatus newStatus,
            @RequestParam(value = "customMessage",required = false) String customMessage ) {
        Candidature updatedCandidature = candidatureService.updateStatus(id, newStatus);
        log.info(customMessage);
        emailService.sendStatusChangeEmail(updatedCandidature, customMessage);
        return ResponseEntity.ok(updatedCandidature);
    }

    @GetMapping("/getApplicatins/{email}")
    public ResponseEntity<List<CandidatureResponse>> getCandidaturesByUser(@PathVariable String email) {
        User user=userRepository.findByEmail(email).get();
        List<Candidature> candidatures = candidatureService.getCandidaturesByUser(user.getId());
        List<CandidatureResponse> candidatureResponse = candidatures.stream()
                .map(candidatureMapper::toCandidatureResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(candidatureResponse);
    }

    @GetMapping("/getByOffre/{offreId}")
    public ResponseEntity<List<CandidatureResponse>> getCandidaturesByOffre(@PathVariable Integer offreId) {
        List<Candidature> candidatures = candidatureService.getCandidaturesByOffre(offreId);
        List<CandidatureResponse> response = candidatures.stream()
                .map(candidatureMapper::toCandidatureResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/download-cv/{fileName}")
    public ResponseEntity<Resource> downloadCv(@PathVariable String fileName) {
        try {

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
