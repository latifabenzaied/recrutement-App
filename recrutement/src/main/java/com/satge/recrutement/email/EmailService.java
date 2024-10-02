package com.satge.recrutement.email;

import com.satge.recrutement.condidature.Condidature;
import com.satge.recrutement.condidature.CondidatureStatus;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;
import java.util.HashMap;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.mail.javamail.MimeMessageHelper.MULTIPART_MODE_MIXED;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;
    private final SpringTemplateEngine templateEngine;

@Async
    public void sendEmail(
            String to,
            String username,
            EmailTemplateName emailTemplate,
            String confirmationUrl,
            String activationCode,
            String subject
    )
            throws MessagingException {
        String templateName;
        if (emailTemplate == null) {
            templateName = "confirm-email";
        } else {
            templateName = emailTemplate.name();
        }
        MimeMessage message = emailSender.createMimeMessage();

//        MimeMessageHelper helper = new MimeMessageHelper(message);
        MimeMessageHelper helper = new MimeMessageHelper(
                message,
                MULTIPART_MODE_MIXED,
                UTF_8.name()
        );
        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmationUrl", confirmationUrl);
        properties.put("activation_code", activationCode);

        Context context = new Context();
        context.setVariables(properties);
        helper.setFrom("latifabenzaied23@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);
        String template = templateEngine.process(templateName, context);
        helper.setText(template, true);
        emailSender.send(message);

    }
    public void sendStatusChangeEmail(Condidature condidature,String customMessage) {
        String subject = "Your Application Status Has Changed";
//        String recipient = condidature.getUser().getEmail();
        String content = createEmailContent(condidature, customMessage);

        sendEmailEtat("latifa.benzaied@Esprit.tn", subject, content);
    }


    private String createEmailContent(Condidature condidature, String customMessage) {
        if (customMessage != null && !customMessage.isEmpty()) {
            return customMessage;
        }
        CondidatureStatus status = condidature.getEtat();
        String message = "";

        switch (status) {
            case SOUMIS:
                message = "Your application has been submitted.";
                break;
            case EN_REVISION:
                message = "Your application is under review.";
                break;
            case ENTRETIEN_PROGRAMME:
                message = "An interview has been scheduled for your application. You will receive further details about the meeting soon.";
                break;
            case REFUSE:
                message = "Your application has been rejected.";
                break;
        }

        return message;
    }
    private void sendEmailEtat(String to, String subject, String content) {
        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            emailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}



