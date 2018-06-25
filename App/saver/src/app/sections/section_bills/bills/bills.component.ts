import { Component, OnInit } from '@angular/core';
import { billDay} from "../../../models/billDay";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  monthName: string;

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

  daysA: billDay[] = [];
  daysB: billDay[] = [];
  daysC: billDay[] = [];
  daysD: billDay[] = [];
  daysE: billDay[] = [];

  months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
  ];

  constructor() { }

  ngOnInit() {
    this.getDate(new Date());

    this.initializeCalRows(this.month);


  }

  getDate(datum: Date){
    this.datum = datum;
    this.dayNumber = this.datum.getDay();
    this.month = this.datum.getMonth();
    this.year = this.datum.getFullYear();
    this.dayOfMonth = this.datum.getDate();
    this.daysOfMonth = this.getDaysInMonth(this.month, this.year);


    this.firstDay = new Date(this.year, this.month, 1);
    this.lastDay = new Date(this.year, this.month + 1, 0);

    this.firstDayNumber = this.firstDay.getDay();
    this.lastDayNumber = this.lastDay.getDay();


    this.monthName = this.months[this.month];
  }



  getDaysInMonth(month,year):number {
    return 32 - new Date(year, month, 32).getDate();
  }


  protected prefMonth() {


    this.getDate(new Date(this.datum.setMonth(this.datum.getMonth()-1)) );

    this.initializeCalRows(this.month);
  }

  protected nextMonth() {
    this.getDate(new Date(this.datum.setMonth(this.datum.getMonth()+2)) );
    this.initializeCalRows(this.month)
  }

  protected initializeCalRows(monthIndex:number) {
    let numberDay:number = 1;

    let prevMonth = new Date(this.datum.setMonth(this.datum.getMonth()-1));
    let lastDayNumber = new Date(prevMonth.getFullYear(),prevMonth.getMonth() + 1, 0).getDay() -1;
    let prevMonthDays = this.getDaysInMonth(prevMonth.getMonth(), prevMonth.getFullYear());


    let countPrevMonthDaysDisplayed = 0;

    for (let i = 0; i != 7; i++ ){
      if (i >= this.firstDayNumber-1) {

        this.daysA[i] = new billDay(numberDay, monthIndex, false)
        numberDay++;
      } else {






        this.daysA[i] = new billDay(prevMonthDays-lastDayNumber, monthIndex, true)
        lastDayNumber--;
      }
    }

    for (let i = 0; i != 7; i++ ){
      this.daysB[i] = new billDay(numberDay, monthIndex, false)
      numberDay++;

    }

    for (let i = 0; i != 7; i++ ){

      this.daysC[i] = new billDay(numberDay, monthIndex, false);
      numberDay++;

    }

    for (let i = 0; i != 7; i++ ){

      this.daysD[i] = new billDay(numberDay, monthIndex, false);
      numberDay++;

    }

    let reset:number = 1;
    for (let i = 0; i != 7; i++ ){
      if (i <= this.lastDayNumber-1) {
        this.daysE[i] = new billDay(numberDay, monthIndex, false);
        numberDay++;
      } else {

        this.daysE[i] = new billDay(reset, monthIndex, true);
        reset++;
      }
    }
  }
}
