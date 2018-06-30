import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as $ from "jquery"

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  month: string;
  year: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() ;
  displayedMonth: number = new Date().getMonth() ;

  ngOnInit() {
    this.setUpCalendar(this.currentMonth);
  }

  setUpCalendar(monthDisplay: number){
    const MONTH_NAMES = 'January February March April May June July August September October November December'.split(' ');

    // for (var i = 0; i < 12; i++) {
    let i = monthDisplay

    // create a table for month with thead & tbody
    let div = document.createElement('div');
    let p = document.createElement('p');
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // get weeks for a given month
    let calendar = this.createCalendar(this.year, i);

    //get current date
    let currentDate = new Date();

    // iterate weeks
    for (let j = 0; j < calendar.length; j++) {
      // create table row for every week
      let tr = document.createElement('tr');

      let week = calendar[j];

      // iterate days
      for (let k = 0; k < week.length; k++) {
        // create table cell for every day
        let td = document.createElement('td');

        let day = week[k];

        // set day of month as table cell text content
        td.textContent = day.date.getDate();

        // add before/after class
        day.before && td.classList.add('before');
        day.after && td.classList.add('after');

        if (!day.before && !day.after && i == new Date().getMonth())
          day.current && td.classList.add('current');


        tr.appendChild(td);
      }

      // mount table row
      tbody.appendChild(tr);
      // z}

      // create month name
      this.month = MONTH_NAMES[i];

      // create thead
      thead.innerHTML = '<tr><td>' + 'Su Mo Tu We Th Fr Sa'.split(' ').join('</td><td>') + '</td></tr>';

      // set class on table
      table.classList.add('calendarTbl');

      // mount thead & tbody
      table.appendChild(thead);
      table.appendChild(tbody);


      // mount table to container
      div.appendChild(table);

      // mount table to body
      $('div#calender-box').html(div);

    }

  }

  createCalendar (year, month) {
    let results = [];

    // find out first and last days of the month
    let firstDate = new Date(year, month, 1);
    let lastDate = new Date(year, month + 1, 0)

    // calculate first sunday and last saturday
    let firstSunday = this.getFirstSunday(firstDate);
    let lastSaturday = this.getLastSaturday(lastDate);

    // iterate days starting from first sunday
    let iterator = new Date(firstSunday);
    let i = 0;

    // ..until last saturday
    while (iterator <= lastSaturday) {
      if (i++ % 7 === 0) {
        // start new week when sunday
        var week = [];
        results.push(week);
      }

      // push day to week
      week.push({
        date: new Date(iterator),
        before: iterator < firstDate, // add indicator if before current month
        after: iterator > lastDate, // add indicator if after current month
        current: iterator.getDate() == new Date().getDate() // check for current date
      });

      // iterate to next day
      iterator.setDate(iterator.getDate() + 1);
    }

    return results;
  }

  private getFirstSunday (firstDate): Date {
    let offset = firstDate.getDay();

    let result = new Date(firstDate);
    result.setDate(firstDate.getDate() - offset);

    return result;
  }

  private getLastSaturday (lastDate): Date {
    let offset = 6 - lastDate.getDay();

    let result = new Date(lastDate);
    result.setDate(lastDate.getDate() + offset);

    return result;
  }


  changeMonth(number: number) {
    if (number == null){
      this.displayedMonth = this.currentMonth;
    } else {
      //todo check year
      this.displayedMonth = this.displayedMonth + number;
    }

    this.setUpCalendar(this.displayedMonth);
  }
}
// display: inline-block;
// vertical-align: top;
// border-collapse: collapse;
// width: 80%;
// margin: 0 auto;
// height: 200px;
