package com.satge.recrutement.communication;

import com.satge.recrutement.entity.Candidature;
import org.springframework.stereotype.Service;

@Service
public class CandidatureMapper {
    public CandidatureResponse toCandidatureResponse(Candidature candidature) {
        return CandidatureResponse.builder()
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
