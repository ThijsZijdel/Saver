export class Expense {
  id: number;
  name: string;
  amount: number;

  repeatingFk: number;

  description: string;
  date: Date;
  monthName: string;  // TODO add monthName field to API
  monthFk: number;
  subCategoryFk: number;

  balanceFk: number;
  companyFk: number;

  alreadyPaid: boolean;


  constructor(id: number,
              name: string,
              amount: number,
              repeatingFk: number,
              description: string,
              date: Date,
              monthName: string,
              monthFk: number,
              subCategoryFk: number,
              balanceFk: number,
              companyFk: number,
              alreadyPaid: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.description = description;
    this.date = date;
    this.monthName = monthName;

    this.subCategoryFk = subCategoryFk;

    this.balanceFk = balanceFk;
    this.companyFk = companyFk;

    this.alreadyPaid = alreadyPaid == 0;

    this.monthFk = monthFk;
    this.repeatingFk = repeatingFk;
  }
}
