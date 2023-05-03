import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  root:string = 'http://gnosis.io/api/in/';
  creators_root:string = 'http://gnosis.io/api/tools/';
  downloadDir:string = 'http://gnosis.io/api/tools/temp/';
  //POST
  search:string = this.root + 'search.php';
  combine_search:string = this.root + 'combine-search.php';
  pdf_creator:string = this.creators_root + 'pdf.php';
  //GET
  constructor() { }
}
