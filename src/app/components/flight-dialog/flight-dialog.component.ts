import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightsService } from 'src/app/services/flights/flights.service';

interface IFlightData {
  icao24:	string;	
  firstSeen:	number;
  estDepartureAirport:	string;
  lastSeen: number;
  estArrivalAirport:	string;
  callsign: string;
  estDepartureAirportHorizDistance: number;
  estDepartureAirportVertDistance: number;
  estArrivalAirportHorizDistance: number;
  estArrivalAirportVertDistance: number;
  departureAirportCandidatesCount: number;
  arrivalAirportCandidatesCount:  number;
}

export interface DialogData {
  airport: string;
}

@Component({
  selector: 'app-flight-dialog',
  templateUrl: './flight-dialog.component.html',
  styleUrls: ['./flight-dialog.component.css']
})
export class FlightDialogComponent implements OnInit {

  flightData: IFlightData[];
  displayedColumns = ['icao24', 'estDepartureAirport', 'estArrivalAirport', 'lastSeen', 'callsign'];

  // options properties
  flightTypeSelectOptions = ['Arrival', 'Departure'];
  flightTypeOption = 'Arrival';

  flightTimeOptions = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  flightTime = 10;

  constructor(
    public dialogRef: MatDialogRef<FlightDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private flightsService: FlightsService
    ) {

  }

  ngOnInit() {
    this.flightsService.getFlightsByArrival(this.data.airport)
      .pipe()
      .subscribe((data: IFlightData[]) => {
        this.flightData = data;
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
