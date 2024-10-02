package com.satge.recrutement.notification;

import com.satge.recrutement.webSocket.WebSocketEventListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    @Autowired
    //Une classe Spring qui simplifie l'envoi de messages via WebSocket.
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private WebSocketEventListener webSocketEventListener;
    @Autowired
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

}
