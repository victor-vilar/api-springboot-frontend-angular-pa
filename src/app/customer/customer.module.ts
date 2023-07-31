import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAddressesComponent } from './customer-addresses/customer-addresses-list/customer-addresses.component';
import { CustomerAddressesDetailComponent } from './customer-addresses/customer-addresses-detail/customer-addresses-detail.component';
import { CustomerContractsComponent } from './customer-contracts/customer-contracts-list/customer-contracts.component';
import { CustomerContractsDetailComponent } from './customer-contracts/customer-contracts-detail/customer-contracts-detail.component';
import { CustomerSupervisorsComponent } from './customer-supervisors/customer-supervisors-list/customer-supervisors.component';
import { CustomerSupervisorsDetailComponent } from './customer-supervisors/customer-supervisors-detail/customer-supervisors-detail.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CustomerComponent } from './customer-list/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerInfoComponent } from './customer-util/customer-info/customer-info.component';
import { ItensTableCustomerComponent } from './customer-util/itens-table-customer/itens-table-customer.component';
import { ItensTableItemContractComponent } from './customer-util/itens-table-item-contract/itens-table-item-contract.component';
import { CustomerRoutingModule } from './customer-routing.module';

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerDetailComponent,
    CustomerAddressesComponent,
    CustomerAddressesDetailComponent,
    CustomerContractsComponent,
    CustomerContractsDetailComponent,
    CustomerSupervisorsComponent,
    CustomerSupervisorsDetailComponent,
    CustomerInfoComponent,
    ItensTableCustomerComponent,
    ItensTableItemContractComponent,
  ],
  imports: [
    CustomerRoutingModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    SharedModule,
  ]
})
export class CustomerModule { }
