import { Component, OnInit } from '@angular/core';
import {BudgetService} from "../../../sections/section_budget/service_budget/budget.service";
import {ReloadService} from "../service_reload/reload.service";
import {Budget} from "../../../models/Budget";

@Component({
  selector: 'app-expense-controller',
  templateUrl: './expense-controller.component.html',
  styleUrls: ['./expense-controller.component.css']
})
export class ExpenseControllerComponent implements OnInit {

  constructor(private serviceBudgets: BudgetService,
              protected reloadService: ReloadService) { }
  budgets: Budget[] = [];

  changeMonth(interval: number) {
    // this.reloadService.month = this.reloadService.month + 1;
    this.reloadService.changeMonth(interval);

  }

  ngOnInit() {



    this.budgets = this.getBudgets();




  }


  totalBudgetSpend: number = 0;

  private getBudgets(): Budget[] {
    this.totalBudgetSpend = 0;
    let data: Budget[] = [];

    this.serviceBudgets.getBudgets().subscribe(budgets => {
      // loop trough all the expenes
      for (let budget of budgets) {
        data.push(budget);
        this.totalBudgetSpend += (budget.amountStart-budget.amountLeft);
        //incomeDataC.push(income.amount);
      }
    });
    return data;
  }


  protected reload():void {
    this.budgets = this.getBudgets();
  }
}
