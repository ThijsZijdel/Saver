import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ReloadService {

  today = new Date();

  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();

  months = 'January February March April May June July August September October November December'.split(' ');


  @Output() change: EventEmitter<number> = new EventEmitter();

  @Output() changeYr: EventEmitter<number> = new EventEmitter();

  /**
   * Change month
   * + Validation for Jan & Dec
   * @param {number} interval
   */
  changeMonth(interval: number) {
    //If month === 11 (Dec) set year +1 and months = 0 (Jan)  +
    if (this.month === 11 && interval > 0){
      this.month = 0;
      interval = 0;
      this.changeYear(1);


      this.emitMonth(interval);
      return;

    }

    //If month === 0 (Jan) set year -1 and months = 12 (Dec)  -
    if (interval < 0 && (this.month === 0 ) ){
      this.month = 12;
      this.changeYear(-1);

      this.emitMonth(interval);
      return;
    }

    //Else just emit the change
    this.emitMonth(interval);
  }


  /**
   * Emit month change
   * @param {number} interval
   */
  private emitMonth(interval: number) {
    //Set the month
    this.month = this.month + interval;

    //Emit it to the Event
    this.change.emit(this.month);
  }

  /**
   * Change year and emit the event
   * @param {number} interval
   */
  changeYear(interval: number) {

    this.year = this.year + interval;


    this.changeYr.emit(this.year);
  }

  /**
   * Set and emit an specific Month Yr
   * @param {number} month
   * @param {number} year
   */
  setSpecificMonthYr(month: number, year:number){
    this.month = month;
    this.year = year;

    this.change.emit(this.month);
    this.changeYr.emit(this.year);
  }

  /**
   * Reloading by re emitting the values
   */
  reload(){
    this.change.emit(this.month);
    this.changeYr.emit(this.year);
  }



}
