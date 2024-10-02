package com.satge.recrutement.notification;

import com.satge.recrutement.webSocket.WebSocketEventListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class NotificationStorageService {
    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private WebSocketEventListener webSocketEventListener;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendOrStoreNotification(String userId, String message) {

        if ("all-users".equals(userId)) {
            Notification notification = new Notification();
            notification.setUserId(userId);
            notification.setMessage(message);
            notification.setReadd(false);
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

//    public List<Notification> getNotificationsForUser(String userId) {
//        return notificationRepository.findByUserIdAndIs_read(userId, false);
//    }

    public void markNotificationsAsRead(String userId) {
//        List<Notification> notifications = notificationRepository.findByUserIdAndIs_read(userId, false);
//        for (Notification notification : notifications) {
//            notification.set_read(true);
//            notificationRepository.save(notification);
//        }
    }
}
