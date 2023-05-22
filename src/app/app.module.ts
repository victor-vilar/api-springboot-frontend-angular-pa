import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { EquipmentsComponent } from './components/crudbase/equipaments/equipaments.component';
import { EquipmentDetailComponent } from './components/crudbase/equipaments/equipment-detail/equipament-detail.component';
import { ResidueComponent } from './components/crudbase/residue/residue.component';
import { ResidueDetailComponent } from './components/crudbase/residue/residue-detail/residue-detail.component';
import { ContractComponent } from './components/crudbase/contract/contract.component';
import { CustomerComponent } from './components/crudbase/customer/customer.component';
import { CustomerDetailComponent } from './components/crudbase/customer/customer-detail/customer-detail.component';
import { CustomerContractsComponent } from './components/crudbase/customer/customer-contracts/customer-contracts.component';
import { CustomerAddressesComponent } from './components/crudbase/customer/customer-addresses/customer-addresses.component';
import { CustomerSupervisorsComponent } from './components/crudbase/customer/customer-supervisors/customer-supervisors.component';
import { CustomerInfoComponent } from './components/crudbase/customer/customer-info/customer-info.component';
import { CustomerContractsDetailComponent } from './components/crudbase/customer/customer-contracts/customer-contracts-detail/customer-contracts-detail.component';
import { CustomerAddressesDetailComponent } from './components/crudbase/customer/customer-addresses/customer-addresses-detail/customer-addresses-detail.component';
import { CustomerSupervisorsDetailComponent } from './components/crudbase/customer/customer-supervisors/customer-supervisors-detail/customer-supervisors-detail.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';


import { FormsModule,ReactiveFormsModule  } from '@angular/forms';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { UtilModule } from './util/util.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    EquipmentsComponent,
    FooterComponent,
    ResidueComponent,
    ContractComponent,
    CustomerComponent,
    EquipmentDetailComponent,
    ResidueDetailComponent,
    CustomerDetailComponent,
    CustomerContractsComponent,
    CustomerAddressesComponent,
    CustomerSupervisorsComponent,
    CustomerInfoComponent,
    CustomerContractsDetailComponent,
    CustomerAddressesDetailComponent,
    CustomerSupervisorsDetailComponent,

  ],
  imports: [
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
    UtilModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
