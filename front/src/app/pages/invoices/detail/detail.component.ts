import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { GetOffreById$Params } from 'src/app/services/fn/offre-controller/get-offre-by-id';
import { OffreResponse } from 'src/app/services/models';
import { CondidatureControllerService, OffreControllerService, UserControlerService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';

import { createCondidature, CreateCondidature$Params } from 'src/app/services/fn/condidature-controller/create-condidature';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})


/**
 * Invoices Detail component
 */
export class DetailComponent implements OnInit {

  offre: OffreResponse | undefined;
  isUser: Boolean;
  candidatureForm: UntypedFormGroup;
  userservice: UserControlerService;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  userEmail = this.tokenservice.getUserId();
  selectedFile: File | null = null;
  showAlert: boolean;  alertMessage: string;
  constructor(private modalService: NgbModal, private route: ActivatedRoute,
    private offreService: OffreControllerService,
    private tokenservice: TokenService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private candidatureService: CondidatureControllerService,
  ) { }

  ngOnInit() {
    this.isUser = this.tokenservice.hasRole('USER');
    this.breadCrumbItems = [{ label: 'Offre' }, { label: 'Detail', active: true }];
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      this.getOffreDetails(id);
    });

    this.candidatureForm = this.fb.group({
      cv: ['', [Validators.required]]
    });
  }
  get cv() {
    return this.candidatureForm.get('cv');
  }
  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

    }
  }

  onSubmit(): void {
    if (this.candidatureForm.invalid) {
      return;
    }

    const cvFileInput = this.candidatureForm.get('cv')?.value;
    if (cvFileInput && this.selectedFile) {

      const params: CreateCondidature$Params = {
        email: this.userEmail,
        offreId: this.offre?.id,
        body: this.selectedFile
      };
      this.candidatureService.createCondidature(params).subscribe({
        next: (response) => {
          console.log('Candidature added successfully:', response);
          this.alertMessage = 'Your application has been submitted successfully!';
          this.showAlert = true;  
          this.modalService.dismissAll();
        },
        error: (error) => {
          console.error('Error adding candidature:', error);
          this.modalService.dismissAll();
          this.alertMessage = 'Your application has been submitted successfully!';
          this.showAlert = true;  
        }
      });
    }
  }





  getOffreDetails(id: number): void {
    const params: GetOffreById$Params = { id };
    this.offreService.getOffreById(params).subscribe({
      next: async (offre: OffreResponse) => {
        this.offre = offre;
        if (offre instanceof Blob) {
          let jsonString = await offre.text();
          this.offre = JSON.parse(jsonString);

          console.log(this.offre);

        }
      },
      error: err => {
        console.error('Erreur lors de la récupération des détails de l\'offre:', err);
      }
    });
  }

  openModal(content: any) {
    this.modalService.open(content);
  }
  isUserAdmin(): boolean {
    return this.tokenservice.hasRole('ADMIN');
  }
  // ShowApplication(): void {
  //   this.router.navigate(['/offre', 'some-offre-id', 'candidatures']);
    
  // }
  close() {
    this.showAlert = false; 
  }
}
