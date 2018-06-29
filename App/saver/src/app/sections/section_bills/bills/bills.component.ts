import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../../section_expense/service_expense/expense.service";
import {Expense} from "../../../models/Expense";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  overdueTotal:number = 92.70;

  overdueBills: Expense[] = [];
  billBills: Expense[] = [];
  paidBills: Expense[] = [];

  billsShown:number = 2;
  billsBtnText: string = "More bills ";
  billsBtnAlternative: string = "Less bills ";
  billsBtnNormal: string = "More bills "

  overdueShown:number = 2;
  overBtnText: string = "More Overdue bills ";
  overBtnAlternative: string = "Less Overdue bills ";
  overBtnNormal: string = "More Overdue bills "

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getBills();
  }

  protected getSumExpenses(expenses:Expense[]):number{
    let sum: number = 0;
    for (let expense of expenses){
      sum += expense.amount;
    }
    return sum;
  }

  private getBills() {
    this.paidBills = [];

    this.expenseService.getExpenses().subscribe(expenses => {
      // loop trough all the incomes
      for (let expense of expenses) {

        if (expense.alreadyPaid) {
          this.paidBills.push(expense);
        } else if (!expense.alreadyPaid){
          this.billBills.push(expense);
        }
      }
    });
  }

  showBills(varn: string) {
    if (varn == "billsShown"){
      if (this.billsBtnText == this.billsBtnAlternative) {
        this.billsBtnText = this.billsBtnNormal;
        this.billsShown = 2;
      } else {
        this.billsBtnText = this.billsBtnAlternative;
        this.billsShown = 10;
      }
    } else if (varn == "overdueShown"){
      if (this.overBtnText == this.overBtnAlternative) {
        this.overBtnText = this.overBtnNormal;
        this.overdueShown = 2;
      } else {
        this.overBtnText = this.overBtnAlternative;
        this.overdueShown = 10;
      }
    }

  }
}
