package com.satge.recrutement.communication;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Builder

public class CandidatureRequest {

    private MultipartFile cv;
}
