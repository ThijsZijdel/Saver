import { Component, OnInit } from '@angular/core';
import * as $ from "jquery"

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var MONTH_NAMES = 'January February March April May June July August September October November December'.split(' ');

    // for (var i = 0; i < 12; i++) {
    var i = 5;

    // create a table for month with thead & tbody
    var div = document.createElement('div');
    var p = document.createElement('p');
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    // get weeks for a given month
    var calendar = createCalendar(2018, i);

    //get current date
    var currentDate = new Date();

    // iterate weeks
    for (var j = 0; j < calendar.length; j++) {
      // create table row for every week
      var tr = $('table#calendarTbl tr#'+j)// tr get
      console.log('tr: table#calendarTbl tr#'+j);

      var week = calendar[j];

      // iterate days
      for (var k = 0; k < week.length; k++) {
        // create table cell for every day
        var td = $('table#calendarTbl tr#'+j+' td:nth-child('+k+')');
        console.log('table#calendarTbl tr#'+j+' td:nth-child('+k+')');
        var day = week[k];

        // set day of month as table cell text content
        td.textContent = day.date.getDate();

        // add before/after class
        day.before && td.addClass('before');
        day.after && td.addClass('after');

        // check for current date
        if (currentDate == day.date.getDate()){
          // add styling class
          td.addClass('currentDay');
          day.currentDay && td.addClass('currentDay');
        }

        td.html()
        // mount table cell
        tr.appendChild(td);
      }
      // mount table row
      tbody.appendChild(tr);
      // z}




      // create month name
      p.textContent = MONTH_NAMES[i];

      // create thead
      thead.innerHTML = '<tr><td>' + 'Su Mo Tu We Th Fr Sa'.split(' ').join('</td><td>') + '</td></tr>';

      // mount thead & tbody
      table.appendChild(thead);
      table.appendChild(tbody);

      $('table#calendarTbl thead').html(thead)
      $('table#calendarTbl tbody').html(tbody)



      // // mount month name to container
      // div.appendChild(p);
      //
      // // mount table to container
      // div.appendChild(table);
      //
      // // mount table to body
      // // $('#calender-box').html(div);
      //
      // // styling
      //
      // // class
      // //$('#calender-box div table').addClass('tableData');
    }

    function createCalendar (year, month) {
      var results = [];

      // find out first and last days of the month
      var firstDate = new Date(year, month, 1);
      var lastDate = new Date(year, month + 1, 0)

      // calculate first sunday and last saturday
      var firstSunday = getFirstSunday(firstDate);
      var lastSaturday = getLastSaturday(lastDate);

      // iterate days starting from first sunday
      var iterator = new Date(firstSunday);
      var i = 0;

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
          after: iterator > lastDate // add indicator if after current month
        });

        // iterate to next day
        iterator.setDate(iterator.getDate() + 1);
      }

      return results;
    }

    function getFirstSunday (firstDate) {
      var offset = firstDate.getDay();

      var result = new Date(firstDate);
      result.setDate(firstDate.getDate() - offset);

      return result;
    }

    function getLastSaturday (lastDate) {
      var offset = 6 - lastDate.getDay();

      var result = new Date(lastDate);
      result.setDate(lastDate.getDate() + offset);

      return result;
    }
  }


}
// display: inline-block;
// vertical-align: top;
// border-collapse: collapse;
// width: 80%;
// margin: 0 auto;
// height: 200px;
