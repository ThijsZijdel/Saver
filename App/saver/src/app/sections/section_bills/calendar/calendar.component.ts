import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as $ from "jquery"
import {ExpenseService} from "../../section_expense/service_expense/expense.service";
import {Expense} from "../../../models/Expense";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private serviceExpenses: ExpenseService) { }

  today = new Date();
  month: string;
  year: number = this.today.getFullYear();
  currentMonth: number = this.today.getMonth() ;
  displayedMonth: number = this.today.getMonth() ;

  ngOnInit() {
    this.initCalendar();


  }

  setUpCalendar(monthDisplay: number){
    const MONTH_NAMES = 'January February March April May June July August September October November December'.split(' ');

    // for (var i = 0; i < 12; i++) {
    let i = monthDisplay

    // create a table for month with thead & tbody
    let div = document.createElement('div');
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

        if (!day.before && !day.after && i === new Date().getMonth())
          day.current && td.classList.add('current');


        day.paid && td.classList.add('paid');
        day.bill && td.classList.add('bill');
        day.over && td.classList.add('over');

        tr.appendChild(td);
      }

      // mount table row
      tbody.appendChild(tr);

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

      let obj = this.getInfObj(iterator.toISOString().slice(0,10));



      // push day to week
      week.push({
        date: new Date(iterator),
        before: iterator < firstDate, // add indicator if before current month
        after: iterator > lastDate, // add indicator if after current month
        current: iterator.getDate() == new Date().getDate(), // check for current date
        bill: obj.bill,
        over: obj.over,
        paid: obj.paid
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


  changeMonth(interval: number) {
    if (interval === null){
      this.displayedMonth = this.today.getMonth();
      this.year = this.today.getFullYear();
    }

    //If month === 11 (Dec) set year +1 and months = 0 (Jan)  +
    if (this.displayedMonth === 11 && interval > 0){
      this.displayedMonth = 0;
      interval = 0;
      this.changeYear(1);


      this.emitMonth(interval);
      return;

    }

    //If month === 0 (Jan) set year -1 and months = 12 (Dec)  -
    if (interval < 0 && (this.displayedMonth === 0 ) ){
      this.displayedMonth = 12;
      this.changeYear(-1);

      this.emitMonth(interval);
      return;
    }

    //Else just emit the change
    this.emitMonth(interval);
    this.initCalendar();
  }

  /**
   * Emit month change
   * @param {number} interval
   */
  private emitMonth(interval: number) {
    //Set the month
    this.displayedMonth = this.displayedMonth + interval;

    this.initCalendar();
    //Emit it to the Event
    // this.change.emit(this.month);
  }

  paidOverBillExpenses: paidOverBill[] = [];


  /**
   * Change year and emit the event
   * @param {number} interval
   */
  changeYear(interval: number) {

    this.year = this.year + interval;

    this.initCalendar();
    // this.changeYr.emit(this.year);
  }

  private getExpenses() {
    this.paidOverBillExpenses = [];

    this.serviceExpenses.getExpensesOf(this.displayedMonth+1,this.year,"date").subscribe(expenses => {
      for (let expense of expenses){
        this.paidOverBillExpenses.push(new paidOverBill(expense));
      }
    });
  }


  private getInfObj(stringDate: string) {
    for (let obj of this.paidOverBillExpenses){
      let tsts = stringDate == obj.strDate;
      if (tsts){
        return obj;
      }
    }
    return {strDate: null, bill: false, paid: false, over: false, expense: null};
  }

  private initCalendar(reset?: boolean) {
    let month = reset === true ?  this.currentMonth : this.displayedMonth;

    this.getExpenses();
    setTimeout(()=>{
      this.setUpCalendar(month);
    }, 500);

  }
}



export class paidOverBill{
  strDate: string;

  bill:boolean;
  paid:boolean;
  over:boolean;

  expense: Expense;

  constructor(expense: Expense){
    if (expense.date != null ) {
      this.strDate = new Date(expense.date).toISOString().slice(0,10);
    }

    this.bill = true;
    this.paid = expense.alreadyPaid === 1;
    this.over = !expense.alreadyPaid && expense.date > new Date();

    this.expense = expense;
  }

  toString():string{
    return this.expense.id+" on "+this.strDate+"> Paid:"+this.paid+" Over:"+this.over;
  }

}
