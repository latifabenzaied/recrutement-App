package com.satge.recrutement.repositories;


import com.satge.recrutement.entity.Offre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface OffreRepository extends JpaRepository<Offre, Integer> , JpaSpecificationExecutor<Offre> {

List<Offre> findByArchivedFalse();

    @Override
    Optional<Offre> findById(Integer integer);
    Offre getOffreNameById(Integer integer);

}
