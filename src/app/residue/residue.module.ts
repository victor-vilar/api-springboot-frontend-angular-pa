import { ResidueComponent } from './residue-list/residue.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidueDetailComponent } from './residue-detail/residue-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TemplateModule } from 'src/app/template/template.module';
import { ResidueRoutingModule } from './residue-routing.module';
import { MaterialModuleModule } from '../shared/material-module.module';



@NgModule({
  declarations: [
    ResidueComponent,
    ResidueDetailComponent
  ],
  imports: [
    CommonModule,
    ResidueRoutingModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    MaterialModuleModule
  ]
})
export class ResidueModule { }
