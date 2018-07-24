import {Income} from "../Income";
import {Expense} from "../Expense";
import {JsonVal} from "./JsonVal";

export class TransactionBulk {
  id: number;
  expense: Expense;
  expenseJson: JsonVal;

  income: Income;
  incomeJson: JsonVal;



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
