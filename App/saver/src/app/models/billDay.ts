export class billDay {
  dayIndex: number;
  monthIndex:number;
  today: boolean;

  isReset:boolean;

  constructor(dayIndex:number,monthIndex:number,isReset: boolean){
    this.dayIndex = dayIndex;
    this.monthIndex = monthIndex;

    this.isReset = isReset;

    this.today = (new Date().getDate() == dayIndex)&&(new Date().getMonth() == monthIndex)

  }
}
