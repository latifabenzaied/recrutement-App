package com.satge.recrutement.condidature;

import lombok.Builder;
import lombok.Getter;

import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Builder
public class CondidatureResponse {
    private Integer id;
    private String titleoffre;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private LocalDateTime appliedDate;
    private CondidatureStatus etat;
    private String cvPath;
}
