import { GoogleMapsService } from './../services/google-maps.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  searched: any = [];

  constructor(public gMapsService: GoogleMapsService) {
    this.searched = this.gMapsService.placesSearched;
    console.log(this.searched);
  }

}
