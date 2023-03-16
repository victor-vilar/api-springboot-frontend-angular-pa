import { ErrorDialogComponent } from './../components/util/error-dialog/error-dialog.component';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

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
      console.log('The dialog was closed');
    });
  }

  openErrorDialog(message:string){
    const dialogRef = this.dialog.open(ErrorDialogComponent,{data:{
      error: message,
    }});

    this.afterCloseDialog(dialogRef,'');
  }


}
