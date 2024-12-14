package com.satge.recrutement.communication;

import com.satge.recrutement.entity.CandidatureStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Builder
public class CandidatureResponse {
    private Integer id;
    private String titleoffre;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private LocalDateTime appliedDate;
    private CandidatureStatus etat;
    private String cvPath;
}
