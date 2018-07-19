import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ReloadService {

  today = new Date();

  month: number ;
  year: number ;


  @Output() change: EventEmitter<number> = new EventEmitter();

  changeMonth(interval: number) {
    if (interval < 0 && (this.month === 0 || this.month === 1) ||
        this.month < 1){
      this.month = 12;
      this.changeYear(-1);
    }

    if (this.month >= 12){
      this.month = 0;
      this.changeYear(1);
    }

    this.month = this.month + interval;

    this.change.emit(this.month);
  }

  changeYear(interval: number) {
    this.year = this.year + interval;


    this.changeYr.emit(this.year);
  }

  @Output() changeYr: EventEmitter<number> = new EventEmitter();



}
