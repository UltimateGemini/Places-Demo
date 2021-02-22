import { Venue } from './../models/Venue';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// https://api.foursquare.com/v2/venues/search
// ?client_id=PL01DSLNEEVL1OURMV40MNVC1QP0IPOPNTEROZNIZT2GCMVD
// &client_secret=CQHSO0LYKU5Y1KXNJ0S0G2BBJFJC0GRSBF4PZ1UQVK54VCEN
// &v=20190425
// &ll=28.3703973,-81.4320047
// &intent=browse
// &radius=300
// &query=tacos
// &limit=5

const BASE_URL = 'https://api.foursquare.com/v2/venues/search';
const CLIENT_ID = '?client_id=PL01DSLNEEVL1OURMV40MNVC1QP0IPOPNTEROZNIZT2GCMVD';
const CLIENT_SECRET = '&client_secret=CQHSO0LYKU5Y1KXNJ0S0G2BBJFJC0GRSBF4PZ1UQVK54VCEN';
const VERSION = '&v=20190425&ll=';
const INTENT = '&intent=browse&radius=';
const LIMIT = '&limit=5';


@Injectable({
  providedIn: 'root'
})
export class FoursquareService {

  constructor(private _http: HttpClient) { }

  getVenues(query: any): Observable<Venue[]> {
    // console.log('URL', BASE_URL + CLIENT_ID + CLIENT_SECRET + VERSION + query.address + INTENT + query.radius + `&query=${query.term}` + LIMIT);
    return this._http.get<Venue[]>(
      BASE_URL + CLIENT_ID + CLIENT_SECRET + VERSION +
      query.address + INTENT + query.radius + `&query=${query.term}` + LIMIT).pipe(map(res => res['response'].venues));
  }

}
