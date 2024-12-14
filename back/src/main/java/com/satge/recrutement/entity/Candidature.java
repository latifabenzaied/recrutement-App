package com.satge.recrutement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "condidature")
@EntityListeners(AuditingEntityListener.class)
public class Candidature {

    @Id
    @GeneratedValue
    private Integer id;

    private CandidatureStatus etat= CandidatureStatus.SOUMIS;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime appliedDate;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "offre_id")
    private Offre offre;

    private String cvPath;
}
