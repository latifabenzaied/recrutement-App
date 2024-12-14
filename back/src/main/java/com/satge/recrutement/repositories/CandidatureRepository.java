package com.satge.recrutement.repositories;
import com.satge.recrutement.entity.Candidature;
import com.satge.recrutement.entity.Offre;
import com.satge.recrutement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
    Candidature findByUserAndOffre(User user, Offre offre);
    List<Candidature> findByUserId(Integer userId);
    List<Candidature> findByOffreId(Integer offreId);
    List<Candidature> findCandidaturesByOffreId(Integer offreId);
    List<Candidature> findCandidaturesByUserId(Integer userId);

}
