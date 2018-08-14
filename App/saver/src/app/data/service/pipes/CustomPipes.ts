import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxChar'
})
export class MaxCharsPipe implements PipeTransform {

  maxChars: number = 25;
  suffix: string = "...";

  transform(value: string): string {
    if (value === null || value.length <= this.maxChars) {
      return value;
    }

    return value.slice(0,this.maxChars) + this.suffix;
  }
}


@Pipe({
  name: 'valuta'
})
export class ValutaPipe implements PipeTransform {


  transform(value: number): string {
    if (value === null) {
      return value.toString();
    }
    return value.toFixed(2);
  }
}

