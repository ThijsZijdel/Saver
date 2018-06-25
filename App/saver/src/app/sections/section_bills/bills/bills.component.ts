import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  datum: Date;
  dayNumber: number;
  month: number;
  year: number;
  dayOfMonth: number;
  daysOfMonth: number;

  firstDay: Date;
  firstDayNumber: number;

  lastDay: Date;
  lastDayNumber: number;

  daysA: number[] = [];
  daysB: number[];
  daysC: number[];
  daysD: number[];

  constructor() { }

  ngOnInit() {
    this.getDate();

    let numberDay:number = 1;

    for (let i = 0; i != 7; i++ ){
      if (i >= this.firstDayNumber) {
        this.daysA[i]=numberDay;
        numberDay++;
      } else {
        this.daysA[i] = 99;
      }
    }

    console.log(this.daysA.length)

  }

  getDate(){
    this.datum = new Date();

    this.dayNumber = this.datum.getDay();
    this.month = this.datum.getMonth();
    this.year = this.datum.getFullYear();
    this.dayOfMonth = this.datum.getDate();
    this.daysOfMonth = this.getDaysInMonth(this.month, this.year);


    this.firstDay = new Date(this.year, this.month, 1);
    this.lastDay = new Date(this.year, this.month + 1, 0);

    this.firstDayNumber = this.firstDay.getDay();
    this.lastDayNumber = this.lastDay.getDay();
  }



  getDaysInMonth(month,year):number {
    return 32 - new Date(year, month, 32).getDate();
  }



}
