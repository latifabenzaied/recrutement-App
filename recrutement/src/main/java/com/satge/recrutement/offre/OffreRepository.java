package com.satge.recrutement.offre;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OffreRepository extends JpaRepository<Offre, Integer> , JpaSpecificationExecutor<Offre> {

List<Offre> findByArchivedFalse();

    @Override
    Optional<Offre> findById(Integer integer);
}
