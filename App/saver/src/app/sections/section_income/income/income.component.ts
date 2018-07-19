import {Component, OnInit, ViewChild} from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import {Income} from "../../../models/Income";
import {IncomeService} from "../service_income/income.service";
import {Spending} from "../../../models/Spending";
import * as $ from "jquery"
import {ExpenseService} from "../../section_expense/service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {ContextMenuComponent} from "ngx-contextmenu";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  @ViewChild(ContextMenuComponent) public expenseMenu: ContextMenuComponent;
  @ViewChild(ContextMenuComponent) public incomeMenu: ContextMenuComponent;

  avgIncome: number = 0.00;
  currentMonth: string = "JUL 2018";
  currentEarned: number = 66000;
  currentSpent: number = 53730;

  chartIncome: Chart;

  incomes: Income[] = [];
  incomeData: number[] = [];

  expenses: Expense[] = [];
  spendingData: number[] = [];

  savedData: number[] = [];

  monthly: String[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


  showSavedSerie: boolean = false;


  constructor(private serviceIncome: IncomeService,
              private serviceExpense: ExpenseService) { }



  ngOnInit() {
    this.getIncomes("monthly", 12);
    this.getSpendings("monthly", 12);
    this.calculateSaved();
    this.calculateAvg();

    setTimeout(()=>{
      this.init();
    }, 500);


  }

  private getIncomes(frequency: string, months: number):void {
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

  private getSpendings(frequency: string, months: number): void {
    this.spendingData = [];
    this.expenses = [];

    this.serviceExpense.getExpensesFiltered(frequency, months).subscribe(expenses => {

      for (let expense of expenses) {
        this.expenses.push(expense);
        this.spendingData.push(-Math.abs(expense.amount));

      }
    });

  }

  private calculateSaved() {

    for(let i = 0; i < this.incomeData.length; i++){

      // if(this.spendings[i].monthName == this.incomes[i].monthName) {
        this.savedData[i] = Math.round(-Math.abs(this.spendingData[i]) + this.incomeData[i]);
      // }

    }
  }


  init() {

    this.calculateAvg();
    this.calculateSaved();

    let chartIncomed = new Chart({
      chart: {
        type: 'column',
        height: '250px'
      },
      colors:['#4BCA81', '#bababa', '#EEEEEE', '#00AEEF','#D23556'],
      title: {
        text: ''
      },
      xAxis: {
        categories: this.monthly
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        },
        series: {
          cursor: 'pointer'
          // ,point: {
          //   events: {
          //     click: function (event) {
          //
          //     }
          //   }
          // }
        }
      },
      tooltip: {
        borderColor: 'rgba(205,205,205,0.8)',
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y ;
        }
      },
      yAxis:{
        title: {
          text: ''
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Income',
        data: this.incomeData,
        stack: 'overview',
      }, {
        name: 'Saved',
        data: this.savedData,
        visible: this.showSavedSerie
      }, {
        name: 'Expenses',
        data: this.spendingData,
        stack: 'overview'
      }]
    });

    this.chartIncome = chartIncomed;


    chartIncomed.ref$.subscribe(console.log);
  }


  private calculateAvg() {
    let sum: number = 0;

    for(let data of this.incomeData){
      sum+=data;
    }

    this.avgIncome = Math.round(sum/this.incomeData.length);
  }


  selectionChange(frequency: string, months: number) {
    this.getSpendings(frequency, months);
    this.getIncomes(frequency, months);

    this.calculateAvg();
    this.calculateSaved();

    setTimeout(()=>{
      this.init();
    }, 500);
  }
}

