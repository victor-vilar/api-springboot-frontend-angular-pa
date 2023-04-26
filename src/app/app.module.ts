import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipmentsComponent } from './components/crudbase/crud-components/equipaments/equipaments.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudMenuComponent } from './components/util/crud-menu/crud-menu.component';
import { ItensTableComponent } from './components/util/itens-table/itens-table.component';
import { ResidueComponent } from './components/crudbase/crud-components/residue/residue.component';
import { ContractComponent } from './components/crudbase/crud-components/contract/contract.component';
import { CustomerComponent } from './components/crudbase/crud-components/customer/customer.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { EquipmentDetailComponent } from './components/crudbase/crud-components/equipaments/equipment-detail/equipament-detail.component';
import { ResidueDetailComponent } from './components/crudbase/crud-components/residue/residue-detail/residue-detail.component';
import { CustomerDetailComponent } from './components/crudbase/crud-components/customer/customer-detail/customer-detail.component';
import { ItensTableCustomerComponent } from './components/util/itens-table-customer/itens-table-customer.component';
import { CpfCnpjPipePipe } from './pipes/cpf-cnpj-pipe.pipe';
import { CustomerContractsComponent } from './components/crudbase/crud-components/customer/customer-contracts/customer-contracts.component';
import { CustomerAddressesComponent } from './components/crudbase/crud-components/customer/customer-addresses/customer-addresses.component';
import { CustomerSupervisorsComponent } from './components/crudbase/crud-components/customer/customer-supervisors/customer-supervisors.component';
import { CustomerInfoComponent } from './components/crudbase/crud-components/customer/customer-info/customer-info.component';
import { CustomerContractsDetailComponent } from './components/crudbase/crud-components/customer/customer-contracts/customer-contracts-detail/customer-contracts-detail.component';
import { ItensTableItemContractComponent } from './components/util/itens-table-item-contract/itens-table-item-contract.component';
import { CustomerAddressesDetailComponent } from './components/crudbase/crud-components/customer/customer-addresses/customer-addresses-detail/customer-addresses-detail.component';
import { CustomerSupervisorsDetailComponent } from './components/crudbase/crud-components/customer/customer-supervisors/customer-supervisors-detail/customer-supervisors-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './components/util/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ErrorDialogComponent } from './components/util/error-dialog/error-dialog.component';
import { PhonePipe } from './pipes/phone.pipe';
import { SuccessDialogComponent } from './components/util/success-dialog/success-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProgressComponent } from './components/util/progress/progress.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    EquipmentsComponent,
    FooterComponent,
    CrudMenuComponent,
    ItensTableComponent,
    ResidueComponent,
    ContractComponent,
    CustomerComponent,
    EquipmentDetailComponent,
    ResidueDetailComponent,
    CustomerDetailComponent,
    ItensTableCustomerComponent,
    CpfCnpjPipePipe,
    CustomerContractsComponent,
    CustomerAddressesComponent,
    CustomerSupervisorsComponent,
    CustomerInfoComponent,
    CustomerContractsDetailComponent,
    ItensTableItemContractComponent,
    CustomerAddressesDetailComponent,
    CustomerSupervisorsDetailComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    PhonePipe,
    SuccessDialogComponent,
    ProgressComponent
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
    MatTooltipModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
