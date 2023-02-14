import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipamentsComponent } from './components/crudbase/crud-components/equipaments/equipaments.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudMenuComponent } from './components/util/crud-menu/crud-menu.component';
import { ItensTableComponent } from './components/util/itens-table/itens-table.component';
import { ResidueComponent } from './components/crudbase/crud-components/residue/residue.component';
import { ContractComponent } from './components/crudbase/crud-components/contract/contract.component';
import { CustomerComponent } from './components/crudbase/crud-components/customer/customer.component';
import { FormsModule } from '@angular/forms';
import { EquipamentDetailComponent } from './components/crudbase/crud-components/equipaments/equipament-detail/equipament-detail.component';
import { ResidueDetailComponent } from './components/crudbase/crud-components/residue/residue-detail/residue-detail.component';
import { CustomerDetailComponent } from './components/crudbase/crud-components/customer/customer-detail/customer-detail.component';
import { ItensTableCustomerComponent } from './components/util/itens-table-customer/itens-table-customer.component';
import { CpfCnpjPipePipe } from './pipes/cpf-cnpj-pipe.pipe';
import { CustomerContractsComponent } from './components/crudbase/crud-components/customer/customer-contracts/customer-contracts.component';
import { CustomerAddressesComponent } from './components/crudbase/crud-components/customer/customer-addresses/customer-addresses.component';
import { CustomerSupervisorsComponent } from './components/crudbase/crud-components/customer/customer-supervisors/customer-supervisors.component';
import { CustomerInfoComponent } from './components/crudbase/crud-components/customer/customer-info/customer-info.component';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    EquipamentsComponent,
    FooterComponent,
    CrudMenuComponent,
    ItensTableComponent,
    ResidueComponent,
    ContractComponent,
    CustomerComponent,
    EquipamentDetailComponent,
    ResidueDetailComponent,
    CustomerDetailComponent,
    ItensTableCustomerComponent,
    CpfCnpjPipePipe,
    CustomerContractsComponent,
    CustomerAddressesComponent,
    CustomerSupervisorsComponent,
    CustomerInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
