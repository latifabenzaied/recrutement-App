package com.satge.recrutement.condidature;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;

@Getter
@Setter

@NoArgsConstructor
public class CondidatureRequest {

    private MultipartFile cv;
}
