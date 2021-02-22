# Places-Demo
<!-- ABOUT THE PROJECT -->
## About The Project
This is a simple app demo of using Google Maps API. By default users location will be shown. When the user enters an address and radius as values and submit, it will display the positon on the map below with a marker and a circle showing the radius. The second tabs displays search addresses.


### Built With

* [Ionic 5](https://ionicframework.com/docs)
* [Angualar 11](https://angular.io/docs)
* [Cordova-plugin-googlemaps](https://github.com/mapsplugin/cordova-plugin-googlemaps-doc)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Must have ionic cli installed and latest node/npm.
* npm
  ```sh
  npm install npm@latest -g
  ```
* Ionic CLI
  ```sh
  npm install -g @ionic/cli
  ```
* Cordova
  ```sh
  npm install -g cordova
  ```
* ios-deploy
  ```sh
  npm i ios-deploy
  ```
  
### Installation

1. Clone/Download the repo
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run project
   on Web:
   ```sh
   ionic cordova run browser
   ```
   on iOS:
   ```sh
   ionic cordova build ios
   ionic cordova run ios
   ```
   on Android:
   ```sh
   ionic cordova build android
   ionic cordova run android
   ```
   
## Notes
PWA is installed and hosted on firebase hosting and can be seen [Here](https://places-demo-304923.web.app), but since cordova does not work on web you will get an error when attemping to load map.
