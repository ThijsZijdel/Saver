import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class ReloadServiceFinancial {


  months: number = 12;

  frequency: string = "monthly";



  monthsNames = 'January February March April May June July August September October November December'.split(' ');


  @Output() change: EventEmitter<number> = new EventEmitter();



  /**
   * Reloading by re emitting the values
   */
  reload(){
    this.change.emit(this.months);
  }


  setValues(frequency: string, months: number) {
    this.frequency = frequency;
    this.months = months;

    this.reload();
  }
}
