package com.satge.recrutement.webSocket;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
@Component
public class WebSocketEventListener {

    public Map<String, String> activeUsers = new ConcurrentHashMap<>();

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        //Encapsule le message de l'événement pour accéder facilement aux informations STOMP
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        String userId = headerAccessor.getUser().getName();
        activeUsers.put(sessionId, userId);
        System.out.println(activeUsers);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        activeUsers.remove(sessionId);
    }

    public boolean isUserConnected(String userId) {
        return activeUsers.containsValue(userId);
    }

    public Set<String> getAllConnectedUsers() {
        return new HashSet<>(activeUsers.values());
    }
}

