import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentsComponent } from './equipment-list/equipaments.component';
import { EquipmentDetailComponent } from './equipment-detail/equipament-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EquipmentRoutingModule } from './equipment-routing.module';
import { MaterialModuleModule } from '../shared/material-module.module';



@NgModule({
  declarations: [
    EquipmentsComponent,
    EquipmentDetailComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    RouterModule,
    SharedModule,
  ]
})
export class EquipamentsModule { }
