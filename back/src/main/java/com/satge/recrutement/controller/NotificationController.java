package com.satge.recrutement.controller;

import com.satge.recrutement.entity.Notification;
import com.satge.recrutement.services.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notificationss")
@AllArgsConstructor
public class NotificationController {


    private NotificationService notificationService;
//    @PutMapping("/notifications/markAsRead")
//    public void markNotificationsAsRead(@RequestParam String userId) {
//        notificationStorageService.markNotificationsAsRead(userId);
//    }


    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications() {
        return notificationService.getUnreadNotifications();
    }
    @PostMapping("/markAllAsRead")
    public void markAllNotificationsAsRead() {
        notificationService.markAllNotificationsAsRead();
    }
}

