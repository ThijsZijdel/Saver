export class Transaction {
  id: number;
  name: string;
  amount: number;

  description: string;

  date: Date;
  monthName: string;
  monthFk: number;

  balanceFk: number;
  companyFk: number;

  isExpense: boolean;

  constructor(id: number,
              name: string,
              amount: number,
              description: string,
              date: Date,
              monthName: string,
              monthFk: number,
              balanceFk: number,
              companyFk: number,
              isExpense: boolean) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.monthName = monthName;

    this.monthFk = monthFk;
    this.balanceFk = balanceFk;
    this.companyFk = companyFk;




    this.isExpense = isExpense;

  }
}
