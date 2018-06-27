export class Budget {
  id: number;

  name: string;
  displayName: string;

  repeatingFk: number;
  description: string;

  amountLeft: number;
  amountStart: number;


  isPast: boolean;

  startDate: Date;
  endDate: Date;

  balanceFk: number;

  typeFk: string;

  monthFk: number;

  constructor(id: number,
              name: string,
              displayName: string,
              repeatingFk: number,
              description: string,
              startDate: Date,
              endDate: Date,
              balanceFk: number,
              typeFk: string,
              amountStart: number,
              amountLeft: number,
              monthFk: number,
              isPast: number) {
    this.id = id;
    this.name = name;
    this.displayName = displayName;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.balanceFk = balanceFk;

    this.typeFk = typeFk;

    this.amountStart = amountStart;

    this.amountLeft = amountLeft;

    this.repeatingFk = repeatingFk;
    this.monthFk = monthFk;
    this.isPast = isPast == 0;
  }
}
