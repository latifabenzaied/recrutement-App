package com.satge.recrutement.notification;


import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Notification {
    @Id
    @GeneratedValue
    private Integer idNotification;
    private String userId;
    private String message;
    private boolean readd;
}
