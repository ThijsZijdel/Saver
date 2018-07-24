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
import {BalanceType} from "../../../models/BalanceType";
import {BalanceTypeService} from "../service_balanceType/balanceType.service";

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

  balanceTypes: BalanceType[] = [];

  constructor(private balanceService: BalanceService,
              private expenseService: ExpenseService,
              private incomeService: IncomeService,
              private balanceTypeService: BalanceTypeService) {

  }

  displayedAmount: val[] = [];

  ngOnInit() {
    this.getBalanceTypes();
    this.getBalances();
    this.getExpenses();
    this.getIncomes();
  }


  private getBalances() {
    this.balancesTotal = 0;
    this.balances = [];

    this.balanceService.getBalances().subscribe(balances => {
      // loop trough all the incomes
      for (let balance of balances) {

          this.displayedAmount.push(new val(balance.id,5));
          this.balances.push(balance);
          this.balancesTotal += balance.amount;
      }
    });
  }

  private getExpenses() {
    this.expenses = [];
    this.expenseService.getExpenses().subscribe(expenses => {
      // loop trough all the incomes
      for (let expense of expenses) {


        this.expenses.push(expense);

      }
    });
  }

  private getIncomes() {
    this.incomes = [];
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

      return transactions.sort((a, b) => {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      }).reverse();
  }

  setShowStateSubLayer(mainClasse:string, name: string, id: number) {

    // ".mainClasse  .id-name"
    let element: string = '.'+mainClasse+'.'+name+'-'+id;


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
   * @param isExpense: yes/ no
   * @returns {string}
   */
  protected getColor(isExpense: boolean): string {
    if (isExpense)
      return "grey";
    else
      return "green";
  }


  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  formatDate(dateI: Date): string {
    let date = new Date(dateI);

    return(this.monthnames[date.getMonth()] + " " + date.getDay());
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

  private getBalanceTypes() {
    this.balanceTypes = [];
    this.balanceTypeService.getBalanceTypes().subscribe(balanceTypes => {
      // loop trough all the incomes


      for (let type of balanceTypes) {
        this.balanceTypes.push(type);

      }
    });
  }
}

export class val {
  key: number;
  val: number;

  constructor( key: number, val: number){
    this.key = key;
    this.val = val;
  }
}
