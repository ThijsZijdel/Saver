import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillsComponent } from './bills/bills.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { BudgetComponent } from './budget/budget.component';
import { SpendingComponent } from './spending/spending.component';
import { BalancesComponent } from './balances/balances.component';
import { IncomeComponent } from './income/income.component';
import { PersonalComponent } from './personal/personal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { MessageComponent } from './message/message.component';

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
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
