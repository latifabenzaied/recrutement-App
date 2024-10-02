package com.satge.recrutement.condidature;

import com.satge.recrutement.offre.Offre;
import com.satge.recrutement.user.User;
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
public class Condidature {

    @Id
    @GeneratedValue
    private Integer id;

    private CondidatureStatus etat=CondidatureStatus.SOUMIS;
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
