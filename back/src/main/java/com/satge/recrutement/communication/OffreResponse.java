package com.satge.recrutement.communication;


import com.satge.recrutement.entity.TypeContrat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OffreResponse {

    private Integer id;
    private String title;
    private String description;
    private String responsabilites;
    private String profil;
    private LocalDate datePublication;
    private LocalDate dateExpiration;
    private TypeContrat typeContrat;
    private boolean archived;
    private boolean shareable;
    private String publisher;
//


}
