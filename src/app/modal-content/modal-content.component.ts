import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EngineHandlerService } from '../services/engine-handler.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.css']
})
export class ModalContentComponent {
  title:string = "";
  psaume:string = "";
  priere:string = "";
  psaumeNbr:string = "";
  prayerNbr:string = "";
  //
  modal_status:string = "hidden";
  constructor(public engine:EngineHandlerService, public dialogRef:MatDialogRef<ModalContentComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {title:string, psaume:string, priere:string, numero_psaume:string, numero_priere:string}){
    this.title = data.title;
    this.psaume = data.psaume;
    this.priere = data.priere;
    this.psaumeNbr = data.numero_psaume;
    this.prayerNbr = data.numero_priere;
  }
  closeDialog(){
    this.dialogRef.close();
  }
  initPrint(){
    this.modal_status = "";
    //
    let psaume_title = "Psaume " + this.psaumeNbr + " : " + this.title;
    let psaume_body = this.psaume;
    let prayer_title = "Prière " + this.prayerNbr;
    let prayer_body = this.priere;

    this.engine.convertToPdf('psaume_and_prayer', psaume_title, psaume_body, prayer_title, prayer_body)
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
