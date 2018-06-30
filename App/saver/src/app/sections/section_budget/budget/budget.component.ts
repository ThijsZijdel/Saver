import { Component, OnInit } from '@angular/core';
import {Budget} from "../../../models/Budget";
import {BudgetService} from "../service_budget/budget.service";
import * as $ from "jquery"

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetsShown: number = 1;

  btnText: string = "More Budgets";
  btnNormal: string = "More Budgets";
  btnAlternative: string = "Less Budgets";

  budgets: Budget[] = [];

  constructor(private serviceBudgets: BudgetService) { }

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


  protected allBudgets() {
    if (this.btnText == this.btnAlternative) {
      this.btnText = this.btnNormal;
      this.budgetsShown = 1;
    } else {
      this.btnText = this.btnAlternative;
      this.budgetsShown = 10;
    }
  }

  protected calculateWidth(amountStart: number, amountLeft: number): string {
    let percentage: number = ((amountLeft/amountStart)*100);

    return (percentage.toString()).substr(0,percentage.toString().indexOf('.')+3)+"%";
  }

  protected reload():void {
    this.budgets = this.getBudgets();
  }

}
