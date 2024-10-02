package com.satge.recrutement.condidature;

import com.satge.recrutement.offre.Offre;
import com.satge.recrutement.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CondidatureRepository extends JpaRepository<Condidature, Integer> {
    Condidature findByUserAndOffre(User user, Offre offre);
    List<Condidature> findByUserId(Integer userId);
    List<Condidature> findByOffreId(Integer offreId);

}
