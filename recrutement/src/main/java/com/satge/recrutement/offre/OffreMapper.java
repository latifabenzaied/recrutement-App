package com.satge.recrutement.offre;

import org.springframework.stereotype.Service;
@Service
public class OffreMapper {
    public Offre toOffre(OffreRequest request) {
        return Offre.builder()
                .id(request.id())
                .title(request.title())
                .description(request.description())
                .responsabilites(request.responsabilites())
                .profil(request.profil())
                .archived(false)
//                .lieu(request.lieu())
//                .status(request.status())
                .dateExpiration(request.expirationDate())
                .shareable(request.shareable())
                .typeContrat(request.typeContrat())
                .build();
    }

    public OffreResponse toOffreResponse(Offre Offre) {
        return OffreResponse.builder()
                .id(Offre.getId())
                .title(Offre.getTitle())
                .description(Offre.getDescription())
                .responsabilites(Offre.getResponsabilites())
                .profil(Offre.getProfil())
                .archived(false)
                .datePublication(Offre.getDatePublication())
                .dateExpiration(Offre.getDateExpiration())
//                .lieu(Offre.getLieu())
                .typeContrat(Offre.getTypeContrat())
//                .status(Offre.getStatus())
//                .lastModification(Offre.getLastModification())
                .build();
    }
}
