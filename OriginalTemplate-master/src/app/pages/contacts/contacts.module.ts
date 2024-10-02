import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { WidgetModule } from '../../shared/widget/widget.module';
import { UIModule } from '../../shared/ui/ui.module';
import { ContactsRoutingModule } from './contacts-routing.module';
import {
  NgbAlertModule, NgbCarouselModule, NgbDropdownModule, NgbModalModule, NgbProgressbarModule
  , NgbPopoverModule, NgbPaginationModule, NgbNavModule, NgbAccordionModule,
  NgbCollapseModule
} from '@ng-bootstrap/ng-bootstrap';
import { UsergridComponent } from './usergrid/usergrid.component';
import { ProfileComponent } from './profile/profile.component';
import { TablesModule } from '../tables/tables.module';
import { UserlistComponent } from './userlist/userlist.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [UsergridComponent,UserlistComponent, ProfileComponent],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule, ReactiveFormsModule ,
    TablesModule,
    NgbTooltipModule,
    CKEditorModule,
    NgbAlertModule,
  ]
})
export class ContactsModule { }
