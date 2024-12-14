import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Usergrid } from './usergrid.model';

import { userGridData } from './data';
import { OffreControllerService } from 'src/app/services/services';
import { SaveBook$Params } from 'src/app/services/fn/offre-controller/save-book';
import { OffreResponse } from 'src/app/services/models';
import { UpdateArchivedStatus$Params } from 'src/app/services/fn/offre-controller/update-archived-status';
import { UpdateOffre$Params } from 'src/app/services/fn/offre-controller/update-offre';
import { DeleteOffre$Params } from 'src/app/services/fn/offre-controller/delete-offre';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.scss']
})

/**
 * Contacts user grid component
 */
export class UsergridComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  public offreResponse: OffreResponse[] = [];
  offres: OffreResponse[] = [];
  userGridData: Usergrid[];
  selected;
  selectedTypeContrat;
  offreForm: UntypedFormGroup;
  submitted = false;
  items: UntypedFormArray;
  // Select2 Drop
  selectValue: any
  selectValue2: any
  isUpdateMode: boolean;
  selectedOffer: OffreResponse | null = null;
  currentOfferId:number;
  alertMessage: string;
  showAlert: boolean;
  constructor(private offreService: OffreControllerService, private modalService: NgbModal, private offerService: OffreControllerService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit() {
    this.selectValue = [
      { value: 'Stage', label: 'Stage' },
      { value: 'Cdi', label: 'CDI' },
      { value: 'cdd', label: 'CDD' }
    ];
    this.selectValue2 = [
      { value: true, label: 'True' },
      { value: false, label: 'False' }
    ];
    this.selectedTypeContrat = true;
    this.breadCrumbItems = [{ label: 'Gestion' }, { label: 'offres Grid', active: true }];
    this.offreForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      profil: ['', [Validators.required]],
      responsabilities: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      shareable: ['true', Validators.required],
      typecontrat: ['', Validators.required]
    });
    /**
     * fetches data
     */
    // this._fetchData();
    this.getAllOffres();
  }

  get form() {
    return this.offreForm.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(contentt: any) {
    this.modalService.open(contentt);
    this.isUpdateMode = false;
    this.selectedOffer = null;
    this.offreForm.reset();

  }
  openUpdateModal(content: any, itemId: number): void {
    this.isUpdateMode = true;
    const params = { id: itemId };
     this.currentOfferId=itemId;
    this.offerService.getOffreById(params).subscribe(
      async offer => {
        if (offer instanceof Blob) {
          let jsonString = await offer.text();
          this.selectedOffer = JSON.parse(jsonString);
        }
        this.offreForm.patchValue({
          title: this.selectedOffer.title,
          description: this.selectedOffer.description,
          profil: this.selectedOffer.profil,
          responsabilities: this.selectedOffer.responsabilites,
          expirationDate: this.selectedOffer.dateExpiration,
          shareable: this.selectedOffer.shareable ? 'true' : 'false',
          typecontrat: this.selectedOffer.typeContrat
        });
        console.log('Form value after patch:', this.offreForm.value);
        this.modalService.open(content);
      },
      error => {
        console.error('Error fetching offer data', error);

      }
    );
  }

  /**
   * User grid data fetches
   */
  // private _fetchData() {
  //   this.userGridData = userGridData;
  // }

  /**
   * Save user
   */
  saveOffre() {
    this.submitted = true;
    

    if (this.offreForm.valid) {

      const formData = this.offreForm.value;
      if (this.isUpdateMode) {
        console.log(this.currentOfferId);
        formData.id=this.currentOfferId;
        const paramss: UpdateOffre$Params = {
          body: {
            id: formData.id,
            title: formData.title,
            description: formData.description,
            profil: formData.profil,
            responsabilites: formData.responsabilities,
            expirationDate: new Date(formData.expirationDate).toISOString(), // Assurez-vous du format
            shareable: formData.shareable === 'true' ? true : false,
            typeContrat: formData.typecontrat
          },
          id: formData.id
        };
        this.offreService.updateOffre(paramss).subscribe(
          response => {
            console.log('Offer updated successfully!', response);
            this.modalService.dismissAll();
            this.alertMessage = 'The offer has been successfully updated!!';
            this.showAlert = true;
            this.getAllOffres();
          
          },
          error => {
            console.error('Error updating offer', error);
          }
        );
      } 
      else{
      const params: SaveBook$Params = {
        body: {
          title: formData.title,
          description: formData.description,
          profil: formData.profil,
          responsabilites: formData.responsabilities,
          expirationDate: new Date(formData.expirationDate).toISOString(), 
          shareable: formData.shareable === 'true' ? true : false,
          typeContrat: formData.typecontrat
          
        }
      };
      console.log(params);
      this.offerService.saveBook(params).subscribe({
        next: (response) => {
          console.log('Offer saved successfully!', response);
          this.modalService.dismissAll();
          this.alertMessage = 'The offer has been successfully saved!!';
          this.showAlert = true;
          this.userGridData = this.transformToSimpleOffre(this.offreResponse);
        },
        error: (error) => {

          console.error('Error saving offer:', error);
        }
      });
    }
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
          this.userGridData = this.transformToSimpleOffre(this.offreResponse);

        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des offres:', err);
      }
    });
  }
  private transformToSimpleOffre(offres: OffreResponse[]): Usergrid[] {
    return offres.map(offre => ({
      title: offre.title || '',
      typeContrat: offre.typeContrat.toString(),
      id: offre.id,
      archived: offre.archived
    }));
  }

  archiveItem(itemId: number): void {
    const params: UpdateArchivedStatus$Params = {
      'offer-id': itemId
    };
    this.offerService.updateArchivedStatus(params).subscribe(
      response => {
        console.log('Item archived successfully', response);
        this.getAllOffres();
        
      },
      error => {
        console.error('Error archiving item', error);

      }
    );
  }

  deleteOffre(itemId: number): void {

    const params: DeleteOffre$Params = {
      'id': itemId
    };
    this.offerService.deleteOffre(params).subscribe(
      response => {
        console.log('Item archived successfully', response);
        this.getAllOffres();
      },
      error => {
        console.error('Error archiving item', error);

      }
    );
  }

  close() {
    this.showAlert = false; 
  }
}
