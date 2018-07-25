import {Income} from "../Income";
import {Expense} from "../Expense";
import {JsonVal} from "./JsonVal";
import {Category} from "../Category";

export class TransactionBulk {
  id: number;
  expense: Expense;
  expenseJson: JsonVal;

  income: Income;
  incomeJson: JsonVal;

  extraCssExpense: boolean = false;
  extraCssIncome: boolean = false;
  extraCssAutomatic: boolean = false;


  mainCategories: Category[];
  subCategories: Category[];


  constructor(id: number,
              expense: Expense,
              expenseJson: JsonVal,
              income: Income,
              incomeJson: JsonVal
  ){
    this.id = id;
    this.expense = expense;
    this.expenseJson = expenseJson;
    this.income = income;
    this.incomeJson = incomeJson;
  }


}
