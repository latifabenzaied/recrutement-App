package com.satge.recrutement.controller;

import com.satge.recrutement.communication.AuthenticationRequest;
import com.satge.recrutement.communication.AuthenticationResponse;
import com.satge.recrutement.services.AuthenticationService;
import com.satge.recrutement.communication.RegistrationRequest;
import com.satge.recrutement.services.EmailService;
import com.satge.recrutement.entity.EmailTemplateName;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor

public class AuthenticationController {

    private  final EmailService emailService;
    private final AuthenticationService AuthenticationService;

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        AuthenticationService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(AuthenticationService.authenticate(request));
    }

    @GetMapping("/activate-account")
    public void confirm(
            @RequestParam String token
    ) throws MessagingException {
        AuthenticationService.activateAccount(token);
    }

}
