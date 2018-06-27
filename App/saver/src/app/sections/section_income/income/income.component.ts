import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import {Income} from "../../../models/Income";
import {IncomeService} from "../service_income/income.service";
import {SpendingService} from "../../section_spending/service_spending/spending.service";
import {Spending} from "../../../models/Spending";
import * as $ from "jquery"

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
    this.incomeData = this.getIncomes();
    this.spendingData = this.getSpendings();
    this.calculateSaved();
    this.calculateAvg();

    setTimeout(()=>{
      this.init();
    }, 500);


  }

  private getIncomes(): number[] {
    this.incomes = [];
    let incomeDataC: number[] = [];

    this.serviceIncome.getIncomes().subscribe(incomes => {
      // loop trough all the incomes
      for (let income of incomes) {
        this.incomes.push(income);

        incomeDataC.push(income.amount);
      }
    });
    return incomeDataC;
  }
  private getSpendings(): number[] {
    let spendingDataC: number[] = [];
    this.spendings = [];

    this.serviceSpending.getSpendings().subscribe(spendings => {
      // loop trough all the incomes
      for (let spending of spendings) {
        this.spendings.push(spending);

        spendingDataC.push(-Math.abs(spending.amount));

      }
    });

    return spendingDataC;
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

    console.log(this.incomeData.length+": income |"+this.spendingData.length+": spend |"+this.savedData.length+": saved");

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

