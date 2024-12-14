import { Component, OnInit } from '@angular/core';

import { revenueBarChart, statData } from './data';

import { ChartType } from './profile.model';
import { GetUserById$Params } from 'src/app/services/fn/user-controler/get-user-by-id';
import { CondidatureControllerService, UserControlerService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';
import { Condidature, CondidatureResponse, Offre, User } from 'src/app/services/models';
import { GetCandidaturesByUser$Params } from 'src/app/services/fn/condidature-controller/get-candidatures-by-user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  user:User;
  revenueBarChart: ChartType;
  statData;
  userEmail= this.tokenservice.getUserId();
  favoriteOffers: Offre[];
  condidatures: Condidature[];
  
  constructor(private tokenservice:TokenService ,private userService :UserControlerService,private condidatureService:CondidatureControllerService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    const params: GetUserById$Params= {
          'email': this.userEmail
        };
    this.userService.getUserById(params).subscribe(
      async (data )=> {
        if (data instanceof Blob) {
                  let jsonString = await data.text();
                  this.user = JSON.parse(jsonString);
                 
                }
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );

    this.loadUserFavoriteOffers();
    this.loadCandidatures();
    
  }

  loadUserFavoriteOffers(): void {
    const params: GetUserById$Params= {
      'email': this.userEmail
    };
   
    this.userService.getUserFavoriteOffers(params).subscribe(
      async (offers) => {
        console.log(this.favoriteOffers);
        if (offers instanceof Blob) {
          let jsonString = await offers.text();
          this.favoriteOffers = JSON.parse(jsonString);
          console.log(this.favoriteOffers);
        }
      
        
      },
      (error) => {

        console.error('Error fetching favorite offers', error);
      }
     
    );
  
  }
  loadCandidatures(): void {
    const params:GetCandidaturesByUser$Params= {
      'email': this.userEmail
    };
    this.condidatureService.getCandidaturesByUser(params).subscribe(
      async (candidatures: CondidatureResponse[]) => {
        if (candidatures instanceof Blob) {
          let jsonString = await candidatures.text();
          this.condidatures = JSON.parse(jsonString);
          console.log(this.condidatures);
        }
        this.condidatures = candidatures;
      },
      (error) => {
        console.error('Erreur lors de la récupération des candidatures', error);
      }
    );
  }

}

  

