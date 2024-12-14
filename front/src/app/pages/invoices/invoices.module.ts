import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbTooltipModule ,NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    UIModule,
    NgbTooltipModule,
    FormsModule, ReactiveFormsModule,
    NgbAlertModule,
  ]
})
export class InvoicesModule { }
