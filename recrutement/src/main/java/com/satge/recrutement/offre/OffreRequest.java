package com.satge.recrutement.offre;

import lombok.Getter;


import java.time.LocalDate;
import java.time.LocalDateTime;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public record OffreRequest (
        Integer id,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String title,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String description,
        @NotNull(message = "100")
        @NotEmpty(message = "100")
        String responsabilites,
        @NotNull(message = "100")
        @NotEmpty(message = "100")

        String profil,
        @NotNull(message = "100")
        @NotEmpty(message = "100")

        LocalDate expirationDate,
        Boolean shareable,
        TypeContrat typeContrat,

        String publisher

){


}
