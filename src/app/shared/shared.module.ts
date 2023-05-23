
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
import { MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



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
