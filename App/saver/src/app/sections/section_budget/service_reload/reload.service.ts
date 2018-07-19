import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ReloadService {

  today = new Date();

  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();

  months = 'January February March April May June July August September October November December'.split(' ');


  @Output() change: EventEmitter<number> = new EventEmitter();

  changeMonth(interval: number) {
    if (this.month === 11){
      this.month = 0;
      interval = 0;
      this.changeYear(1);


      this.emitMonth(interval);
      return;

    }

    if (interval < 0 && (this.month === 0 ) ){
      this.month = 12;
      this.changeYear(-1);

      this.emitMonth(interval);
      return;
    }

    this.emitMonth(interval);
  }

  changeYear(interval: number) {
    console.log(this.month+" months")
    this.year = this.year + interval;


    this.changeYr.emit(this.year);
  }

  @Output() changeYr: EventEmitter<number> = new EventEmitter();


  private emitMonth(interval: number) {
    this.month = this.month + interval;

    this.change.emit(this.month);
  }
}
