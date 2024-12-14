package com.satge.recrutement.communication;

import com.satge.recrutement.entity.Role;
import com.satge.recrutement.entity.User;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserMapper {
    public final PasswordEncoder passwordEncoder;

    public User toUser(RegistrationRequest request, Role userRole) {
        return User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .accountLocked(false)
                .enabled(false)
                .roles(List.of(userRole))
                .build();
    }
}
