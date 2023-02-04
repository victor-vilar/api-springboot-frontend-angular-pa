import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EquipamentsComponent } from './components/equipaments/equipaments.component';
import { FooterComponent } from './components/footer/footer.component';
import { CrudMenuComponent } from './components/util/crud-menu/crud-menu.component';
import { ItensTableComponent } from './components/util/itens-table/itens-table.component';
import { ResidueComponent } from './components/residue/residue.component';
import { ContractComponent } from './components/contract/contract.component';
import { ClientComponent } from './components/client/client.component';

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
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
