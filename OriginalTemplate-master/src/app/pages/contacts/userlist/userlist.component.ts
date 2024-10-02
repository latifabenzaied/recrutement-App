import { Component, OnInit } from '@angular/core';
import { CondidatureControllerService } from 'src/app/services/services';
import { ActivatedRoute } from '@angular/router';
import { Condidature, CondidatureResponse } from 'src/app/services/models';
import { DownloadCv$Params } from 'src/app/services/fn/condidature-controller/download-cv';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

/**
 * Contacts user-list component
 */
export class UserlistComponent implements OnInit {
  candidatures: CondidatureResponse[] = [];
  offreId!: number;
  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  selectValue: any
  items: UntypedFormArray;
  conForm: UntypedFormGroup;
  submitted = false;
  selectedCandidatureId: number;
  email:string;
  showAlert: boolean;
  alertMessage: string;
  constructor(
    private route: ActivatedRoute,
    private candidatureService: CondidatureControllerService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private condidatureService: CondidatureControllerService
  ) { }

  ngOnInit() {
    this.selectValue = [
      { value: 'EN_REVISION', label: 'EN_REVISION' },
      { value: 'ENTRETIEN_PROGRAMME', label: 'ENTRETIEN_PROGRAMME' },
      { value: 'REFUSE', label: 'REFUSE' }
    ];
    this.conForm = this.formBuilder.group({
      email: [this.email],
      etat: ['', [Validators.required]],
      contenu: [''],
    
    });
    this.route.paramMap.subscribe(params => {
      this.offreId = +params.get('id');
      console.log(this.offreId);
      this.getCandidaturesByOffre();
    });
    this.breadCrumbItems = [{ label: '' }, { label: '', active: true }];
  }
  get form() {
    return this.conForm.controls;
  }
  getCandidaturesByOffre(): void {
    this.candidatureService.getCandidaturesByOffre({ offreId: this.offreId }).subscribe(
      async (data: CondidatureResponse[]) => {
        if (data instanceof Blob) {
          let jsonString = await data.text();
          this.candidatures = JSON.parse(jsonString);
        }


      },
      error => {
        console.error('Error fetching candidatures', error);
      }
    );
  }
  downloadCv(fileName: string): void {
    const fileNamee = this.extractFileName(fileName);

    const params: DownloadCv$Params = {
      fileName: fileNamee
    };
    this.candidatureService.downloadCv(params).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      console.log( a.href);
      a.download = fileName; 
      document.body.appendChild(a);
      a.click();
      //window.URL.revokeObjectURL(url);
    });
  }
  extractFileName(filePath: string): string {
    const parts = filePath.split('/');
    return parts[parts.length - 1];
  }
  getFirstCharacter(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '';
  }
  open(content,id:number,email:string) {
    this.selectedCandidatureId = id;
    this.email=email;
    this.modalService.open(content, { centered: true });
    this.conForm.get('email')?.setValue(email);
  }
  saveResponse() {
    this.submitted = true;
    if (this.conForm.valid) {
      const formData = this.conForm.value;
      console.log(formData);
      this.condidatureService.updateCondidatureStatus({
        id: this.selectedCandidatureId ,
        status: formData.etat.value,
        customMessage:formData.contenu
      }).subscribe(
        (response: Condidature) => {
          console.log('Statut mis à jour avec succès', response);
          this.modalService.dismissAll();
          this.alertMessage = 'The status has been updated successfully!';
          this.showAlert = true; 
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut', error);
          
        }
      );
    } else {
      console.error('Le formulaire n\'est pas valide');
    }
  }
  close() {
    this.showAlert = false; 
  }
}
