import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from "@angular/http";

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

import {MessageComponent} from "./message/message.component";
import {MessageService} from "./data/service_message/message.service";
import {InMemoryDataService} from "./data/in-memory-data.service";


import {CategoryService} from "./data/service/service_category/category.service";
import { AuthService } from "./data/service/service_auth/auth.service";

import {StorageServiceModule} from "angular-webstorage-service";



import { ChartModule } from 'angular-highcharts';


import {AngularFontAwesomeComponent, AngularFontAwesomeModule, AngularFontAwesomeService} from "angular-font-awesome";

import {LocalStorageDatabase} from "@ngx-pwa/local-storage";
import {OfflineProvidersConfig} from "@ngx-pwa/offline";
import {CalendarComponent} from "./sections/section_bills/calendar/calendar.component";


import {SettingsService} from "./views/personal/settings.service";
import {BalanceTypeService} from "./sections/section_balance/service_balanceType/balanceType.service";
import {ContextMenuModule} from "ngx-contextmenu";






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
    MessageComponent,
    BusinessComponent,

    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StorageServiceModule,
    ChartModule,
    HttpClientModule,
    HttpModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),

    AngularFontAwesomeModule,

    ContextMenuModule.forRoot()
  ],
  providers: [
    IncomeService,
    BudgetService,
    BillService,
    SpendingService,
    BalanceService,
    ExpenseService,
    MessageService,
    CategoryService,
    LocalStorageDatabase,
    SettingsService,
    AuthService,

    BalanceTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
