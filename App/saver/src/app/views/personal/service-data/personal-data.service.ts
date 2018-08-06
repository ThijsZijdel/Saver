import { Injectable } from '@angular/core';
import {IncomeService} from "../../../sections/section_income/service_income/income.service";
import {ExpenseService} from "../../../sections/section_expense/service_expense/expense.service";
import {Income} from "../../../models/Income";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

  private allIncomes: Income[] = [];


  constructor(private incomeService: IncomeService,
              private expenseService: ExpenseService) {

  }

  /**
   *
   * @param refresh
   */
  public getAllIncomes(refresh?: boolean): Income[] {
    if (this.allIncomes === [] || refresh === true){
      this.allIncomes = [];

      this.incomeService.getIncomes().subscribe(incomes => {
        for (let income of incomes) {
          this.allIncomes.push(income);
        }
      });
    }
    return this.allIncomes;
  }

}
