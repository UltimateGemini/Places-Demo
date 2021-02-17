import { Component } from '@angular/core';
import { Environment } from '@ionic-native/google-maps';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    setTimeout(() => {
      this.platform.ready().then(() => {
        Environment.setEnv({
          'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyACLXvbfDe7uGt3vAI_JAhP0Ny0m20nn-8',
          'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyACLXvbfDe7uGt3vAI_JAhP0Ny0m20nn-8'
        });
      });
    }, 4000);
  }
}
