package com.satge.recrutement.services;

import com.satge.recrutement.entity.Notification;
import com.satge.recrutement.repositories.NotificationRepository;
import com.satge.recrutement.tools.WebSocketEventListener;
import lombok.AllArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final WebSocketEventListener webSocketEventListener;
    private NotificationRepository notificationRepository;

    public void sendNotificationToAllUsers(String message) {
        for (String userId : webSocketEventListener.getAllConnectedUsers()) {
            messagingTemplate.convertAndSendToUser(userId, "/queue/notifications", message);
        }
    }

    public void sendNotificationToAdmin(String message) {
        messagingTemplate.convertAndSend("/topic/admin-notifications", message);
    }


    public List<Notification> getUnreadNotifications() {
        return notificationRepository.findByReaddFalse();
    }


    public void markAllNotificationsAsRead() {
//        notificationRepository.markAllAsRead();
        List<Notification> notifications = notificationRepository.findByReaddFalse();
        for (Notification notification : notifications) {
            notification.setReadd(true);
            notificationRepository.save(notification);
        }
    }

    public void sendOrStoreNotification(String userId, String message) {

        if ("all-users".equals(userId)) {
            Notification notification = Notification.builder()
                    .userId(userId).
                    message(message).
                    readd(false).build();

            notificationRepository.save(notification);
            messagingTemplate.convertAndSend("/topic/notifications", message);

        } else {
            if (webSocketEventListener.isUserConnected(userId)) {
                messagingTemplate.convertAndSendToUser(userId, "/queue/notifications", message);
            } else {
                Notification notification = new Notification();
                notification.setUserId(userId);
                notification.setMessage(message);
                notification.setReadd(false);
                notificationRepository.save(notification);
            }
        }
    }

}
