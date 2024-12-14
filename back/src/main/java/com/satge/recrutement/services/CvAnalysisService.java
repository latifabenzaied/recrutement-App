package com.satge.recrutement.services;

import com.satge.recrutement.tools.MyTools;
import com.satge.recrutement.repositories.OffreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class CvAnalysisService {
    private  final OffreRepository offreRepository;
    private final MyTools myTools;
    private static final String FLASK_API_URL = "http://127.0.0.1:5000/check-compatibility"; // URL de votre API Flask

    public String analyzeCv(@PathVariable Integer id_offre ,
                            @RequestPart("cv") MultipartFile cv_path
    ) throws IOException {

        String offreDescription=offreRepository.getOffreNameById(id_offre).getFullDescription();
        System.out.println(offreDescription.replaceAll("[\\r\\n]+", ""));
        // Créer un objet RestTemplate pour envoyer une requête HTTP vers l'API Flask
        RestTemplate restTemplate = new RestTemplate();
        // Préparer les en-têtes HTTP (content-type)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String cv_path_name="C:/Users/latifa/Desktop/recrutement/"+ myTools.uploadFils(cv_path);
        String jsonPayload = "{ \"offer\": \"" + offreDescription.replaceAll("[\\r\\n]+", "") + "\", " +
                "\"cv_path\": \"" + cv_path_name + "\" }";
        System.out.println(jsonPayload);
        HttpEntity<String> entity = new HttpEntity<>(jsonPayload, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(FLASK_API_URL, entity, String.class);
        return response.getBody();
    }
}
