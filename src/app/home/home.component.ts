import { Component } from '@angular/core';
import { EngineHandlerService } from '../services/engine-handler.service';
import { HelperService } from '../services/helper.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ModalContentComponent} from '../modal-content/modal-content.component';
import { PrayerModalComponent } from '../prayer-modal/prayer-modal.component';
import { PsaumeModalComponent } from '../psaume-modal/psaume-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  str:string = '';
  str_1:string = '';
  str_2:string = '';
  main_filters:Array<any> = ['psaumes', 'prayers'];
  second_filters:Array<any> = ['michael', 'gabriel', 'raphael', 'ouriel'];
  psaumes_selected:boolean = true;
  prayers_selected:boolean = true;
  michael_selected:boolean = true;
  gabriel_selected:boolean = true;
  raphael_selected:boolean = true;
  ouriel_selected:boolean = true;

  //data
  prayersAndPsaumes:Array<any> = [];
  psaumes:Array<any> = [];
  prayers:Array<any> = [];
  psaumesAndPrayersTotal:number = 0;
  psaumesTotal:number = 0;
  prayersTotal:number = 0;
  psaumesOnlyTotal:number = 0;
  prayersOnlyTotal:number = 0;
  //end
  //splite indexes
  psaumesAndPrayersIndex:number = 100;
  psaumesIndex:number = 100;
  prayersIndex:number = 100;
  //end
  //hide and display controllers
  results_status:string = 'hidden';
  psaumes_prayers_container:string = 'hidden';
  psaumes_container:string = 'hidden';
  prayers_container:string = 'hidden';
  more_psaumes_and_prayers:string = "hidden";
  more_psaumes:string = "hidden";
  more_prayers:string = "hidden";
  //end
  //process state
  pocess_state:string = "Patientez...";
  modal_status:string = "hidden";
  //end
  //stores
  ppStore:Array<any> = [];
  psStore:Array<any> = [];
  prStore:Array<any> = [];

  //for combine search
  more_combine_psaumes_and_prayers:string = "hidden";
  more_combine_psaumes:string = "hidden";
  more_combine_prayers:string = "hidden";
  //stores
  ppCoStore:Array<any> = [];
  psCoStore:Array<any> = [];
  prCoStore:Array<any> = [];
  //totals
  psaumesCombineTotal:number = 0;
  prayersCombineTotal:number = 0;
  psaumesAndPrayersCombineTotal:number = 0;
  combinePsaumesOnlyTotal:number = 0;
  combinePrayersOnlyTotal:number = 0;

  //data
  combinePrayersAndPsaumes:Array<any> = [];
  combinePsaumes:Array<any> = [];
  combinePrayers:Array<any> = [];
  //status
  combine_results_status:string = "hidden";
  combine_psaumes_prayers_container:string = "hidden";
  combine_psaumes_container:string = "hidden";
  combine_prayers_container:string = "hidden";
  //indexes
  combinePsaumesAndPrayersIndex:number = 100;
  combinePrayersIndex:number = 100;
  combinePsaumesIndex:number = 100;

  constructor(private engine:EngineHandlerService, public helper:HelperService, public dialog: MatDialog){

    //this.test();
  }
  /*
  * * inputs managers
  */
  setString(value:string){
    this.str = value.trim();
  }
  addSearchFilter(level:string, tag:string){
    if(level === 'main'){
      if(tag === 'psaumes'){
        if(this.psaumes_selected === true){
          let i = this.main_filters.indexOf(tag);
          this.main_filters.splice(i, 1);
          this.psaumes_selected = false;
        }else{
          this.main_filters.push(tag);
          this.psaumes_selected = true;
        }
      }else if(tag === 'prayers'){
        if(this.prayers_selected === true){
          let i = this.main_filters.indexOf(tag);
          this.main_filters.splice(i, 1);
          this.prayers_selected = false;
        }else{
          this.main_filters.push(tag);
          this.prayers_selected = true;
        }
      }

    }else if(level === 'second'){
      if(tag === 'michael'){
        if(this.michael_selected === true){
          this.second_filters.splice(this.second_filters.indexOf(tag), 1);
          this.michael_selected = false;
        }else{
          this.second_filters.push(tag);
          this.michael_selected = true;
        }
      }else if(tag === 'raphael'){
        if(this.raphael_selected === true){
          this.second_filters.splice(this.second_filters.indexOf(tag), 1);
          this.raphael_selected = false;
        }else{
          this.second_filters.push(tag);
          this.raphael_selected = true;
        }
      }else if(tag === 'gabriel'){
        if(this.gabriel_selected === true){
          this.second_filters.splice(this.second_filters.indexOf(tag), 1);
          this.gabriel_selected = false;
        }else{
          this.second_filters.push(tag);
          this.gabriel_selected = true;
        }
      }else if(tag === 'ouriel'){
        if(this.ouriel_selected === true){
          this.second_filters.splice(this.second_filters.indexOf(tag), 1);
          this.ouriel_selected = false;
        }else{
          this.second_filters.push(tag);
          this.ouriel_selected = true;
        }
      }
    }
  }
  /*
  * * To manage psaumes and prayers when selected
  */
  orderPsaumesAndPrayers(psaumesAndPrayers:Array<any>){
    let tempPsaumePsaumesAndPrayers = [];
    let tempPsaumePsaumesAndPrayersOcc = [];
    let psaumes_total = 0;
    let prayers_total = 0;
    let psaumes_and_prayers_total = 0;

    for(let i = 0; i < psaumesAndPrayers.length; i++){

      let occ_name = this.countCurrentContentOcc(psaumesAndPrayers[i].nom_psaume);
      let occ_psaume = this.countCurrentContentOcc(psaumesAndPrayers[i].contenu_psaume);
      let occ_prayer = this.countCurrentContentOcc(psaumesAndPrayers[i].contenu_priere);
      psaumesAndPrayers[i].occ_psaume = occ_name + occ_psaume;
      psaumesAndPrayers[i].occ_priere = occ_prayer;
      psaumesAndPrayers[i].occ_total = occ_name + occ_psaume + occ_prayer;
      //update totals
      psaumes_total+= occ_psaume;
      prayers_total+= occ_prayer;
      psaumes_and_prayers_total = psaumes_total + prayers_total;
      //
      let random_nbr = this.generateRandomNbr();
      let total = occ_name + occ_psaume + occ_prayer;
      let token = "" + total + "." + random_nbr + "";
      let unique_total = parseFloat(token);
      psaumesAndPrayers[i].random_nbr = random_nbr;
      psaumesAndPrayers[i].token = token;
      //
      tempPsaumePsaumesAndPrayers.push(psaumesAndPrayers[i]);
      tempPsaumePsaumesAndPrayersOcc.push(unique_total);
      //
    }
    this.psaumesTotal = psaumes_total;
    this.prayersTotal = prayers_total;
    this.psaumesAndPrayersTotal = psaumes_and_prayers_total;
    //
    let sortedOcc = this.sortArrayDesc(tempPsaumePsaumesAndPrayersOcc);
    this.prayersAndPsaumes = this.getReadyPsaumesAndPrayers(sortedOcc, tempPsaumePsaumesAndPrayers);
    //hide loader
    this.modal_status = "hidden";
    this.results_status = '';
    this.psaumes_prayers_container = "";
    //hide other blocks
    this.psaumes_container = 'hidden';
    this.prayers_container = 'hidden';
    //hide combine search results blocks
    this.combine_results_status = 'hidden';
  }
  getReadyPsaumesAndPrayers(sorted_occ:Array<any>, psaumes_and_prayers:Array<any>){
    let readyData:Array<any> = [];
    for(let i = 0; i < psaumes_and_prayers.length; i++){
      let tok = parseFloat(psaumes_and_prayers[i].token);
      let index = sorted_occ.indexOf(tok);
      if(index !== -1){
        readyData[index] = psaumes_and_prayers[i];
      }
    }
    return readyData;
  }
  countCurrentContentOcc(content:string){

    let str = this.str.trim();
    let markers = ["s", "x", "S", "X"];
    let last_char = str.slice(-1);
    let cut_str = str.slice(0, -1);
    let reg = new RegExp(str, "gi");
    //
    if(/[A-Za-z]+/.test(content)){
      if(markers.indexOf(last_char) === -1){
        let matches = content.match(reg);
        if(Array.isArray(matches)){
          let nbr = matches.length;
          return nbr;
        }else{
          return 0;
        }
      }else{
        let extra_reg = new RegExp(cut_str, "gi");
        let extra_matches = content.match(extra_reg);
        let matches = content.match(reg);
        //
        let total_count = 0;

        if(Array.isArray(matches)){
          total_count+= matches.length;
        }
        if(Array.isArray(extra_matches)){
          total_count+= extra_matches.length;
        }

        return total_count;
      }
    }else{
      return 0;
    }
  }
  loadMorePsaumesAndPrayers(tag:string){
    if(tag === "psaumes_and_prayers"){
      let prev_index = this.psaumesAndPrayersIndex;
      let data = this.ppStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.psaumesAndPrayersIndex+= length;
        this.more_psaumes_and_prayers = "hidden";
        this.orderPsaumesAndPrayers(new_slice);
        this.moveToContent();
      }else{
        this.psaumesAndPrayersIndex+= 100;
        let data_to_load = this.ppStore.slice(prev_index + 1, this.psaumesAndPrayersIndex);
        this.more_psaumes_and_prayers = "";
        this.orderPsaumesAndPrayers(data_to_load);
        this.moveToContent();
      }
    }else if(tag === "psaumes"){
      let prev_index = this.psaumesIndex;
      let data = this.psStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.psaumesIndex+= length;
        this.more_psaumes = "hidden";
        this.orderPsaumes(new_slice);
        this.moveToContent();
      }else{
        this.psaumesIndex+= 100;
        let data_to_load = this.psStore.slice(prev_index + 1, this.psaumesIndex);
        this.more_psaumes = "";
        this.orderPsaumes(data_to_load);
        this.moveToContent();
      }
    }else if(tag === "prayers"){
      let prev_index = this.prayersIndex;
      let data = this.prStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.prayersIndex+= length;
        this.more_prayers = "hidden";
        this.orderPrayers(new_slice);
        this.moveToContent();
      }else{
        this.prayersIndex+= 100;
        let data_to_load = this.prStore.slice(prev_index + 1, this.prayersIndex);
        this.more_prayers = "";
        this.orderPrayers(data_to_load);
        this.moveToContent();
      }
    }
  }
  /*
  * * To manage psaumes when selected
  */
  orderPsaumes(psaumes:Array<any>){
    let tempPsaumes = [];
    let tempPsaumesOcc = [];
    let psaumes_total = 0;

    for(let i = 0; i < psaumes.length; i++){

      let occ_name = this.countCurrentContentOcc(psaumes[i].nom_psaume);
      let occ_psaume = this.countCurrentContentOcc(psaumes[i].contenu_psaume);
      psaumes[i].occ_psaume = occ_name + occ_psaume;
      psaumes[i].occ_total = occ_name + occ_psaume;
      //update totals
      psaumes_total+= occ_psaume;
      psaumes_total+= occ_name;
      //
      let random_nbr = this.generateRandomNbr();
      let total = occ_name + occ_psaume;
      let token = "" + total + "." + random_nbr + "";
      let unique_total = parseFloat(token);
      psaumes[i].random_nbr = random_nbr;
      psaumes[i].token = token;
      //
      tempPsaumes.push(psaumes[i]);
      tempPsaumesOcc.push(unique_total);
      //
    }
    this.psaumesOnlyTotal = psaumes_total;
    //
    let sortedOcc = this.sortArrayDesc(tempPsaumesOcc);
    this.psaumes = this.getReadyPsaumesAndPrayers(sortedOcc, tempPsaumes);
    //hide loader
    this.modal_status = "hidden";
    this.results_status = '';
    this.psaumes_container = "";
    //hide other blocks
    this.psaumes_prayers_container = 'hidden';
    this.prayers_container = 'hidden';
    //hide combine search results blocks
    this.combine_results_status = 'hidden';
  }
  /*
  * * To manage prayers when selected
  */
  orderPrayers(prayers:Array<any>){
    let tempPrayers = [];
    let tempPrayersOcc = [];
    let prayers_total = 0;

    for(let i = 0; i < prayers.length; i++){

      let occ_prayer = this.countCurrentContentOcc(prayers[i].contenu_priere);
      prayers[i].occ_priere = occ_prayer;
      prayers[i].occ_total = occ_prayer;
      //update totals
      prayers_total+= occ_prayer;
      //
      let random_nbr = this.generateRandomNbr();
      let total = occ_prayer;
      let token = "" + total + "." + random_nbr + "";
      let unique_total = parseFloat(token);
      prayers[i].random_nbr = random_nbr;
      prayers[i].token = token;
      //
      tempPrayers.push(prayers[i]);
      tempPrayersOcc.push(unique_total);
      //
    }
    this.prayersOnlyTotal = prayers_total;
    //
    let sortedOcc = this.sortArrayDesc(tempPrayersOcc);
    this.prayers = this.getReadyPsaumesAndPrayers(sortedOcc, tempPrayers);
    //hide loader
    this.modal_status = "hidden";
    this.results_status = '';
    this.prayers_container = "";
    //hide other blocks
    this.psaumes_prayers_container = "hidden";
    this.psaumes_container = 'hidden';
    //hide combine search results block
    this.combine_results_status = 'hidden';
  }
  /*
  * * search managers
  */
  startSearch(){
    if(/\+/.test(this.str)){
      if(this.str.length > 3 && /[A-Za-z]+/.test(this.str)){
        if(this.verifyCombineSearch() === true){
          this.modal_status = "";
          this.pocess_state = "Recherche...";
          //hide previous results
          this.combine_results_status = 'hidden';
          this.engine.initEngineForCombine([this.str_1, this.str_2], this.main_filters, this.second_filters)
          .subscribe(
            res =>this.managecombineSearchRes(res),
            err =>this.managecombineSearchErr(err)
          );
        }else{
          alert("Votre recherche combinée n'est pas valide.");
        }
      }else{
        alert("Veuillez fournir une recherche combinée valide.");
      }
    }else{
      if(this.str.length < 1 || !/[A-Za-z]+/.test(this.str)){
        alert("Veuillez saisir un mot-clé valide !");
      }else{
        if(this.main_filters.length === 0 || this.second_filters.length === 0){
          alert("Veuillez choisir au moins une catégorie (Psaumes, Prières) et un archange (Michael, Gabriel, Raphael, Ouriel).");
        }else{
          this.modal_status = "";
          this.pocess_state = "Recherche...";
          //hide previous results
          this.results_status = 'hidden';
          //init search
          this.engine.initEngine(this.str, this.main_filters, this.second_filters)
          .subscribe(
            res =>this.manageSearchRes(res),
            err =>this.manageSearchErr(err)
          );
        }
      }
    }
  }
  manageSearchRes(res:any){
    if(res === null){
      this.modal_status = "hidden";
      alert("Diffile de trouver des occurrences. Affinez votre recherche.");
    }else{
      if(res.error === true){
        alert(res.message);
      }else{
        if(res.content.length < 1){
          this.modal_status = "hidden";
          alert("Aucune occurrence trouvée.");
        }else{
          if(this.main_filters.indexOf('psaumes') !== -1 && this.main_filters.indexOf('prayers') !== -1){
            this.ppStore = res.content;
            let pp = this.spliteArrayDefault(res.content, "psaumes_and_prayers");
            this.orderPsaumesAndPrayers(pp);
          }else{
            if(this.main_filters.indexOf('psaumes') !== -1){
              this.psStore = res.content;
              let ps = this.spliteArrayDefault(res.content, "psaumes");
              this.orderPsaumes(ps);
            }else{
              this.prStore = res.content;
              let pr = this.spliteArrayDefault(res.content, "prayers");
              this.orderPrayers(pr);
            }
          }
        }
      }
    }
  }
  manageSearchErr(err:any){
    this.modal_status = "hidden";
    alert("Une erreur s'est produite.");
  }
  /*
  * * To manage combine search
  */
  verifyCombineSearch(){
    let arr_str = this.str.split('+');
    if(/[a-zA-Z0-9]+/.test(arr_str[0]) && /[a-zA-Z0-9]+/.test(arr_str[1])){
      this.str_1 = arr_str[0];
      this.str_2 = arr_str[1];
      return true;
    }else{
      return false;
    }
  }
  managecombineSearchRes(res:any){
    if(res === null){
      this.modal_status = "hidden";
      alert("Diffile de trouver des occurrences. Affinez votre recherche.");
    }else{
      if(res.error === true){
        this.modal_status = "hidden";
        alert(res.message);
      }else{
        if(res.content.length < 1){
          this.modal_status = "hidden";
          alert("Aucune occurrence trouvée.");
        }else{
          if(this.main_filters.indexOf('psaumes') !== -1 && this.main_filters.indexOf('prayers') !== -1){
            this.ppCoStore = res.content;
            let pp = this.spliteCombineArrayDefault(res.content, "psaumes_and_prayers");
            this.orderCombinePsaumesAndPrayers(pp);
          }else{
            if(this.main_filters.indexOf('psaumes') !== -1){
              this.psCoStore = res.content;
              let ps = this.spliteCombineArrayDefault(res.content, "psaumes");
              this.orderCombinePsaumes(ps);
            }else{
              this.prCoStore = res.content;
              let pr = this.spliteCombineArrayDefault(res.content, "prayers");
              this.orderCombinePrayers(pr);
            }
          }
        }
      }
    }
  }
  managecombineSearchErr(err:any){
    this.modal_status = "hidden";
    alert("Une erreur s'est produite.");
  }
  spliteCombineArrayDefault(arr_to_slice:Array<any>, tag:string){
    let length = arr_to_slice.length;
    if(length < 100){
      if(tag === "psaumes_and_prayers"){
        this.more_combine_psaumes_and_prayers = "hidden";
      }else if(tag === "psaumes"){
        this.more_combine_psaumes = "hidden";
      }else if(tag === "prayers"){
        this.more_combine_prayers = "hidden";
      }
      return arr_to_slice;
    }else{
      if(tag === "psaumes_and_prayers"){
        this.more_combine_psaumes_and_prayers = "";
      }else if(tag === "psaumes"){
        this.more_combine_psaumes = "";
      }else if(tag === "prayers"){
        this.more_combine_prayers = "";
      }
      return arr_to_slice.slice(0, 100);
    }
  }
  orderCombinePsaumesAndPrayers(psaumesAndPrayers:Array<any>){
    let tempPsaumePsaumesAndPrayers = [];
    let tempPsaumePsaumesAndPrayersOcc = [];
    let psaumes_total = 0;
    let prayers_total = 0;
    let psaumes_and_prayers_total = 0;

    for(let i = 0; i < psaumesAndPrayers.length; i++){
      //str_1
      let occ_name_str_1 = this.countCombineCurrentContentOcc(psaumesAndPrayers[i].nom_psaume, this.str_1);
      let occ_psaume_str_1 = this.countCombineCurrentContentOcc(psaumesAndPrayers[i].contenu_psaume, this.str_1);
      let occ_prayer_str_1 = this.countCombineCurrentContentOcc(psaumesAndPrayers[i].contenu_priere, this.str_1);
      psaumesAndPrayers[i].occ_psaume_str_1 = occ_name_str_1 + occ_psaume_str_1;
      psaumesAndPrayers[i].occ_priere_str_1 = occ_prayer_str_1;
      psaumesAndPrayers[i].occ_total_str_1 = occ_name_str_1 + occ_psaume_str_1 + occ_prayer_str_1;
      //update totals
      psaumes_total+= occ_psaume_str_1;
      prayers_total+= occ_prayer_str_1;
      psaumes_and_prayers_total = psaumes_total + prayers_total;
      //str_2
      let occ_name_str_2 = this.countCombineCurrentContentOcc(psaumesAndPrayers[i].nom_psaume, this.str_2);
      let occ_psaume_str_2 = this.countCombineCurrentContentOcc(psaumesAndPrayers[i].contenu_psaume, this.str_2);
      let occ_prayer_str_2 = this.countCombineCurrentContentOcc(psaumesAndPrayers[i].contenu_priere, this.str_2);
      psaumesAndPrayers[i].occ_psaume_str_2 = occ_name_str_2 + occ_psaume_str_2;
      psaumesAndPrayers[i].occ_priere_str_2 = occ_prayer_str_2;
      psaumesAndPrayers[i].occ_total_str_2 = occ_name_str_2 + occ_psaume_str_2 + occ_prayer_str_2;
      //total for the two str
      psaumesAndPrayers[i].occ_total = psaumesAndPrayers[i].occ_total_str_1 + psaumesAndPrayers[i].occ_total_str_2;
      //update totals
      psaumes_total+= occ_psaume_str_2;
      prayers_total+= occ_prayer_str_2;
      psaumes_and_prayers_total = psaumes_total + prayers_total;
      //
      let random_nbr = this.generateRandomNbr();
      let total = occ_name_str_1 + occ_psaume_str_1 + occ_prayer_str_1 + occ_name_str_2 + occ_psaume_str_2 + occ_prayer_str_2;
      let token = "" + total + "." + random_nbr + "";
      let unique_total = parseFloat(token);
      psaumesAndPrayers[i].random_nbr = random_nbr;
      psaumesAndPrayers[i].token = token;
      //
      tempPsaumePsaumesAndPrayers.push(psaumesAndPrayers[i]);
      tempPsaumePsaumesAndPrayersOcc.push(unique_total);
      //
    }

    this.psaumesCombineTotal = psaumes_total;
    this.prayersCombineTotal = prayers_total;
    this.psaumesAndPrayersCombineTotal = psaumes_and_prayers_total;
    //
    let sortedOcc = this.sortArrayDesc(tempPsaumePsaumesAndPrayersOcc);
    this.combinePrayersAndPsaumes = this.getReadyPsaumesAndPrayers(sortedOcc, tempPsaumePsaumesAndPrayers);
    //hide loader
    this.modal_status = "hidden";
    this.combine_results_status = '';
    this.combine_psaumes_prayers_container = "";
    //hide other blocks
    this.combine_psaumes_container = 'hidden';
    this.combine_prayers_container = 'hidden';
    //hide simple results block
    this.results_status = 'hidden';
  }
  orderCombinePsaumes(psaumes:Array<any>){
    let tempPsaumes = [];
    let tempPsaumesOcc = [];
    let psaumes_total = 0;

    for(let i = 0; i < psaumes.length; i++){
      //str_1
      let occ_name_str_1 = this.countCombineCurrentContentOcc(psaumes[i].nom_psaume, this.str_1);
      let occ_psaume_str_1 = this.countCombineCurrentContentOcc(psaumes[i].contenu_psaume, this.str_1);
      psaumes[i].occ_psaume_str_1 = occ_name_str_1 + occ_psaume_str_1;
      //update totals
      psaumes_total+= occ_psaume_str_1;
      psaumes_total+= occ_name_str_1;

      //str_2
      let occ_name_str_2 = this.countCombineCurrentContentOcc(psaumes[i].nom_psaume, this.str_2);
      let occ_psaume_str_2 = this.countCombineCurrentContentOcc(psaumes[i].contenu_psaume, this.str_2);
      psaumes[i].occ_psaume_str_2 = occ_name_str_2 + occ_psaume_str_2;
      //update totals
      psaumes_total+= occ_psaume_str_2;
      psaumes_total+= occ_name_str_2;

      //set total
      psaumes[i].occ_total = psaumes[i].occ_psaume_str_1 + psaumes[i].occ_psaume_str_2;
      //
      let random_nbr = this.generateRandomNbr();
      let total = psaumes[i].occ_total;
      let token = "" + total + "." + random_nbr + "";
      let unique_total = parseFloat(token);
      psaumes[i].random_nbr = random_nbr;
      psaumes[i].token = token;
      //
      tempPsaumes.push(psaumes[i]);
      tempPsaumesOcc.push(unique_total);
    }
    this.combinePsaumesOnlyTotal = psaumes_total;
    //
    let sortedOcc = this.sortArrayDesc(tempPsaumesOcc);
    this.combinePsaumes = this.getReadyPsaumesAndPrayers(sortedOcc, tempPsaumes);
    //hide loader
    this.modal_status = "hidden";
    this.combine_results_status = '';
    this.combine_psaumes_container = "";
    //hide other blocks
    this.combine_psaumes_prayers_container = 'hidden';
    this.combine_prayers_container = 'hidden';
    //hide simple results block
    this.results_status = 'hidden';
  }
  orderCombinePrayers(prayers:Array<any>){
    let tempPrayers = [];
    let tempPrayersOcc = [];
    let prayers_total = 0;

    for(let i = 0; i < prayers.length; i++){

      //str_1
      let occ_prayer_str_1 = this.countCombineCurrentContentOcc(prayers[i].contenu_priere, this.str_1);
      prayers[i].occ_priere_str_1 = occ_prayer_str_1;
      //update totals
      prayers_total+= occ_prayer_str_1;
      //str_2
      let occ_prayer_str_2 = this.countCombineCurrentContentOcc(prayers[i].contenu_priere, this.str_2);
      prayers[i].occ_priere_str_2 = occ_prayer_str_2;
      //update totals
      prayers_total+= occ_prayer_str_2;

      //set total
      prayers[i].occ_total = occ_prayer_str_1 + occ_prayer_str_2;
      //
      let random_nbr = this.generateRandomNbr();
      let total = prayers[i].occ_total;
      let token = "" + total + "." + random_nbr + "";
      let unique_total = parseFloat(token);
      prayers[i].random_nbr = random_nbr;
      prayers[i].token = token;
      //
      tempPrayers.push(prayers[i]);
      tempPrayersOcc.push(unique_total);
      //
    }
    this.combinePrayersOnlyTotal = prayers_total;
    let sortedOcc = this.sortArrayDesc(tempPrayersOcc);
    this.combinePrayers = this.getReadyPsaumesAndPrayers(sortedOcc, tempPrayers);
    //hide loader
    this.modal_status = "hidden";
    this.combine_results_status = '';
    this.combine_prayers_container = "";
    //hide other blocks
    this.combine_psaumes_prayers_container = "hidden";
    this.combine_psaumes_container = 'hidden';
    //hide simple search results block
    this.results_status = 'hidden';
  }
  countCombineCurrentContentOcc(content:string, str_x:string){
    let str = str_x.trim();
    let markers = ["s", "x", "S", "X"];
    let last_char = str.slice(-1);
    let cut_str = str.slice(0, -1);
    let reg = new RegExp(str, "gi");
    //
    if(/[A-Za-z]+/.test(content)){
      if(markers.indexOf(last_char) === -1){
        let matches = content.match(reg);
        if(Array.isArray(matches)){
          let nbr = matches.length;
          return nbr;
        }else{
          return 0;
        }
      }else{
        let extra_reg = new RegExp(cut_str, "gi");
        let extra_matches = content.match(extra_reg);
        let matches = content.match(reg);
        //
        let total_count = 0;

        if(Array.isArray(matches)){
          total_count+= matches.length;
        }
        if(Array.isArray(extra_matches)){
          total_count+= extra_matches.length;
        }

        return total_count;
      }
    }else{
      return 0;
    }
  }
  loadMoreCombinePsaumesAndPrayers(tag:string){
    if(tag === "psaumes_and_prayers"){
      let prev_index = this.combinePsaumesAndPrayersIndex;
      let data = this.ppCoStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.combinePsaumesAndPrayersIndex+= length;
        this.more_combine_psaumes_and_prayers = "hidden";
        this.orderCombinePsaumesAndPrayers(new_slice);
        this.moveToContent();
      }else{
        this.combinePsaumesAndPrayersIndex+= 100;
        let data_to_load = this.ppCoStore.slice(prev_index + 1, this.combinePsaumesAndPrayersIndex);
        this.more_combine_psaumes_and_prayers = "";
        this.orderCombinePsaumesAndPrayers(data_to_load);
        this.moveToContent();
      }
    }else if(tag === "psaumes"){
      let prev_index = this.combinePsaumesIndex;
      let data = this.psCoStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.combinePsaumesIndex+= length;
        this.more_combine_psaumes = "hidden";
        this.orderCombinePsaumes(new_slice);
        this.moveToContent();
      }else{
        this.combinePsaumesIndex+= 100;
        let data_to_load = this.psCoStore.slice(prev_index + 1, this.combinePsaumesIndex);
        this.more_combine_psaumes = "";
        this.orderCombinePsaumes(data_to_load);
        this.moveToContent();
      }
    }else if(tag === "prayers"){
      let prev_index = this.combinePrayersIndex;
      let data = this.prCoStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.combinePrayersIndex+= length;
        this.more_combine_prayers = "hidden";
        this.orderCombinePrayers(new_slice);
        this.moveToContent();
      }else{
        this.combinePrayersIndex+= 100;
        let data_to_load = this.prCoStore.slice(prev_index + 1, this.combinePrayersIndex);
        this.more_combine_prayers = "";
        this.orderCombinePrayers(data_to_load);
        this.moveToContent();
      }
    }
  }
  /*
  * * modals methods
  */
  showPsaumeAndPrayer(psaume_title:string, psaume_content:string, prayer_content:string, psaume_nbr:string, prayer_nbr:string){
    this.dialog.open(ModalContentComponent,{
      data:{
        title:psaume_title,
        psaume:psaume_content,
        priere:prayer_content,
        numero_psaume:psaume_nbr,
        numero_priere:prayer_nbr
      }
    });
  }
  showPsaume(nom_psaume:string, contenu_psaume:string, numero_psaume:string){
    this.dialog.open(PsaumeModalComponent,{
      data:{
        nom_psaume:nom_psaume,
        contenu_psaume:contenu_psaume,
        numero_psaume:numero_psaume
      }
    });
  }
  showPrayer(contenu_priere:string, numero_priere:string){
    this.dialog.open(PrayerModalComponent,{
      data:{
        numero_priere:numero_priere,
        contenu_priere:contenu_priere
      }
    });
  }
  /*
  * * shared methods
  */
  spliteArrayDefault(arr_to_slice:Array<any>, tag:string){
    let length = arr_to_slice.length;
    if(length < 100){
      if(tag === "psaumes_and_prayers"){
        this.more_psaumes_and_prayers = "hidden";
      }else if(tag === "psaumes"){
        this.more_psaumes = "hidden";
      }else if(tag === "prayers"){
        this.more_prayers = "hidden";
      }
      return arr_to_slice;
    }else{
      if(tag === "psaumes_and_prayers"){
        this.more_psaumes_and_prayers = "";
      }else if(tag === "psaumes"){
        this.more_psaumes = "";
      }else if(tag === "prayers"){
        this.more_prayers = "";
      }
      return arr_to_slice.slice(0, 100);
    }
  }
  sortArrayDesc(arr:Array<any>){
    arr.sort(function(a, b){return b - a});
    return arr;
  }
  generateRandomNbr(){
    let nbr = Math.floor(Math.random() * 1000000) + Date.now();
    return nbr;
  }
  abortSearch(){
    window.location.reload();
  }
  moveToTop(){
    window.scroll({
      top:0,
      left:0,
      behavior:"smooth",
    });
  }
  moveToBottom(){
    window.scroll({
      top:100000,
      left:0,
      behavior:"smooth",
    });
  }
  moveToContent(){
    window.scroll({
      top:120,
      left:0,
      behavior:"smooth",
    });
  }
  test(){
    let filename = 'rib.pdf';
    let filepath = 'http://localhost/lok/tools/temp/' + filename;
    let a = document.createElement('a');
    a.download = filename;
    a.href = filepath;
    a.click();
  }
}
