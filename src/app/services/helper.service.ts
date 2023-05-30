import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  markSearchWordSimple(content:string, str:string){
    let reg = new RegExp("(?=\\b)" + str + "(\\W)", "giu");
    let new_str = content.replace(reg, "<mark>" + str + "$1</mark>");
    return new_str;
  }
  markSearchWordCombine(content:string, str_1:string, str_2:string){
    let reg_1 = new RegExp("(?=\\b)" + str_1 + "(\\W)", "giu");
    let reg_2 = new RegExp("(?=\\b)" + str_2 + "(\\W)", "giu");
    let new_str_1 = content.replace(reg_1, "<mark>" + str_1 + "$1</mark>");
    let new_str_2 = new_str_1.replace(reg_2, "<mark>" + str_2 + "$1</mark>");
    return new_str_2;
  }
  markSearchWordDigit(content:string, str:string){
    let reg = new RegExp("\\s" + str + "\\s", "g");
    let new_str = content.replace(reg, "<mark>" + str + "</mark>");
    return new_str;
  }
}
