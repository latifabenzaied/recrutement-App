import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../../core/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from 'src/app/services/token/token.service';

import {  Subscription } from 'rxjs';
import { WebSocketService } from 'src/websocket.service';
import { NotificationControllerService } from 'src/app/services/services';
import { Notification } from 'src/app/services/models';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  isUser: boolean = false;
  element;
  cookieValue;
  flagvalue;
  countryName;
  valueset;
  firstname:string;
  notifications:Notification[];
  //
  notification: { title: string, date: string ,id:Number}[] = [];
  private subscription: Subscription;
  messages: any[] = [];
  unreadCount: number = 0;
 

  constructor(@Inject(DOCUMENT) private document: any, private router: Router, private authService: AuthenticationService,
              private authFackservice: AuthfakeauthenticationService,
              public languageService: LanguageService,
              public translate: TranslateService,
              public _cookiesService: CookieService,
            private tokenservice:TokenService,
            private webSocketService: WebSocketService,
            private notifSevice: NotificationControllerService) {
  }

  listLang = [
    { text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en' },
    { text: 'Spanish', flag: 'assets/images/flags/spain.jpg', lang: 'es' },
    { text: 'German', flag: 'assets/images/flags/germany.jpg', lang: 'de' },
    { text: 'Italian', flag: 'assets/images/flags/italy.jpg', lang: 'it' },
    { text: 'Russian', flag: 'assets/images/flags/russia.jpg', lang: 'ru' },
  ];

  openMobileMenu: boolean;

  @Output() settingsButtonClicked = new EventEmitter();
  @Output() mobileMenuButtonClicked = new EventEmitter();

  ngOnInit() {
    this.isUser = this.tokenservice.hasRole('USER'); 
    this.firstname=this.tokenservice.getFirstName().toUpperCase();
    this.openMobileMenu = false;
    this.element = document.documentElement;


    this.cookieValue = this._cookiesService.get('lang');
    const val = this.listLang.filter(x => x.lang === this.cookieValue);
    this.countryName = val.map(element => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) { this.valueset = 'assets/images/flags/us.jpg'; }
    } else {
      this.flagvalue = val.map(element => element.flag);
    }
    //
    this.loadUnReadNotifications();
    this.webSocketService.connect();
    console.log('WebSocket service connected.');
    
    this.subscription = this.webSocketService.getMessages().subscribe(
      message => {
        this.processMessage(message);
        //this.messages.push(message);
        this.unreadCount++;
        console.log('New message received: ', message);
      },
      error => {
        console.error('Erreur lors de la connexion au WebSocket:', error);
      }
    );
  }
  ngOnDestroy(): void {
    // Déconnexion du WebSocket
    this.webSocketService.disconnect();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private processMessage(message: string): void {
    // Regex pour extraire le titre, la date et l'id
    const regex = /Nouvelle offre publiée : (.+?)\. Date de publication : (.+?)\. l'id: (\d+)/;
    const match = message.match(regex);
  
    if (match) {
      const title = match[1];
      const publicationDateStr = match[2];
      const id = match[3];
      
      console.log("title:", title);
      console.log("publicationDateStr:", publicationDateStr);
      console.log("id:", id);
  
      // Convertir la date en format Date
      const publicationDate = new Date(publicationDateStr);
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - publicationDate.getTime();
  
      const formatTimeDifference = (diff: number): string => {
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
  
        if (days > 0) {
          return `${days} jour${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
          return `${hours} heure${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
          return `${seconds} seconde${seconds > 1 ? 's' : ''} ago`;
        }
      };
  
      const differenceMessage = timeDifference < 60000 ? 'Now' : formatTimeDifference(timeDifference);
  
      // Ajouter la notification avec l'id et le titre
      this.notification.push({ 
        title, 
        date: differenceMessage,
        id:Number(id) // Ajouter l'id à la notification si nécessaire
      });
    }
  }
  
  
  loadUnReadNotifications(): void {
    this.notifSevice.getUnreadNotifications().subscribe(
      async data => {
        if (data instanceof Blob) {
          let jsonString = await data.text();
          this.notifications = JSON.parse(jsonString);
          this.notifications.forEach(notification => {
            this.processMessage(notification.message);
          });
        }
        this.unreadCount=this.notifications.length;
      },
      error => {
        console.error('Erreur lors de la récupération des offres non archivées:', error);
      }
    );
  }
  markAllAsRead(): void {
    const MAX_NOTIFICATIONS = 10;
    this.notifSevice.markAllNotificationsAsRead().subscribe(() => {
      const latestNotifications = this.notifications.slice(-MAX_NOTIFICATIONS);
     
      this.unreadCount = 0;
      this.notifications.forEach(notification => notification.readd = true);
    });
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.cookieValue = lang;
    this.languageService.setLanguage(lang);
  }

  /**
   * Toggles the right sidebar
   */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  /**
   * Logout the user
   */
  logout() {
    // if (environment.defaultauth === 'firebase') {
    //   this.authService.logout();
    // } else {
    //   this.authFackservice.logout();
    // }
    // this.router.navigate(['/account/login']);
    localStorage.removeItem('token');
    window.location.reload();
  }

  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
  goToMyWallet() {
    this.router.navigate(['/projects/grid']); 
  }

  
}
