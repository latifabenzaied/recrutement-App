package com.satge.recrutement.communication;


import com.satge.recrutement.entity.TypeContrat;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public record OffreRequest (


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
        TypeContrat typeContrat


){


}
