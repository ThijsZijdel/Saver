import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import {Income} from "../../../models/Income";
import {IncomeService} from "../service_income/income.service";
import {SpendingService} from "../../section_spending/service_spending/spending.service";
import {Spending} from "../../../models/Spending";

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  avgIncome: number = 5650.00;
  currentMonth: string = "JUL 2018";
  currentEarned: number = 66000;
  currentSpent: number = 53730;

  chartIncome: Chart;

  incomes: Income[] = [];
  incomeData: number[] = [];

  spendings: Spending[] = [];
  spendingData: number[] = [];

  savedData: number[] = [];

  constructor(private serviceIncome: IncomeService,
              private serviceSpending: SpendingService) { }



  ngOnInit() {
    this.getIncomes();
    this.getSpendings();
    this.calculateSaved();


    this.calculateAvg();

    this.init();
  }

  private getIncomes() {
    this.serviceIncome.getIncomes().subscribe(incomes => {
      // loop trough all the incomes
      for (let income of incomes) {
        this.incomes.push(income);

        this.incomeData.push(income.amount);
      }
    });
  }
  private getSpendings() {
    this.serviceSpending.getSpendings().subscribe(spendings => {
      // loop trough all the incomes
      for (let spending of spendings) {
        this.spendings.push(spending);

        this.spendingData.push(-Math.abs(spending.amount));

      }
    });
  }

  private calculateSaved() {

    for(let i = 0; i < this.incomes.length; i++){

      if(this.spendings[i].monthName == this.incomes[i].monthName) {
        this.savedData[i] = Math.round(-Math.abs(this.spendings[i].amount) + this.incomes[i].amount);

      }

    }
  }

  init() {

    this.calculateAvg();

    let chartIncomed = new Chart({
      chart: {
        type: 'column'
      },
      colors:['#4BCA81', '#bababa', '#EEEEEE', '#00AEEF','#D23556'],
      title: {
        text: ''
      },
      xAxis: {
        categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
      },
      plotOptions: {
        column: {
          stacking: 'normal'
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + ': ' + this.y ;
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Income',
        data: this.incomeData,
        stack: 'overview'
      }, {
        name: 'Saved',
        data: this.savedData
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



}

