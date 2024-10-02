package com.satge.recrutement.condidature;

import com.satge.recrutement.offre.Offre;
import com.satge.recrutement.offre.OffreResponse;
import org.springframework.stereotype.Service;

@Service
public class CandidatureMapper {
    public CondidatureResponse toCandidatureResponse(Condidature candidature) {
        return CondidatureResponse.builder()
                .id(candidature.getId())
                .titleoffre(candidature.getOffre().getTitle())
                .userFirstName(candidature.getUser().getFirstname())
                .userLastName(candidature.getUser().getLastname())
                .userEmail(candidature.getUser().getEmail())
                .appliedDate(candidature.getAppliedDate())
                .etat(candidature.getEtat())
                .cvPath(candidature.getCvPath())
                .build();
    }
}
