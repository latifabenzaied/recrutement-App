package com.satge.recrutement.offre;

import com.satge.recrutement.condidature.Condidature;
import com.satge.recrutement.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@Builder
@Table(name = "offre")
public class Offre {
    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    private String description;
    private String responsabilites;
    private String profil;
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDate datePublication;
    private LocalDate dateExpiration;
    private String lieu;
    private TypeContrat typeContrat;
    private String status;
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModification;
    private boolean archived;
    private boolean shareable;
    @ManyToOne
    @JoinColumn(name = "publisher_id")
    private User publisher;

    @OneToMany(mappedBy = "offre", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Condidature> applications = new HashSet<>();

}
