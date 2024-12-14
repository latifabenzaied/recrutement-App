package com.satge.recrutement.services;


import com.satge.recrutement.communication.CandidatureRequest;
import com.satge.recrutement.entity.Candidature;
import com.satge.recrutement.entity.CandidatureStatus;
import com.satge.recrutement.entity.Offre;
import com.satge.recrutement.repositories.CandidatureRepository;
import com.satge.recrutement.repositories.OffreRepository;
import com.satge.recrutement.entity.User;

import com.satge.recrutement.repositories.UserRepository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;


@Service

@AllArgsConstructor
public class CandidatureService {

    private CandidatureRepository candidatureRepository;
    private OffreRepository offreRepository;
    private UserRepository userRepository;



    public Candidature createCondidature(CandidatureRequest candidatureRequest, String email, Integer offreId) throws IOException {
        User user = userRepository.findByEmail(email).get();
        Offre offre = offreRepository.findById(offreId).get();
        if (candidatureRepository.findByUserAndOffre(user, offre)!= null) {
            candidatureRepository.delete(candidatureRepository.findByUserAndOffre(user, offre));
        }
        Candidature candidature =Candidature.builder().etat(CandidatureStatus.SOUMIS).user(user).offre(offre).build();
        MultipartFile cv = candidatureRequest.getCv();
        if (cv != null && !cv.isEmpty()) {
            String cvDirectory = "resources/cv_uploads/";
            String cvFileName = cvDirectory + cv.getOriginalFilename();
            Path cvPath = Paths.get(cvFileName);
            Files.createDirectories(cvPath.getParent());
            Files.write(cvPath, cv.getBytes());
            candidature.setCvPath(cvFileName);
        }
        return candidatureRepository.save(candidature);
    }

    public Candidature updateStatus(Integer condidature_id, CandidatureStatus newStatus) {
        Candidature candidature = candidatureRepository.findById(condidature_id).get();
        candidature.setEtat(newStatus);
        return  candidatureRepository.save(candidature);
    }

    public List<Candidature> getCandidaturesByUser(Integer userId) {
        return candidatureRepository.findByUserId(userId);
    }
    public List<Candidature> getCandidaturesByOffre(Integer offreId) {
        return candidatureRepository.findByOffreId(offreId);
    }


}
