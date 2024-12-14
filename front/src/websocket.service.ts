// src/app/services/websocket.service.ts

import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8088/notifications'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000
    });
  }

  connect(): void {
    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/notifications', (message: Message) => {
        if (message.body) {
          console.log(message.body);
          this.messageSubject.next(message.body);
        }
      });
    };

    this.stompClient.activate();
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('Disconnected');
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
