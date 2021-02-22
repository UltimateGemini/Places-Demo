import { Injectable } from '@angular/core';
import { GoogleMap, GoogleMaps, GoogleMapsAnimation, Marker, MyLocation, Geocoder, GeocoderResult, Circle } from '@ionic-native/google-maps';
import { BehaviorSubject } from 'rxjs';
import { FoursquareService } from './foursquare.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  public map: GoogleMap;
  public venuesPositions = [];
  private _defaultQuery = {
    term: 'Tacos',
    address: '',
    radius: '16093' // = 10 miles
  };

  constructor(public fourSquareService: FoursquareService) { }

  public loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.getMyLocation();
  }

  public geocodeAddress(address: string, radius: number) {
    try {
      Geocoder.geocode({ "address": address }).then((results: GeocoderResult[]) => {
        // console.log('results', results);
        if (!results.length) {
          return null;
        } else {
          // console.log('LatLng: ', results[0].position);
          // this.position.next(results[0].position);
          // console.log('form address:', this.position);

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
            'zoom': 12,
            'tilt': 60,
            'bearing': 140,
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



  private getMyLocation() {
    try {
      // this.map.clear();

      // Gets your current location
      this.map.getMyLocation().then((location: MyLocation) => {
        if (location) {
          console.log('location', location.latLng);
          // Turn location obj to string and combine.
          var locationString = Object.keys(location.latLng).map(key => location.latLng[key]).join(',');
          this._defaultQuery.address = locationString;

          this.getVenuesNearLocation();

          // Ad marker to default location
          let marker: Marker = this.map.addMarkerSync({
            title: 'Here I am!',
            position: location.latLng,
            animation: GoogleMapsAnimation.BOUNCE
          });
          marker.showInfoWindow();

          // Adds marker to default position
          this.map.animateCamera({
            'target': location.latLng,
            'zoom': 13,
            'duration': 5000
          });

          // TO FIX : MARKERS NOT PUTTING DOWN MARKERS
          // Add markers to venues
          // var bounds = [];
          // var markers = this.venuesPositions.map(function (options) {
          //   bounds.push(options.position);
          //   console.log('bounds', bounds);
          //   return this.map.addMarker(options);
          // });

          // Set a camera position that includes all markers.
          // this.map.moveCamera({
          //   target: bounds
          // });

          // markers[markers.length - 1].showInfoWindow();


          // Adds marker to position
          // this.map.animateCamera({
          //   'target': location.latLng,
          //   'zoom': 15,
          //   'duration': 5000
          // });
          // Adds radius to position
          // this.map.addCircle({
          //   'center': location.latLng,
          //   'radius': 1,
          //   'strokeColor': '#078C03',
          //   'strokeWidth': 1,
          //   'fillColor': '#3FBF04'
          // }).then((circle: Circle) => {
          //   this.map.moveCamera({
          //     target: circle.getBounds()
          //   });
          // });
        }
      }).catch(err => {
        console.log('Error: ', err.error_message);
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  private getVenuesNearLocation() {
    if (this._defaultQuery) {
      this.fourSquareService.getVenues(this._defaultQuery).subscribe(venues => {
        if (venues) {
          this.venuesPositions = venues.map((v: any) => {
            return {
              'title': v.name,
              'position': { 'lat': v.location.lat, 'lng': v.location.lng },
              'address': v.location.address,
              'city': v.location.city,
              'state': v.location.state,
              'country': v.location.country
            };
          });
        }
        console.log('VENUES', this.venuesPositions);
      });
    }
  }
}
