import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

export interface City {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cities: City[] = [
    {text: 'Atlanta', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'New York', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Amsterdam', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'London', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Berlin', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Beijing', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Dubai', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Istanbul', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Shanghai', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Seoul', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['login']);
}

}
