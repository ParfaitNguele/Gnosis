import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlProviderService {
  root:string = 'https://gnosis.ecole-essenienne.world/api/in/';
  creators_root:string = 'https://gnosis.ecole-essenienne.world/api/tools/';
  downloadDir:string = 'https://gnosis.ecole-essenienne.world/api/tools/temp/';
  //POST
  search:string = this.root + 'search.php';
  combine_search:string = this.root + 'combine-search.php';
  digit_search:string = this.root + "digit-search.php";
  pdf_creator:string = this.creators_root + 'pdf.php';
  //GET
  constructor() { }
}
