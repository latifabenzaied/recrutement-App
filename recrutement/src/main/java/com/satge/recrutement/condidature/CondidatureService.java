package com.satge.recrutement.condidature;

import com.satge.recrutement.offre.Offre;

import com.satge.recrutement.offre.OffreRepository;
import com.satge.recrutement.user.User;
import com.satge.recrutement.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.List;


@Service
@RequiredArgsConstructor
public class CondidatureService {

    private final CondidatureRepository condidatureRepository;
    private  final  OffreRepository offreRepository;
    private final UserRepository userRepository;

    public Condidature createCondidature(CondidatureRequest condidatureRequest, String email, Integer offreId) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur non trouvé"));
        Offre offre = offreRepository.findById(offreId)
                .orElseThrow(() -> new IllegalArgumentException("Offre non trouvée"));

        if (condidatureRepository.findByUserAndOffre(user, offre)!= null) {
            condidatureRepository.delete(condidatureRepository.findByUserAndOffre(user, offre));
        }

        Condidature condidature = new Condidature();
        condidature.setEtat(CondidatureStatus.SOUMIS);
        condidature.setUser(user);
        System.out.println(user.getRoles().toString());
        condidature.setOffre(offre);
        MultipartFile cv = condidatureRequest.getCv();
        if (cv != null && !cv.isEmpty()) {
            String cvDirectory = "resources/cv_uploads/";
            String cvFileName = cvDirectory + cv.getOriginalFilename();
            Path cvPath = Paths.get(cvFileName);
            Files.createDirectories(cvPath.getParent());
            Files.write(cvPath, cv.getBytes());
            condidature.setCvPath(cvFileName);
        }
        return condidatureRepository.save(condidature);
    }

    public Condidature updateStatus(Integer condidature_id,CondidatureStatus newStatus) {
        Condidature condidature = condidatureRepository.findById(condidature_id).get();
        condidature.setEtat(newStatus);
        return  condidatureRepository.save(condidature);
    }

    public List<Condidature> getCandidaturesByUser(Integer userId) {
        return condidatureRepository.findByUserId(userId);
    }
    public List<Condidature> getCandidaturesByOffre(Integer offreId) {
        return condidatureRepository.findByOffreId(offreId);
    }


}
