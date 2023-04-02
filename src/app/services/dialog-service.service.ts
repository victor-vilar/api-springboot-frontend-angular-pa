import { ProgressComponent } from './../components/util/progress/progress.component';
import { SuccessDialogComponent } from './../components/util/success-dialog/success-dialog.component';
import { ConfirmationDialogComponent } from './../components/util/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './../components/util/error-dialog/error-dialog.component';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog:MatDialog,  private route: ActivatedRoute,
    private router: Router){}

  openDialog(component:any, objectToEdit:any, rota:string): void {

    const dialogRef = this.dialog.open(component,{data:{objectToEdit: objectToEdit}});
    this.afterCloseDialog(dialogRef,rota);
  }

  openDialogPassingCustomerId(component:any,objectToEdit:any,customerId:string,rota:string):void{

    const dialogRef = this.dialog.open(component,{data:{
      objectToEdit: objectToEdit,
      clientCpfCnpj:customerId,
    }});

    this.afterCloseDialog(dialogRef,rota);
  }

  private afterCloseDialog(dialogRef:MatDialogRef<any>, rota:string){
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([rota], { queryParams: {  }});
    });
  }

  openErrorDialog(message:string){
    const dialogRef = this.dialog.open(ErrorDialogComponent,{data:{
      error: message,
    }});

    this.afterCloseDialog(dialogRef,'');
  }

  openConfirmationDialog():Observable<boolean>{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent)
    return dialogRef.afterClosed();
  }

  openProgressDialog():MatDialogRef<ProgressComponent> {
    const dialogRef = this.dialog.open(ProgressComponent);
    this.afterCloseDialog(dialogRef,'');
    return dialogRef;
  }

  openSucessDialog(message:string,rota:string):void {
    const dialogRef = this.dialog.open(SuccessDialogComponent,{data:{message:message}});
    this.afterCloseDialog(dialogRef,rota);
  }


}
