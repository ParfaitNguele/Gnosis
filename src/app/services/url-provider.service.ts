import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  root:string = 'https://adaptaccessoires.com/gnosis/api/in/';
  creators_root:string = 'https://adaptaccessoires.com/gnosis/api/tools/';
  downloadDir:string = 'https://adaptaccessoires.com/gnosis/api/tools/temp/';
  //POST
  search:string = this.root + 'search.php';
  combine_search:string = this.root + 'combine-search.php';
  digit_search:string = this.root + "digit-search.php";
  pdf_creator:string = this.creators_root + 'pdf.php';
  //GET
  constructor() { }
}
