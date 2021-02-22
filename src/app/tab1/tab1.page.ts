import { Venue } from '../models/Venue';
import { AfterContentInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Platform, ToastController } from '@ionic/angular';

import { FoursquareService } from './../services/foursquare.service';
import { GoogleMapsService } from './../services/google-maps.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterContentInit {
  searchForm: FormGroup;
  venues: Venue[];

  constructor(
    private platform: Platform,
    public gMapsService: GoogleMapsService,
    public fourSquareService: FoursquareService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      search_term: new FormControl(null),
      search_address: new FormControl(null, Validators.required),
      search_radius: new FormControl(null)
    });
  }

  ngAfterContentInit(){
    this.platform.ready().then(() => {
      this.gMapsService.loadMap();
    });
  }

  async onSubmit() {
    const radius = this.convertMilesToMeters(this.searchForm.get('search_radius').value);
    this.searchForm.get('search_radius').setValue(radius);
    this.gMapsService.geocodeAddress(this.searchForm.value);
    this.searchForm.reset();
  }

  private convertMilesToMeters(miles: number) {
    const fixedNumber = Math.round(miles * 1609.344);
    return fixedNumber;
  }
}
