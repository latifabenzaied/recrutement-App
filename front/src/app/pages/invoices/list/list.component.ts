import { Component, OnInit } from '@angular/core';

import { listData } from './data';

import {  SimpleOffre } from './list.model';
import { Offre, OffreResponse } from 'src/app/services/models';
import { OffreControllerService, UserControlerService } from 'src/app/services/services';
import { Router } from '@angular/router';
import { AddFavorite$Params } from 'src/app/services/fn/offre-controller/add-favorite';
import { TokenService } from 'src/app/services/token/token.service';
import { GetUserFavoriteOffers$Params } from 'src/app/services/fn/user-controler/get-user-favorite-offers';
import { RemoveFavoriteOffer$Params } from 'src/app/services/fn/user-controler/remove-favorite-offer';




import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/websocket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * Invoices list component
 */
export class ListComponent implements OnInit {

  public offreResponse: OffreResponse[] = [];
  offres: OffreResponse[] = [];
  // bread crumb items
  breadCrumbItems: Array<{}>;
  listData: SimpleOffre[];
  userId= this.tokenService.getUserId();
  offre:SimpleOffre;
  hover = false;
  hasMoreData: boolean = true; 
  pageNumber: number = 1;
  showAlert: boolean;  alertMessage: string;

  //
  private subscription: Subscription;
  messages: any[] = [];
  
  constructor(  private userservice:UserControlerService ,private tokenService: TokenService, private offreService: OffreControllerService,
    private router: Router,
    private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Invoices' }, { label: 'Invoice List', active: true }];
    this.loadNonArchivedOffres();
    //
      // Connexion au WebSocket
      this.webSocketService.connect();
      console.log('WebSocket service connected.');

      this.subscription = this.webSocketService.getMessages().subscribe(
        message => {
          this.messages.push(message);
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


  getAllOffres(): void {
    this.offreService.getAllOffres().subscribe({
      next: async (offers: OffreResponse[]) => {
        this.offreResponse = offers;
        if (offers instanceof Blob) {
          console.log(offers);
          let jsonString = await offers.text();
          this.offreResponse = JSON.parse(jsonString);
          this.listData = this.transformToSimpleOffre(this.offreResponse);

        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des offres:', err);
      }
    });
  }

  loadNonArchivedOffres(): void {
    this.offreService.getNonArchivedOffres().subscribe(
      async data => {
        if (data instanceof Blob) {
       
          let jsonString = await data.text();
          this.offreResponse = JSON.parse(jsonString);
          this.listData = this.transformToSimpleOffre(this.offreResponse);
          this.getFavoriteOffers(); 
          console.log(this.listData);
          this.hasMoreData = listData.length > 0; 
        }
      },
      error => {
        console.error('Erreur lors de la récupération des offres non archivées:', error);
      }
    );
  }

  getFavoriteOffers(): void {
    const params: GetUserFavoriteOffers$Params = {
      'email': this.userId
    };
  
    this.userservice.getUserFavoriteOffers(params).subscribe(
      async data => {
        if (data instanceof Blob) {
          let jsonString = await data.text();
          const favoriteOffers: OffreResponse[] = JSON.parse(jsonString); 
          this.updateFavoriteStatus(favoriteOffers);
         
        }
      },
      error => {
        console.error('Erreur lors de la récupération des offres favorites:', error);
      }
    );
  }
  
  updateFavoriteStatus(favoriteOffers: OffreResponse[]): void {
     const favoriteOfferIds = new Set(favoriteOffers.map(offer => offer.id));
    this.listData.forEach(offre => {
      offre.isFavorite = favoriteOfferIds.has(offre.id);
    });
  }
  
    private transformToSimpleOffre(offres: OffreResponse[]): SimpleOffre[] {
    return offres.map(offre => ({
      title: offre.title || '', 
      typeContrat: offre.typeContrat || '', 
      date: offre.datePublication || '' ,
      id: offre.id  ,
      isFavorite: false
    }));
  }

  addFavorite(offerId: number): void {
  
    const params: AddFavorite$Params = {
      'offerId': offerId,
      'email': this.userId
    };
    this.offreService.addFavorite(params).subscribe(
      response => {
        console.log(response); 
        const offer = this.listData.find(o => o.id === offerId);
        if (offer) {
          offer.isFavorite = true;
        }
      },
      error => {
        console.error('Erreur lors de l\'ajout du favori', error);
       
      }
    );
  }
  toggleFavorite(offerId: number): void {
    const offer = this.listData.find(o => o.id === offerId);
    if (offer) {
      if (offer.isFavorite) {
        this.removeFavorite(offerId);
      } else {
        this.addFavorite(offerId);
      }
    }
  }

  removeFavorite(offerId: number): void {
    const params: RemoveFavoriteOffer$Params = {
      'offerId': offerId,
      'email': this.userId
    };
    this.userservice.removeFavoriteOffer(params).subscribe(
      response => {
        const offer = this.listData.find(o => o.id === offerId);
        if (offer) {
          offer.isFavorite = false;
        }
      },
      error => {
        console.error('Erreur lors de la suppression du favori', error);
      }
    );
  }


  loadMore(): void {
    if (this.hasMoreData) {
      this.pageNumber++;
      this.loadNonArchivedOffres();
    }
  }
  close() {
    this.showAlert = false; 
  }
  
}
