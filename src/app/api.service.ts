import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getCountries(): Observable<any> {
    return this.http.get('http://www.radio-browser.info/webservice/json/countries');
  }

  getCountry(name) {
    return this.http.get(`http://www.radio-browser.info/webservice/json/countries/${name}`);
  }

  getStations(name) {
    return this.http.get(`http://www.radio-browser.info/webservice/json/stations/bycountry/${name}`);
  }

  /*getStation(id) {
    return this.http.get(`http://www.radio-browser.info/webservice/v2/json/url/${id}`);
  }
*/
  getStationById(id): Observable<any> {
    return this.http.get(`http://www.radio-browser.info/webservice/json/stations/byid/${id}`);
  }
}

