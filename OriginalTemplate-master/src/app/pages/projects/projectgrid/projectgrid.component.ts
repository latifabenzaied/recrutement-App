import { Component, OnInit } from '@angular/core';

import { Project } from '../project.model';

import { projectData } from '../projectdata';
import { TokenService } from 'src/app/services/token/token.service';
import { UserControlerService } from 'src/app/services/services';
import { GetUserById$Params } from 'src/app/services/fn/user-controler/get-user-by-id';
import { Offre } from 'src/app/services/models';
import { RemoveFavoriteOffer$Params } from 'src/app/services/fn/user-controler/remove-favorite-offer';

@Component({
  selector: 'app-projectgrid',
  templateUrl: './projectgrid.component.html',
  styleUrls: ['./projectgrid.component.scss']
})

/**
 * Projects-grid component
 */
export class ProjectgridComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  // projectData: Project[];
  favoriteOffers: Offre[];
  userEmail= this.tokenservice.getUserId(); 

  paginatedFavorites: any[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  

  constructor(private tokenservice:TokenService ,private userService :UserControlerService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'wish list' }, { label: '', active: true }];

    this.loadUserFavoriteOffers();
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
          this.totalPages = Math.ceil(this.favoriteOffers.length / this.pageSize);
          this.updatePage();
         
        }
      
        
      },
      (error) => {

        console.error('Error fetching favorite offers', error);
      }
     
    );
  
  }
  getExpirationStatus(date:Date): string {
    const now = new Date();
 
    return date < now ? 'Expired' : 'Not Yet';
  }

  removeFromFavorites(itemId: number) {
    const params: RemoveFavoriteOffer$Params= {
      'email': this.userEmail,
      'offerId': itemId
    };
    this.userService.removeFavoriteOffer(params).subscribe(() => {
      this.favoriteOffers = this.favoriteOffers.filter(item => item.id !== itemId);
      this.loadUserFavoriteOffers();
    });
  }

  updatePage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedFavorites = this.favoriteOffers.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updatePage();
    }
  }
}
