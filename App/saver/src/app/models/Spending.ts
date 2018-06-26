export class Spending {
  id: number;
  name: string;
  amount: number;
  mainDescription: string;
  dateSpend: Date;
  monthName: string;
  categoryId: number;

  constructor(id: number, name: string, amount: number, mainDescription: string, dateSpend: Date, monthName: string, categoryId: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.mainDescription = mainDescription;
    this.dateSpend = dateSpend;
    this.monthName = monthName;
    this.categoryId = categoryId;
  }
}
