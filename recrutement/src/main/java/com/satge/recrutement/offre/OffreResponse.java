package com.satge.recrutement.offre;


import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Getter
@Setter

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
//    private String lieu;
    private TypeContrat typeContrat;
//    private LocalDateTime lastModification;
    private boolean archived;
    private boolean shareable;
    private String publisher;
    public OffreResponse(Integer id, String title, String description, String responsabilites, String profil, LocalDate datePublication, LocalDate dateExpiration, TypeContrat typeContrat, boolean archived, boolean shareable, String publisher) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.responsabilites = responsabilites;
        this.profil = profil;
        this.datePublication = datePublication;
        this.dateExpiration = dateExpiration;
        this.typeContrat = typeContrat;
        this.archived = archived;
        this.shareable = shareable;
        this.publisher = publisher;
    }


}
