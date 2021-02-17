import { GoogleMapsService } from './../services/google-maps.service';
import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public search_address: string;
  public search_radius = 0;

  constructor(private platform: Platform, public gMapsService: GoogleMapsService, public toastController: ToastController) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.gMapsService.loadMap();
    });
  }

  async searchAddress() {
    if (!this.search_address) {
      const toast = await this.toastController.create({
        message: 'Address field is required!',
        position: 'top',
        cssClass: 'toast-custom-class',
        duration: 3000
      });
      toast.present();
    } else {
      this.gMapsService.map.clear();
      this.gMapsService.geocodeAddress(this.search_address, this.search_radius);
    }
  }
}
