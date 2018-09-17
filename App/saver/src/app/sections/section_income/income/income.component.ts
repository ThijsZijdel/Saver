import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import {Income} from "../../../models/Income";
import {IncomeService} from "../service_income/income.service";
import {Spending} from "../../../models/Spending";
import * as $ from "jquery"
import {ExpenseService} from "../../section_expense/service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {ContextMenuComponent, ContextMenuService} from "ngx-contextmenu";
import {ReloadServiceFinancial} from "../../../container-sections/financial-controller-section/service_reloadFinancial/reload.serviceFinancial";

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
    this.getCurrentAmounts();

    this.getLabels("monthly", 12);
    this.getFilteredIncomes("monthly", 12);
    this.getFilteredSpendings("monthly", 12);
    this.calculateSaved();
    this.calculateAvg();

    setTimeout(()=>{
      this.init();
    }, 500);

    this.reloadServiceFinancial.change.subscribe(month => {
      this.refresh();
    });

  }

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

  // eventPointY: string = this.labels[new Date().getMonth()].toString();

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
        categories: this.labels
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        },
        series: {
          cursor: 'pointer',
          events: {
            click: function (event) {

              handleIt(event, event.point.category);

            }
          }

        }
      },
      tooltip: {
        borderColor: 'rgba(205,205,205,0.8)',
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y ;
        },
        hideDelay: 0,
        shadow: false,
        animation: false,
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


    // chartIncomed.ref$.subscribe(console.log);

    function handleIt(event: any, category: any) {
      console.log("  >> "+category)
      // this.eventPointY = category;
      alert(event.point.y+"Y   "+event.point.x+"X  "+event.point.category+"  ");
    }
  }




  private calculateAvg() {
    let sum: number = 0;

    for(let data of this.incomeData){
      sum+=data;
    }

    this.avgIncome = Math.round(sum/this.incomeData.length);
  }






  toggleTooltips(){
    $('.tooltipPerc').toggleClass("hidden");

    $('.highcharts-tooltip').toggleClass("hidden");




  }


  private getCurrentAmounts() {

  }

  private refresh() {
    console.log("reload  from rl service --> called the refresh in income")
    let frequency = this.reloadServiceFinancial.frequency;
    let months = this.reloadServiceFinancial.months;

    this.getLabels(frequency, months);
    this.getFilteredSpendings(frequency, months);
    this.getFilteredIncomes(frequency, months);

    this.calculateAvg();
    this.calculateSaved();

    setTimeout(()=>{
      this.init();
    }, 500);
  }
}

