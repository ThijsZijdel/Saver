import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import * as $ from "jquery"
import {BalanceService} from "../service_balance/balance.service";
import {Balance} from "../../../models/Balance";
import {ExpenseService} from "../../section_expense/service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {IncomeService} from "../../section_income/service_income/income.service";
import {Income} from "../../../models/Income";

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit {

  balances: Balance[] = [];
  expenses: Expense[] = [];
  incomes: Income[] = [];

  balancesTotal: number = 0;

  constructor(private balanceService: BalanceService,
              private expenseService: ExpenseService,
              private incomeServie: IncomeService) {

  }


  ngOnInit() {
    this.getBalances();
    this.getExpenses();
  }


  private getBalances() {
    this.balancesTotal = 0;

    this.balanceService.getBalances().subscribe(balances => {
      // loop trough all the incomes
      for (let balance of balances) {


          this.balances.push(balance);
          this.balancesTotal += balance.amount;
      }
    });
  }

  private getExpenses() {
    this.expenseService.getExpenses().subscribe(expenses => {
      // loop trough all the incomes
      for (let expense of expenses) {


        this.expenses.push(expense);

      }
    });
  }

  private getIncomes() {
    this.incomeServie.getIncomes().subscribe(incomes => {
      // loop trough all the incomes
      for (let income of incomes) {


        this.incomes.push(income);

      }
    });
  }

  getTransactionOf(balanceId: number): object[] {
    //todo sorting on date..
    let dataIncomes: object[] = [];
    let dataExpenses: object[] = [];

    for (let income of this.incomes){
      if (income.balanceFk = balanceId){
        dataIncomes.push(income);
      }
    }

    for (let expense of this.expenses){
      if (expense.balanceFk = balanceId){
        dataIncomes.push(expense);

      }

    }

      return dataIncomes;
  }

  setShowStateSubLayer(mainClasse:string, name: string, id: number) {

    // ".mainClasse  .id-name"
    let element: string = '.'+mainClasse+'.'+name+'-'+id;
    console.log(element+" el")

    $(element+' ul').first().toggleClass("show");


    $(element+' .icon-subcat').toggleClass("down");

    let time = 0;

    if ($(element+' ul').first().hasClass('relative')){
      time = 100;
    }

    setTimeout(()=>{
      $(element+' ul').first().toggleClass("relative");
    }, time);


  }



  //
  // getColor(category: Category): string {
  //   return category.color;
  // }


  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  formatDate(dateI: Date): string {
    console.log(dateI);
    let date = new Date(dateI);

    return(this.monthnames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear());
  }

  getForamatted(name: string) {
  return name.replace(/\s+/g, '');
  }
}
