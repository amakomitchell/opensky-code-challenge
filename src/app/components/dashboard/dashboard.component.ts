import { Component, OnInit, Inject } from '@angular/core';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FlightDialogComponent } from '../flight-dialog/flight-dialog.component';
import { FlightsService } from '../../services/flights/flights.service';

interface IFlight {
  icao24: string;
  firstSeen: number;
  estDepartureAirport: string;
  lastSeen: number;
  estArrivalAirport: string;
  callsign: string;
  estDepartureAirportHorizDistance: number;
  estDepartureAirportVertDistance: number;
  estArrivalAirportHorizDistance: number;
  estArrivalAirportVertDistance: number;
  departureAirportCandidatesCount: number;
  arrivalAirportCandidatesCount: number;
}

interface IAirportMap {
  airportCode: string;
  flights: IFlight[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  airportsLists: IAirportMap[];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private flightsService: FlightsService,
  ) { }

  ngOnInit() {
    this.flightsService.getFlightsByTime()
      .pipe()
      .subscribe((data: IFlight[]) => {
        let mappedData = {};
        data.forEach((flight: IFlight) => {
          const { estArrivalAirport } = flight;
          if (estArrivalAirport) {
            const currentMappedData = mappedData[estArrivalAirport];
            if (currentMappedData) {
              currentMappedData.flights.push(flight);
            } else {
              mappedData[estArrivalAirport] = {
                airportCode: estArrivalAirport,
                flights: [flight]
              } as IAirportMap;
            }
          }
        });

        const flightsArray = Object.values(mappedData)
        const sortedFlightArray = flightsArray.sort((a: IAirportMap, b: IAirportMap) => {
          return b.flights.length - a.flights.length
        });

        this.airportsLists = sortedFlightArray.slice(0, 10) as any;
      });
  }

  openDialog(airport: IAirportMap): void {
    const dialogRef = this.dialog.open(FlightDialogComponent, {
      width: '70vw',
      height: '70vh',
      data: { airport: airport.airportCode }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  onLogout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['login']);
  }

}
