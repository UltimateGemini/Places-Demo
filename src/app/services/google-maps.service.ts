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
    search_term: 'Tacos',
    search_address: '',
    search_radius: '8046' // = 5 miles
  };
  public points: any;

  constructor(public fourSquareService: FoursquareService) { }

  public loadMap() {
    this.map = GoogleMaps.create('map_canvas');
    this.getCurrentLocation();
  }

  public geocodeAddress(query: any) {
    this.map.clear();
    try {
      Geocoder.geocode({ "address": query.search_address }).then((results: GeocoderResult[]) => {
        if (results.length) {
          // Turn location obj to string and combine.
          var locationString = Object.keys(results[0].position).map(key => results[0].position[key]).join(',');
          query.search_address = locationString;

          // Add default term if none is entered.
          if (!query.search_term) {
            query.search_term = this._defaultQuery.search_term
          }

          // Move Camera to current location
          this.map.animateCamera({
            'target': results[0].position,
            'zoom': 12,
            'duration': 3000
          });

          // Adds marker to current location
          let marker: Marker = this.map.addMarkerSync({
            title: 'You Are Here',
            snippet: `${results[0].locality}, ${results[0].adminArea}`,
            position: results[0].position,
            icon: 'Crimson',
            animation: GoogleMapsAnimation.BOUNCE
          });
          marker.showInfoWindow();

          // Gets venues near current location
          this.getVenuesNearLocation(query);

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
          }, 2000);

          // Adds Circle to radius
          this.map.addCircle({
            'center': results[0].position,
            'radius': query.search_radius,
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

  private getVenuesNearLocation(query: any) {
    this.fourSquareService.getVenues(query).subscribe(async venues => {
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
    });
  }

  private getCurrentLocation() {
    try {
      this.map.getMyLocation().then((location: MyLocation) => {
        if (location) {
          // Turn location obj to string and combine.
          var locationString = Object.keys(location.latLng).map(key => location.latLng[key]).join(',');
          this._defaultQuery.search_address = locationString;

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
          }, 2000);

          this.map.addCircle({
            'center': location.latLng,
            'radius': parseInt(this._defaultQuery.search_radius),
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
      }).catch(err => {
        console.log('Error: ', err.error_message);
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }
}
