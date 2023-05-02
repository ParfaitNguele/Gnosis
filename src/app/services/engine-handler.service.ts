import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlProviderService }from '../services/url-provider.service';

@Injectable({
  providedIn: 'root'
})
export class EngineHandlerService {

  constructor(private http:HttpClient, public url:UrlProviderService) { }
  initEngine(query_string:string, main_filters:Array<any>, second_filters:Array<any>){
    return this.http.post(this.url.search, JSON.stringify({auth_name:'seen', auth_value:'NKsGZ1ep22S8BEDFNIML', query_string:query_string, main_filters:main_filters, second_filters:second_filters}));
  }
  initEngineForCombine(query_string:Array<any>, main_filters:Array<any>, second_filters:Array<any>){
    return this.http.post(this.url.combine_search, JSON.stringify({auth_name:'cose', auth_value:'MLsHZ1fp62S9AEQFNFMM', query_string:query_string, main_filters:main_filters, second_filters:second_filters}));
  }
  convertToPdf(tag:string, psaume_title:string, psaume_body:string, prayer_title:string, prayer_body:string){
    let req = this.http.post(this.url.pdf_creator, JSON.stringify({psaume_statut:"display", prayer_statut:"display", psaume_title:psaume_title, psaume_body:psaume_body, prayer_title:prayer_title, prayer_body:prayer_body}));
    if(tag === "psaume_and_prayer"){
      req = this.http.post(this.url.pdf_creator, JSON.stringify({psaume_statut:"display", prayer_statut:"display", psaume_title:psaume_title, psaume_body:psaume_body, prayer_title:prayer_title, prayer_body:prayer_body}));
    }else if(tag === "psaume"){
      req = this.http.post(this.url.pdf_creator, JSON.stringify({psaume_statut:"display", prayer_statut:"hidden", psaume_title:psaume_title, psaume_body:psaume_body, prayer_title:prayer_title, prayer_body:prayer_body}));
    }else if(tag === "prayer"){
      req = this.http.post(this.url.pdf_creator, JSON.stringify({psaume_statut:"hidden", prayer_statut:"display", psaume_title:psaume_title, psaume_body:psaume_body, prayer_title:prayer_title, prayer_body:prayer_body}));
    }
    return req;
  }
  returnPsaumeAndPrayerReq(){}
  downloadPDF(filename:string){
    let filepath = this.url.downloadDir + filename;
    let a = document.createElement('a');
    a.download = filename;
    a.href = filepath;
    a.click();
  }
}
