import { Injectable } from '@angular/core';
import { GoogleMap, GoogleMaps, GoogleMapsAnimation, Marker, MyLocation, Geocoder, GeocoderResult, Circle } from '@ionic-native/google-maps';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  public map: GoogleMap;
  public placesSearched: any = [];

  constructor() { }

  public loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.goToMyLocation();
  }

  public geocodeAddress(address: string, radius: number) {
    try {
      Geocoder.geocode({ "address": address }).then((results: GeocoderResult[]) => {
        console.log('results', results);
        if (!results.length) {
          return null;
        } else {
          this.placesSearched.push(results[0]);
          // Adds marker to position
          let marker: Marker = this.map.addMarkerSync({
            title: 'Here I Am!',
            snippet: `${results[0].locality}, ${results[0].adminArea}`,
            position: results[0].position,
            animation: GoogleMapsAnimation.BOUNCE
          });

          // Moves to position
          this.map.animateCamera({
            'target': marker.getPosition(),
            'zoom': 15,
            'duration': 5000
          }).then(() => {
            marker.showInfoWindow();
          });

          // Adds radius to position
          this.map.addCircle({
            'center': results[0].position,
            'radius': radius,
            'strokeColor': '#078C03',
            'strokeWidth': 1,
            'fillColor': '#3FBF04'
          }).then((circle: Circle) => {
            this.map.moveCamera({
              target: circle.getBounds()
            });
          }).catch(err => {
            console.log('Error: ', err.error_message);
          });
        }
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  private goToMyLocation() {
    try {
      this.map.clear();
      // Gets your current location
      this.map.getMyLocation().then((location: MyLocation) => {
        let marker: Marker = this.map.addMarkerSync({
          title: 'Here I am!',
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });
        // Adds marker to position
        this.map.animateCamera({
          'target': location.latLng,
          'zoom': 15,
          'duration': 5000
        });
        // Adds radius to position
        this.map.addCircle({
          'center': location.latLng,
          'radius': 1,
          'strokeColor': '#078C03',
          'strokeWidth': 1,
          'fillColor': '#3FBF04'
        }).then((circle: Circle) => {
          this.map.moveCamera({
            target: circle.getBounds()
          });
        });

        marker.showInfoWindow();
      }).catch(err => {
        console.log('Error: ', err.error_message);
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
