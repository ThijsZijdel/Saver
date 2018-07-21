import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/**
 * Development in memory data api
 */
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from "./data/in-memory-data.service";


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

import { AddBillComponent } from './data/manage/components/add-bill/add-bill.component';
import { ManageExpenseComponent } from './data/manage/components/manage-expense/manage-expense.component';
import { AddBalanceComponent } from './data/manage/components/add-balance/add-balance.component';
import { AddIncomeComponent } from './data/manage/components/add-income/add-income.component';
import { AddBudgetComponent } from './data/manage/components/add-budget/add-budget.component';
import { BusinessComponent } from './views/business/business.component';

import { IncomeService } from "./sections/section_income/service_income/income.service";
import {BudgetService} from "./sections/section_budget/service_budget/budget.service";
import {BillService} from "./sections/section_bills/service_bills/bill.service";
import {SpendingService} from "./sections/section_spending/service_spending/spending.service";
import {BalanceService} from "./sections/section_balance/service_balance/balance.service";
import {ExpenseService} from "./sections/section_expense/service_expense/expense.service";

import {MessageComponent} from "./data/service/message/message.component";
import {MessageService} from "./data/service/message/service_message/message.service";



import {CategoryService} from "./data/categories/service_category/category.service";
import { AuthService } from "./data/service/service_auth/auth.service";

import {StorageServiceModule} from "angular-webstorage-service";



import { ChartModule } from 'angular-highcharts';


import {AngularFontAwesomeComponent,
        AngularFontAwesomeModule,
        AngularFontAwesomeService} from "angular-font-awesome";

import {LocalStorageDatabase} from "@ngx-pwa/local-storage";
import {OfflineProvidersConfig} from "@ngx-pwa/offline";

import {CalendarComponent} from "./sections/section_bills/calendar/calendar.component";


import {SettingsService} from "./views/personal/settings.service";
import {BalanceTypeService} from "./sections/section_balance/service_balanceType/balanceType.service";
import {ContextMenuComponent, ContextMenuModule} from "ngx-contextmenu";
import {AddViewsService} from "./data/manage/addViews/service_addViews/addViews.service";
import {AddViewsComponent} from "./data/manage/addViews/addViews.component";
import {FormsModule} from "@angular/forms";
import {ManageCategoryComponent} from "./data/categories/manage-category/manage-category.component";
import {ReloadService} from "./sections/section_budget/service_reload/reload.service";
import {BulkAddViewComponent} from "./data/manage/upload/bulkAddView/bulkAddView.component";
import {CompanyService} from "./data/service/service_company/company.service";






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
    ManageExpenseComponent,
    ManageCategoryComponent,
    AddBalanceComponent,
    AddIncomeComponent,
    AddBudgetComponent,

    MessageComponent,
    BusinessComponent,

    CalendarComponent,

    AddViewsComponent,
    BulkAddViewComponent
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

    ContextMenuModule.forRoot(),

    FormsModule
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
    CompanyService,

    LocalStorageDatabase,
    SettingsService,
    AuthService,

    BalanceTypeService,

    AddViewsService,

    ReloadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
