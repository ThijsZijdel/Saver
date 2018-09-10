import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Chart} from "angular-highcharts";
import {Income} from "../../../models/Income";
import {Expense} from "../../../models/Expense";
import {IncomeService} from "../../../sections/section_income/service_income/income.service";
import {ExpenseService} from "../../../sections/section_expense/service_expense/expense.service";
import {ReloadServiceFinancial} from "../service_reloadFinancial/reload.serviceFinancial";

@Component({
  selector: 'app-financial-controller',
  templateUrl: './financial-controller.component.html',
  styleUrls: ['./financial-controller.component.css']
})
export class FinancialControllerComponent implements OnInit {


  avgIncome: number = 0.00;
  currentMonth: string = "JUL 2018";
  currentEarned: number = 0;
  currentSpent: number = 0;

  chartIncome: Chart;

  incomes: Income[] = [];
  incomeData: number[] = [];

  expenses: Expense[] = [];
  spendingData: number[] = [];

  savedData: number[] = [];

  labels: String[] = [];


  showSavedSerie: boolean = false;


  constructor(private serviceIncome: IncomeService,
              private serviceExpense: ExpenseService,
              private reloadServiceFinancial: ReloadServiceFinancial) { }



  ngOnInit() {

    this.getLabels("monthly", 12);
    this.getFilteredIncomes("monthly", 12);
    this.getFilteredSpendings("monthly", 12);

    this.calculateAvg();



  }



  @Output() change: EventEmitter<number> = new EventEmitter();



  private getFilteredIncomes(frequency: string, months: number):void {
    this.incomes = [];
    this.incomeData = [];

    this.serviceIncome.getIncomesFiltered(frequency, months).subscribe(incomes => {
      // loop trough all the incomes
      for (let income of incomes) {
        this.incomes.push(income);

        this.incomeData.push(income.amount);
      }
    });
  }

  private getFilteredSpendings(frequency: string, months: number): void {
    this.spendingData = [];
    this.expenses = [];

    this.serviceExpense.getExpensesFiltered(frequency, months).subscribe(expenses => {

      for (let expense of expenses) {
        this.expenses.push(expense);
        this.spendingData.push(-Math.abs(expense.amount));

      }
    });

  }
  private getLabels(frequency: string, months: number) {
    this.labels = [];

    this.serviceExpense.getLabelsFiltered("Expense",frequency, months).subscribe(labels => {

      for (let label of labels) {

        if (frequency === "monthly") {
          this.labels.push(label.name);
        } else if (frequency === "weekly"){
          this.labels.push("Week: "+label.name);
        } else {
          this.labels.push(label.name.slice(0,10));
        }
      }
    });

    this.serviceExpense.getLabelsFiltered("Income",frequency, months).subscribe(labels => {

      for (let label of labels) {

        if (frequency === "monthly") {
          this.labels.push(label.name);
        } else if (frequency === "weekly"){
          this.labels.push("Week: "+label.name);
        } else {
          this.labels.push(label.name.slice(0,10));
        }
      }
    });

    this.labels.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    }).reverse();

  }

  private calculateSaved() {
    this.savedData = [];
    for(let i = 0; i < this.incomeData.length; i++){

      // if(this.spendings[i].monthName == this.incomes[i].monthName) {
      this.savedData[i] = Math.round(-Math.abs(this.spendingData[i]) + this.incomeData[i]);
      // }

    }
  }


  private calculateAvg() {
    let sum: number = 0;

    for(let data of this.incomeData){
      sum+=data;
    }

    this.avgIncome = Math.round(sum/this.incomeData.length);
  }


  selectionChange(frequency: string, months: number) {
    // let months = parseFloat(monthsInput);
    console.log("financial controller called selection change")
    this.reloadServiceFinancial.setValues(frequency, months);

    this.getLabels(frequency, months);
    this.getFilteredSpendings(frequency, months);
    this.getFilteredIncomes(frequency, months);

    this.calculateAvg();
    this.calculateSaved();

    this.change.emit(0);
  }


}
