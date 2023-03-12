import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog:MatDialog){}

  openDialog(component:any, objectToEdit:any): void {
    const dialogRef = this.dialog.open(component,{ data:{objectToEdit:objectToEdit}});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
