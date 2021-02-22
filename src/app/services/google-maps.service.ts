import { Injectable } from '@angular/core';
import { GoogleMap, GoogleMaps, GoogleMapsAnimation, Marker, MyLocation, Geocoder, GeocoderResult, Circle, BaseArrayClass } from '@ionic-native/google-maps';
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
    radius: '8046' // = 5 miles
  };
  public points: any;

  constructor(public fourSquareService: FoursquareService) { }

  public loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.getCurrentLocation();
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

  private getVenuesNearLocation(query) {
    if (this._defaultQuery) {
      this.fourSquareService.getVenues(query).subscribe(venues => {
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

  private getCurrentLocation() {
    try {
      this.map.getMyLocation().then((location: MyLocation) => {
        if (location) {
          // Turn location obj to string and combine.
          var locationString = Object.keys(location.latLng).map(key => location.latLng[key]).join(',');
          this._defaultQuery.address = locationString;

          // Move Camera to current location
          this.map.animateCamera({
            'target': location.latLng,
            'zoom': 12,
            'duration': 3000
          });

          // Adds marker to current location
          let marker: Marker = this.map.addMarkerSync({
            title: 'You Are Here',
            position: location.latLng,
            icon: 'Crimson',
            animation: GoogleMapsAnimation.BOUNCE
          });
          marker.showInfoWindow();

          // Gets venues near current location
          this.getVenuesNearLocation(this._defaultQuery);

          // Adds markers to venues
          setTimeout(() => {
            let baseArray: BaseArrayClass<any> = new BaseArrayClass<any>(this.venuesPositions);
            baseArray.mapAsync((mOption: any, callback: (marker: Marker) => void) => {
              this.map.addMarker({
                'position': mOption.position,
                'title': mOption.title,
                'icon': 'Navy',
                'snippet': mOption.address
              }).then(callback);
            }).then((markers: Marker[]) => {
              console.log('Markers: ', markers);
            });
          }, 3000);
        }
      }).catch(err => {
        console.log('Error: ', err.error_message);
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
