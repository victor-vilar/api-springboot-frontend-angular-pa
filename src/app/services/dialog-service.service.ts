import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog:MatDialog,  private route: ActivatedRoute,
    private router: Router){}

  openDialog(component:any, objectToEdit:any, rota:string): void {
    const dialogRef = this.dialog.open(component,{ data:{objectToEdit:objectToEdit}});
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['.',rota], { relativeTo: this.route });
      console.log('The dialog was closed');
    });
  }


}
