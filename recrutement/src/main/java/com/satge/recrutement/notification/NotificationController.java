package com.satge.recrutement.notification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notificationss")
public class NotificationController {
    @Autowired
    private NotificationStorageService notificationStorageService;
    @Autowired
    private NotificationService notificationService;
    @PutMapping("/notifications/markAsRead")
    public void markNotificationsAsRead(@RequestParam String userId) {
        notificationStorageService.markNotificationsAsRead(userId);
    }


    @GetMapping("/unread")
    public List<Notification> getUnreadNotifications() {
        return notificationService.getUnreadNotifications();
    }
    @PostMapping("/markAllAsRead")
    public void markAllNotificationsAsRead() {
        notificationService.markAllNotificationsAsRead();
    }
}

