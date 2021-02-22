import { Venue } from './../models/Venue';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    return this._http.get<Venue[]>(
      BASE_URL + CLIENT_ID + CLIENT_SECRET + VERSION +
      query.search_address + INTENT + query.search_radius + `&query=${query.search_term}` + LIMIT).pipe(map(res => res['response'].venues));
  }
}
