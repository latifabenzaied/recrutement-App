package com.satge.recrutement.tools;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@AllArgsConstructor
@Component
public class MyTools {
     public final String  cvDirectory = "resources/cv_uploads/";

    public String  uploadFils(MultipartFile cv) throws IOException {

        String cvFileName = cvDirectory + cv.getOriginalFilename();
        Path cvPath = Paths.get(cvFileName);
        Files.createDirectories(cvPath.getParent());
        Files.write(cvPath, cv.getBytes());
        return cvFileName;


    }
}
