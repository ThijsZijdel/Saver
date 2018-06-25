import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillsComponent } from './sections/section_bills/bills/bills.component';
import { ExpensesComponent } from './sections/section_expense/expenses/expenses.component';
import { BudgetComponent } from './sections/section_budget/budget/budget.component';
import { SpendingComponent } from './sections/section_spending/spending/spending.component';
import { BalancesComponent } from './sections/section_balance/balances/balances.component';
import { IncomeComponent } from './sections/section_income/income/income.component';
import { PersonalComponent } from './views/personal/personal.component';
import { NavigationComponent } from './UI/navigation/navigation.component';
import { AddBillComponent } from './sections/section_bills/add-bill/add-bill.component';
import { AddExpenseComponent } from './sections/section_expense/add-expense/add-expense.component';
import { AddBalanceComponent } from './sections/section_balance/add-balance/add-balance.component';
import { AddIncomeComponent } from './sections/section_income/add-income/add-income.component';
import { AddBudgetComponent } from './sections/section_budget/add-budget/add-budget.component';
import { BusinessComponent } from './views/business/business.component';

import { IncomeService } from "./sections/section_income/service_income/income.service";
import {BudgetService} from "./sections/section_budget/service_budget/budget.service";
import {BillService} from "./sections/section_bills/service_bills/bill.service";
import {SpendingService} from "./sections/section_spending/service_spending/spending.service";
import {BalanceService} from "./sections/section_balance/service_balance/balance.service";
import {ExpenseService} from "./sections/section_expense/service_expense/expense.service";

@NgModule({
  declarations: [
    AppComponent,
    BillsComponent,
    ExpensesComponent,
    BudgetComponent,
    SpendingComponent,
    BalancesComponent,
    IncomeComponent,
    PersonalComponent,
    NavigationComponent,
    AddBillComponent,
    AddExpenseComponent,
    AddBalanceComponent,
    AddIncomeComponent,
    AddBudgetComponent,
    BusinessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    IncomeService,
    BudgetService,
    BillService,
    SpendingService,
    BalanceService,
    ExpenseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
