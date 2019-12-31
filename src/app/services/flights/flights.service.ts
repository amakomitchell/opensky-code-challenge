import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FlightsService {

    constructor(
        private http: HttpClient
    ) { }

    // Http Headers
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    // get flights by time
    getFlightsByTime() {
        return this.http.get(`${environment.rootUrl}/flights/all?begin=1517227200&end=1517230800`);
    }
}

