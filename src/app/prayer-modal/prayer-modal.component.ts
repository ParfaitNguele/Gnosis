import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EngineHandlerService } from '../services/engine-handler.service';

@Component({
  selector: 'app-prayer-modal',
  templateUrl: './prayer-modal.component.html',
  styleUrls: ['./prayer-modal.component.css']
})
export class PrayerModalComponent {
  priere:string = "";
  prayerNbr:string = "";
  //
  modal_status:string = "hidden";
  constructor(public engine:EngineHandlerService, public dialogRef:MatDialogRef<PrayerModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {numero_priere:string, contenu_priere:string}){
    this.priere = data.contenu_priere;
    this.prayerNbr = data.numero_priere;
  }
  closeDialog(){
    this.dialogRef.close();
  }
  initPrint(){
    this.modal_status = "";
    //
    let psaume_title = "";
    let psaume_body = "";
    let prayer_title = "Prière " + this.prayerNbr;
    let prayer_body = this.priere;

    this.engine.convertToPdf('prayer', psaume_title, psaume_body, prayer_title, prayer_body)
    .subscribe(
      res =>this.manageConversionRes(res),
      err =>this.manageConversionErr(err)
    );
  }
  manageConversionRes(res:any){
    if(res.filename === ""){
      this.modal_status = "hidden";
      alert("Une erreur s'est produite à la conversion.");
    }else{
      let file = res.filename;
      this.engine.downloadPDF(file);
      this.modal_status = "hidden";
    }
  }
  manageConversionErr(err:any){
    this.modal_status = "hidden";
    alert("Nous n'avons pas pu créer un pdf.");
  }
}
