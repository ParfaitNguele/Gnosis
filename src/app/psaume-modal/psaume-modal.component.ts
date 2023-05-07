import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EngineHandlerService } from '../services/engine-handler.service';

@Component({
  selector: 'app-psaume-modal',
  templateUrl: './psaume-modal.component.html',
  styleUrls: ['./psaume-modal.component.css']
})
export class PsaumeModalComponent {
  title:string = "";
  psaume:string = "";
  psaumeNbr:string = "";
  nomArchange:string = "";
  //
  modal_status:string = "hidden";
  constructor(public engine:EngineHandlerService, public dialogRef:MatDialogRef<PsaumeModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: {nom_psaume:string, contenu_psaume:string, numero_psaume:string, nom_archange:string}){
    this.title = "Psaume " + data.numero_psaume + " de l'Archange " + data.nom_archange + " - " + data.nom_psaume;
    this.psaume = data.contenu_psaume;
    this.psaumeNbr = data.numero_psaume;
    this.nomArchange = data.nom_archange;
  }
  closeDialog(){
    this.dialogRef.close();
  }
  initPrint(){
    this.modal_status = "";
    //
    let psaume_title = this.title;
    let psaume_body = this.psaume;
    let prayer_title = "";
    let prayer_body = "";

    this.engine.convertToPdf('psaume', psaume_title, psaume_body, prayer_title, prayer_body)
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
  setArchangeColor(archange:string){
    let color = "";
    if(archange === "MICHAËL"){
      color = "blue";
    }else if(archange === "RAPHAËL"){
      color = "green";
    }else if(archange === "GABRIEL"){
      color = "orange";
    }else if(archange === "OURIEL"){
      color = "red";
    }
    return color;
  }
}
