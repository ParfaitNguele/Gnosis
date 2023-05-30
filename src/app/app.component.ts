import { Component } from '@angular/core';
import { EngineHandlerService } from './services/engine-handler.service';
import { HelperService } from './services/helper.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ModalContentComponent} from './modal-content/modal-content.component';
import { PrayerModalComponent } from './prayer-modal/prayer-modal.component';
import { PsaumeModalComponent } from './psaume-modal/psaume-modal.component';
import { HowComponent } from './how/how.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gnosis';
  str:string = '';
  str_1:string = '';
  str_2:string = '';
  search_type:string = '';
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
  //
  resultsTotal:number = 0;
  resultsTotalStatus:string = "hidden";
  //
  //digit
  digit_results_status:string = "hidden";
  digit_psaumes_prayers_container:string = "hidden";
  digit_psaumes_container:string = "hidden";
  digit_prayers_container:string = "hidden";
  psaumesDigitTotal:number = 0;
  prayersDigitTotal:number = 0;
  psaumesAndPrayersDigitTotal:number = 0;
  ppDiStore:Array<any> = [];
  psDiStore:Array<any> = [];
  prDiStore:Array<any> = [];
  digitPrayersAndPsaumes:Array<any> = [];
  diPsaumes:Array<any> = [];
  diPrayers:Array<any> = [];
  digit_more_psaumes_and_prayers:string = "hidden";
  digit_more_psaumes:string = "hidden";
  digit_more_prayers:string = "hidden";
  di_psaumesAndPrayersIndex:number = 100;
  di_psaumesIndex:number = 100;
  di_prayersIndex:number = 100;

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

  orderPsaumesAndPrayers(data:any){
    this.psaumesTotal = 0;
    this.prayersTotal = 0;
    this.psaumesAndPrayersTotal = 0;
    //
    this.psaumesTotal = data.psaumes_total;
    this.prayersTotal = data.prayers_total;
    this.psaumesAndPrayersTotal = data.psaumes_and_prayers_total;

    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.ppStore = arrangedArr;
    let splited = this.spliteArrayDefault(arrangedArr, "psaumes_and_prayers");
    this.prayersAndPsaumes = splited;
    //hide loader
    this.modal_status = "hidden";
    this.results_status = '';
    this.psaumes_prayers_container = "";
    //hide other blocks
    this.psaumes_container = 'hidden';
    this.prayers_container = 'hidden';
    //hide combine search results blocks
    this.combine_results_status = 'hidden';
    this.digit_results_status = "hidden";
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
  loadMorePsaumesAndPrayers(tag:string){
    if(tag === "psaumes_and_prayers"){
      let prev_index = this.psaumesAndPrayersIndex;
      let data = this.ppStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.psaumesAndPrayersIndex+= length;
        this.more_psaumes_and_prayers = "hidden";
        this.prayersAndPsaumes = this.prayersAndPsaumes.concat(new_slice);
      }else{
        this.psaumesAndPrayersIndex+= 100;
        let data_to_load = this.ppStore.slice(prev_index + 1, this.psaumesAndPrayersIndex);
        this.more_psaumes_and_prayers = "";
        this.prayersAndPsaumes = this.prayersAndPsaumes.concat(data_to_load);
      }
    }else if(tag === "psaumes"){
      let prev_index = this.psaumesIndex;
      let data = this.psStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.psaumesIndex+= length;
        this.more_psaumes = "hidden";
        this.psaumes = this.psaumes.concat(new_slice);
      }else{
        this.psaumesIndex+= 100;
        let data_to_load = this.psStore.slice(prev_index + 1, this.psaumesIndex);
        this.more_psaumes = "";
        this.psaumes = this.psaumes.concat(data_to_load);
      }
    }else if(tag === "prayers"){
      let prev_index = this.prayersIndex;
      let data = this.prStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.prayersIndex+= length;
        this.more_prayers = "hidden";
        this.prayers = this.prayers.concat(new_slice);
      }else{
        this.prayersIndex+= 100;
        let data_to_load = this.prStore.slice(prev_index + 1, this.prayersIndex);
        this.more_prayers = "";
        this.prayers = this.prayers.concat(data_to_load);
      }
    }
  }
  /*
  * * To manage psaumes when selected
  */
  orderPsaumes(data:any){
    this.psaumesOnlyTotal = data.psaumes_total;
    //
    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.psStore = arrangedArr;
    let splited = this.spliteArrayDefault(arrangedArr, "psaumes");
    this.psaumes = splited;
    //hide loader
    this.modal_status = "hidden";
    this.results_status = '';
    this.psaumes_container = "";
    //hide other blocks
    this.psaumes_prayers_container = 'hidden';
    this.prayers_container = 'hidden';
    //hide combine search results blocks
    this.combine_results_status = 'hidden';
    this.digit_results_status = "hidden";
  }
  /*
  * * To manage prayers when selected
  */
  orderPrayers(data:any){
    this.prayersOnlyTotal = data.prayers_total;
    //
    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.prStore = arrangedArr;
    let splited = this.spliteArrayDefault(arrangedArr, "prayers");
    this.prayers = splited;
    //hide loader
    this.modal_status = "hidden";
    this.results_status = '';
    this.prayers_container = "";
    //hide other blocks
    this.psaumes_prayers_container = "hidden";
    this.psaumes_container = 'hidden';
    //hide combine search results block
    this.combine_results_status = 'hidden';
    this.digit_results_status = "hidden";
  }
  /*
  * * search managers
  */
  startSearch(){
    if(/\+/.test(this.str) || /"/.test(this.str)){
      if(/\+/.test(this.str)){
        if(this.str.length > 3 && /[A-Za-z]+/.test(this.str)){
          if(this.verifyCombineSearch() === true && this.containsSpecialChars(this.str_1) === false && this.containsSpecialChars(this.str_2) === false && this.checkBar(this.str_1) === false && this.checkBar(this.str_2) === false){

            if(this.main_filters.length === 0 || this.second_filters.length === 0){
              alert("Veuillez choisir au moins une catégorie (Psaumes, Prières) et un archange (Michael, Gabriel, Raphael, Ouriel).");
            }else{
              this.modal_status = "";
              this.pocess_state = "Recherche...";
              //hide previous results
              this.combine_results_status = 'hidden';
              this.search_type = "combine";
              let s_1 = this.encodeQuote(this.str_1);
              let s_2 = this.encodeQuote(this.str_2);
              this.engine.initEngineForCombine([s_1, s_2], this.main_filters, this.second_filters)
              .subscribe(
                res =>this.managecombineSearchRes(res),
                err =>this.managecombineSearchErr(err)
              );
            }
          }else{
            alert("Votre recherche combinée n'est pas valide.");
          }
        }else{
          alert("Veuillez fournir une recherche combinée valide.");
        }
      }else{
        if(/"/.test(this.str)){
          let arr_dig = this.str.split('"');
          if(arr_dig.length === 3 && /[0-9]+/.test(arr_dig[1]) && this.containsSpecialChars(arr_dig[1]) === false && this.checkBar(arr_dig[1]) === false){

            if(this.main_filters.length === 0 || this.second_filters.length === 0){
              alert("Veuillez choisir au moins une catégorie (Psaumes, Prières) et un archange (Michael, Gabriel, Raphael, Ouriel).");
            }else{
              this.modal_status = "";
              this.pocess_state = "Recherche...";
              //hide previous results
              this.digit_results_status = 'hidden';
              this.search_type = "digit";
              this.engine.initEngineForDigit(arr_dig[1], this.main_filters, this.second_filters)
              .subscribe(
                res =>this.manageDigitRes(res),
                err =>this.manageDigitErr(err)
              );
            }
          }else{
            alert('Veuillez saisir une recherche de chiffre valide. Exemple : "6"');
          }
        }
      }
    }else{
      if(this.str.length < 1 || !/[A-Za-z]+/.test(this.str) || this.containsSpecialChars(this.str) === true || this.checkBar(this.str) === true){
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
          this.search_type = "simple";
          this.engine.initEngine(this.encodeQuote(this.str), this.main_filters, this.second_filters)
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
            this.orderPsaumesAndPrayers(res);
          }else{
            if(this.main_filters.indexOf('psaumes') !== -1){
              this.orderPsaumes(res);
            }else{
              this.orderPrayers(res);
            }
          }
        }
      }
    }
  }
  manageSearchErr(err:any){
    this.modal_status = "hidden";
    console.log(err);
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
            this.orderCombinePsaumesAndPrayers(res);
          }else{
            if(this.main_filters.indexOf('psaumes') !== -1){
              this.orderCombinePsaumes(res);
            }else{
              this.orderCombinePrayers(res);
            }
          }
        }
      }
    }
  }
  managecombineSearchErr(err:any){
    this.modal_status = "hidden";
    console.log(err);
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
  orderCombinePsaumesAndPrayers(data:any){
    this.psaumesCombineTotal = data.psaumes_total;
    this.prayersCombineTotal = data.prayers_total;
    this.psaumesAndPrayersCombineTotal = data.psaumes_and_prayers_total;
    //
    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.ppCoStore = arrangedArr;
    let splited = this.spliteCombineArrayDefault(arrangedArr, "psaumes_and_prayers");
    this.combinePrayersAndPsaumes = splited;
    //hide loader
    this.modal_status = "hidden";
    this.combine_results_status = '';
    this.combine_psaumes_prayers_container = "";
    //hide other blocks
    this.combine_psaumes_container = 'hidden';
    this.combine_prayers_container = 'hidden';
    //hide simple results block
    this.results_status = 'hidden';
    this.digit_results_status = "hidden";
  }
  orderCombinePsaumes(data:any){
    this.combinePsaumesOnlyTotal = data.psaumes_total;
    //
    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.psCoStore = arrangedArr;
    let splited = this.spliteCombineArrayDefault(arrangedArr, "psaumes");
    this.combinePsaumes = splited;
    //hide loader
    this.modal_status = "hidden";
    this.combine_results_status = '';
    this.combine_psaumes_container = "";
    //hide other blocks
    this.combine_psaumes_prayers_container = 'hidden';
    this.combine_prayers_container = 'hidden';
    //hide simple results block
    this.results_status = 'hidden';
    this.digit_results_status = "hidden";
  }
  orderCombinePrayers(data:any){
    this.combinePrayersOnlyTotal = data.prayers_total;
    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.prCoStore = arrangedArr;
    let splited = this.spliteCombineArrayDefault(arrangedArr, "prayers");
    this.combinePrayers = splited;
    //hide loader
    this.modal_status = "hidden";
    this.combine_results_status = '';
    this.combine_prayers_container = "";
    //hide other blocks
    this.combine_psaumes_prayers_container = "hidden";
    this.combine_psaumes_container = 'hidden';
    //hide simple search results block
    this.results_status = 'hidden';
    this.digit_results_status = "hidden";
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
        this.combinePrayersAndPsaumes = this.combinePrayersAndPsaumes.concat(new_slice);
      }else{
        this.combinePsaumesAndPrayersIndex+= 100;
        let data_to_load = this.ppCoStore.slice(prev_index + 1, this.combinePsaumesAndPrayersIndex);
        this.more_combine_psaumes_and_prayers = "";
        this.combinePrayersAndPsaumes = this.combinePrayersAndPsaumes.concat(data_to_load);
      }
    }else if(tag === "psaumes"){
      let prev_index = this.combinePsaumesIndex;
      let data = this.psCoStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.combinePsaumesIndex+= length;
        this.more_combine_psaumes = "hidden";
        this.combinePsaumes = this.combinePsaumes.concat(new_slice);
      }else{
        this.combinePsaumesIndex+= 100;
        let data_to_load = this.psCoStore.slice(prev_index + 1, this.combinePsaumesIndex);
        this.more_combine_psaumes = "";
        this.combinePsaumes = this.combinePsaumes.concat(data_to_load);
      }
    }else if(tag === "prayers"){
      let prev_index = this.combinePrayersIndex;
      let data = this.prCoStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.combinePrayersIndex+= length;
        this.more_combine_prayers = "hidden";
        this.combinePrayers = this.combinePrayers.concat(new_slice);
      }else{
        this.combinePrayersIndex+= 100;
        let data_to_load = this.prCoStore.slice(prev_index + 1, this.combinePrayersIndex);
        this.more_combine_prayers = "";
        this.combinePrayers = this.combinePrayers.concat(data_to_load);
      }
    }
  }
  /*
  * * For digit search
  */
  manageDigitRes(res:any){
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
            this.orderDigitPsaumesAndPrayers(res);
          }else{
            if(this.main_filters.indexOf('psaumes') !== -1){
              this.orderDigitPsaumes(res);
            }else{
              this.orderDigitPrayers(res);
            }
          }
        }
      }
    }
  }
  manageDigitErr(err:any){
    this.modal_status = "hidden";
    console.log(err);
    alert("Une erreur s'est produite.");
  }
  orderDigitPsaumesAndPrayers(data:any){
    this.psaumesDigitTotal = 0;
    this.prayersDigitTotal = 0;
    this.psaumesAndPrayersDigitTotal = 0;
    //
    this.psaumesDigitTotal = data.psaumes_total;
    this.prayersDigitTotal = data.prayers_total;
    this.psaumesAndPrayersDigitTotal = data.psaumes_and_prayers_total;

    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.ppDiStore = arrangedArr;
    let splited = this.spliteDigitArrayDefault(arrangedArr, "psaumes_and_prayers");
    this.digitPrayersAndPsaumes = splited;
    //hide loader
    this.modal_status = "hidden";
    this.digit_psaumes_prayers_container = "";
    this.digit_results_status = '';
    //hide other blocks
    this.digit_psaumes_container = 'hidden';
    this.digit_prayers_container = 'hidden';
    this.results_status = 'hidden';
    this.combine_results_status = 'hidden';
  }

  orderDigitPsaumes(data:any){
    this.psaumesDigitTotal = data.psaumes_total;
    //
    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.psDiStore = arrangedArr;
    let splited = this.spliteDigitArrayDefault(arrangedArr, "psaumes");
    this.diPsaumes = splited;
    //hide loader
    this.modal_status = "hidden";
    this.digit_results_status = '';
    this.digit_psaumes_container = "";
    //hide other blocks
    this.digit_psaumes_prayers_container = 'hidden';
    this.digit_prayers_container = 'hidden';
    //hide combine search results blocks
    this.combine_results_status = 'hidden';
    this.results_status = 'hidden';
  }

  orderDigitPrayers(data:any){
    this.prayersDigitTotal = data.prayers_total;
    //
    let sortedOcc = this.sortArrayDesc(data.occurrences);
    let arrangedArr = this.getReadyPsaumesAndPrayers(sortedOcc, data.content);
    this.prDiStore = arrangedArr;
    let splited = this.spliteArrayDefault(arrangedArr, "prayers");
    this.diPrayers = splited;
    //hide loader
    this.modal_status = "hidden";
    this.digit_results_status = '';
    this.digit_prayers_container = "";
    //hide other blocks
    this.digit_psaumes_prayers_container = "hidden";
    this.digit_psaumes_container = 'hidden';
    //hide combine search results block
    this.combine_results_status = 'hidden';
    this.results_status = "hidden";
  }
  spliteDigitArrayDefault(arr_to_slice:Array<any>, tag:string){
    let length = arr_to_slice.length;
    if(length < 100){
      if(tag === "psaumes_and_prayers"){
        this.digit_more_psaumes_and_prayers = "hidden";
      }else if(tag === "psaumes"){
        this.digit_more_psaumes = "hidden";
      }else if(tag === "prayers"){
        this.digit_more_prayers = "hidden";
      }
      return arr_to_slice;
    }else{
      if(tag === "psaumes_and_prayers"){
        this.digit_more_psaumes_and_prayers = "";
      }else if(tag === "psaumes"){
        this.digit_more_psaumes = "";
      }else if(tag === "prayers"){
        this.digit_more_prayers = "";
      }
      return arr_to_slice.slice(0, 100);
    }
  }
  loadMoreDigitPsaumesAndPrayers(tag:string){
    if(tag === "psaumes_and_prayers"){
      let prev_index = this.di_psaumesAndPrayersIndex;
      let data = this.ppDiStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.di_psaumesAndPrayersIndex+= length;
        this.digit_more_psaumes_and_prayers = "hidden";
        this.digitPrayersAndPsaumes = this.digitPrayersAndPsaumes.concat(new_slice);
      }else{
        this.di_psaumesAndPrayersIndex+= 100;
        let data_to_load = this.ppStore.slice(prev_index + 1, this.di_psaumesAndPrayersIndex);
        this.digit_more_psaumes_and_prayers = "";
        this.digitPrayersAndPsaumes = this.digitPrayersAndPsaumes.concat(data_to_load);
      }
    }else if(tag === "psaumes"){
      let prev_index = this.di_psaumesIndex;
      let data = this.psDiStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.di_psaumesIndex+= length;
        this.digit_more_psaumes = "hidden";
        this.diPsaumes = this.diPsaumes.concat(new_slice);
      }else{
        this.di_psaumesIndex+= 100;
        let data_to_load = this.psDiStore.slice(prev_index + 1, this.di_psaumesIndex);
        this.digit_more_psaumes = "";
        this.diPsaumes = this.diPsaumes.concat(data_to_load);
      }
    }else if(tag === "prayers"){
      let prev_index = this.di_prayersIndex;
      let data = this.prDiStore;
      let length = data.length - prev_index;
      if(length <= 100){
        let new_slice = data.slice(prev_index + 1, -1);
        this.di_prayersIndex+= length;
        this.digit_more_prayers = "hidden";
        this.diPrayers = this.diPrayers.concat(new_slice);
      }else{
        this.di_prayersIndex+= 100;
        let data_to_load = this.prDiStore.slice(prev_index + 1, this.di_prayersIndex);
        this.digit_more_prayers = "";
        this.diPrayers = this.diPrayers.concat(data_to_load);
      }
    }
  }

  /*
  * * modals methods
  */
  showPsaumeAndPrayer(psaume_title:string, psaume_content:string, prayer_content:string, psaume_nbr:string, prayer_nbr:string, nom_archange:string){
    //mark query
    let psaumeTitle = this.decodeQuote(psaume_title);
    let pc = this.formateInput(psaume_content);
    let psaumeContent = this.initMark(pc);
    let finalPsaumeContent = this.decodeQuote(psaumeContent);
    let prayerContent = this.initMark(prayer_content);
    let finalPrayerContent = this.decodeQuote(prayerContent);
    //then open modal
    this.dialog.open(ModalContentComponent,{
      data:{
        title:psaumeTitle,
        psaume:finalPsaumeContent,
        priere:finalPrayerContent,
        numero_psaume:psaume_nbr,
        numero_priere:prayer_nbr,
        nom_archange:nom_archange
      }
    });
  }
  showPsaume(nom_psaume:string, contenu_psaume:string, numero_psaume:string, nom_archange:string){
    //mark query
    let psaumeTitle = this.decodeQuote(nom_psaume);
    let pc = this.formateInput(contenu_psaume);
    let psaumeContent = this.initMark(pc);
    let finalContent = this.decodeQuote(psaumeContent);
    //then open modal
    this.dialog.open(PsaumeModalComponent,{
      data:{
        nom_psaume:psaumeTitle,
        contenu_psaume:finalContent,
        numero_psaume:numero_psaume,
        nom_archange:nom_archange
      }
    });
  }
  showPrayer(contenu_priere:string, numero_priere:string, nom_archange:string, numero_psaume:string, nom_psaume:string){
    //mark query
    let prayerContent = this.initMark(contenu_priere);
    let finalContent = this.decodeQuote(prayerContent);
    let namePsaume = this.decodeQuote(nom_psaume);
    //then open modal
    this.dialog.open(PrayerModalComponent,{
      data:{
        numero_priere:numero_priere,
        contenu_priere:finalContent,
        nom_archange:nom_archange,
        numero_psaume:numero_psaume,
        nom_psaume:namePsaume
      }
    });
  }
  shohHowItWorksModal(){
    this.dialog.open(HowComponent);
  }
  /*
  * * shared methods
  */
  initMark(content:string){
    let readyString:string = "";
    if(this.search_type === "simple"){
      readyString = this.helper.markSearchWordSimple(content, this.encodeQuote(this.str.trim()));
    }else if(this.search_type === "combine"){
      readyString = this.helper.markSearchWordCombine(content, this.encodeQuote(this.str_1.trim()), this.encodeQuote(this.str_2.trim()));
    }else if(this.search_type === "digit"){
      let arr_dig = this.str.split('"');
      let digit = arr_dig[1].trim();
      readyString = this.helper.markSearchWordDigit(content, digit);
    }
    return readyString;
  }
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
      top:900000,
      left:0,
      behavior:"smooth",
    });
  }
  formateInput(input:string){
    let reg = /\s(?=[0-9]+\.)/g;
    let new_str = input.replace(reg, "<br/>");
    return new_str;
  }
  setContentStatut(occ:number){
    if(occ === 0){
      return "hidden";
    }else{
      return "";
    }
  }
  setContentStatutForCombine(occ_1:number, occ_2:number){
    if(occ_1 === 0 && occ_2 === 0){
      return "hidden";
    }else{
      return "";
    }
  }
  setArchangeColor(archange:string){
    let color = "";
    if(archange === "MICHAËL"){
      color = "red";
    }else if(archange === "RAPHAËL"){
      color = "green";
    }else if(archange === "GABRIEL"){
      color = "blue";
    }else if(archange === "OURIEL"){
      color = "yellow";
    }
    return color;
  }
  setResultsTotal(total:number){
    this.resultsTotal = total;
    this.resultsTotalStatus = "";
  }
  containsSpecialChars(str:string) {
    const specialChars = /[`!@#$%^&*()_+\=\[\]{};:"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  encodeQuote(content:string){
    let reg = /'/g;
    let reg_2 = /’/g;
    let new_str = content.replace(reg, "&#039;");
    let final_str = new_str.replace(reg_2, "&#039;");
    return final_str;
  }
  decodeQuote(content:string){
    let reg = /&#039;/g;
    let new_str = content.replace(reg, "'");
    return new_str;
  }
  checkBar(str:string){
    if(/[-]{2,}/.test(str)){
      return true;
    }else{
      return false;
    }
  }
  test(){
    let str = "amour-dieu";
    if(/[-]{2,}/.test(str)){
      console.log("Yes.");
    }else{
      console.log("No.");
    }
  }
}
