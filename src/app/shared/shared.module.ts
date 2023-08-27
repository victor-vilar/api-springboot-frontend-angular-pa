
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { CrudMenuComponent } from './crud-menu/crud-menu.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { ItensTableComponent } from './itens-table/itens-table.component';
import { ProgressComponent } from './dialogs/progress/progress.component';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CpfCnpjPipePipe } from './pipes/cpf-cnpj-pipe.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModuleModule } from './material-module.module';



@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CrudMenuComponent,
    ErrorDialogComponent,
    ItensTableComponent,
    ProgressComponent,
    SuccessDialogComponent,
    CpfCnpjPipePipe,
    PhonePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModuleModule


  ],
  exports:[
    ConfirmationDialogComponent,
    CrudMenuComponent,
    ErrorDialogComponent,
    ItensTableComponent,
    ProgressComponent,
    SuccessDialogComponent,
    PhonePipe,
    CpfCnpjPipePipe,

  ]
})
export class SharedModule { }
