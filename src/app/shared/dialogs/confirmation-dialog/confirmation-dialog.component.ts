import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  confirmation:boolean = false;
  object:any;
  message:string = "";

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }


  ngOnInit(){

    if(this.data !== null && this.data !== undefined){
      this.message = this.data.text;
    }else{
      this.message = "Gostaria de deletar ?"
    }
  }


}
