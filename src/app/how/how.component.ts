import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-how',
  templateUrl: './how.component.html',
  styleUrls: ['./how.component.css']
})
export class HowComponent {
  constructor(public dialogRef:MatDialogRef<HowComponent>){
  }
  closeDialog(){
    this.dialogRef.close();
  }
}
