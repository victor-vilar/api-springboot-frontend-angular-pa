import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProgressComponent> ) { }
  mode: ProgressSpinnerMode = 'indeterminate';
  ngOnInit(): void {
  }

}
