export class Income {
  id: number;
  name: string;
  amount: number;
  mainDescription: string;
  dateRecieved: Date;
  monthName: string;

  constructor(id: number, name: string, amount: number, mainDescription: string, dateRecieved: Date, monthName: string) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.mainDescription = mainDescription;
    this.dateRecieved = dateRecieved;
    this.monthName = monthName;
  }
}
