import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import * as $ from "jquery"
import {BalanceService} from "../service_balance/balance.service";
import {Balance} from "../../../models/Balance";
import {ExpenseService} from "../../section_expense/service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {IncomeService} from "../../section_income/service_income/income.service";
import {Income} from "../../../models/Income";
import {Transaction} from "../../../models/Transaction";
import {Spending} from "../../../models/Spending";

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

  balanceCategories = [
    { id: 1, name: 'On Demand', description: 'Money that is ready to be spend.', color: "#EB7092", icon:"credit-card"},
    { id: 2, name: 'Savings', description: 'Money that is saving up.', color: "#EB7092", icon:"credit-card"},
    { id: 3, name: 'Credit', description: 'Credit card.', color: "#EB7092", icon:"credit-card"}

  ];

  constructor(private balanceService: BalanceService,
              private expenseService: ExpenseService,
              private incomeService: IncomeService) {

  }


  ngOnInit() {
    this.getBalances();
    this.getExpenses();
    this.getIncomes();
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
    this.incomeService.getIncomes().subscribe(incomes => {
      // loop trough all the incomes
      for (let income of incomes) {


        this.incomes.push(income);

      }
    });
  }

  getTransactionOf(balanceId: number): Transaction[] {
    //todo sorting on date..
    let transactions: Transaction[] = [];

    for (let income of this.incomes){
      console.log("income came by")
      if (income.balanceFk === balanceId){

        transactions.push(new Transaction(income.id, income.name,
          income.amount, income.description,
          income.date, income.monthName, income.monthFk,
          income.balanceFk, income.companyFk, false)
        );

      }
    }

    for (let expense of this.expenses){
      if (expense.balanceFk === balanceId){

        transactions.push(new Transaction(expense.id, expense.name,
          expense.amount, expense.description,
          expense.date, expense.monthName, expense.monthFk,
          expense.balanceFk, expense.companyFk, true)
        );


      }

    }

      return transactions;//.sort((a, b) => b.date.getDay() - a.date.getDay());
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



  /**
   * Get the color of an spending based on the id
   *
   * @param
   * @returns {string}
   */
  getColor(isExpense: boolean): string {
    if (isExpense)
      return "grey";
    else
      return "green";
  }


  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  formatDate(dateI: Date): string {
    console.log(dateI);
    let date = new Date(dateI);

    return(this.monthnames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear());
  }

  getForamatted(name: string) {
  return name.replace(/\s+/g, '');
  }

  getSumOfCategorie(id: number): number {
    let sum: number = 0;

    for (let balance of this.balances) {
      if (balance.type === id){
        sum+=balance.amount;
      }
    }
    return sum;
  }
}
