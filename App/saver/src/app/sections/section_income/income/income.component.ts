import { Component, OnInit } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import {Income} from "../../../models/Income";
import {IncomeService} from "../service_income/income.service";

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

  chart: Chart;

  incomes: Income[] = [];

  constructor(private serviceIncome: IncomeService) { }



  ngOnInit() {
    this.init();
    this.getIncomes();
  }

  private getIncomes() {
    console.log('calling');
    this.serviceIncome.getIncomes().subscribe(incomes => {
      // loop trough all the incomes
      console.log('called');
      for (let income of incomes) {
        console.log('called 1');
        this.incomes.push(income);
      }
    });

  }

  addPoint() {
    if (this.chart) {
      this.chart.addPoint(Math.floor(Math.random() * 10));
    } else {
      alert('init chart, first!');
    }
  }

  addSerie() {
    this.chart.addSerie({
      name: 'Line ' + Math.floor(Math.random() * 10),
      data: [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    });
  }

  removePoint() {
    this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
    this.chart.removeSerie(this.chart.ref.series.length - 1);
  }

  init() {


    let chart = new Chart({
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
        data: [5, 3, 1, 4, 7, null, 4],
        stack: 'overview'
      }, {
        name: 'Saved',
        data: [3, 1, -1, 2, 4, null, 3]
      }, {
        name: 'Expenses',
        data: [-2, -2, -3, -3, -1, null, -1],
        stack: 'overview'
      }, {
        name: 'IncomeCur',
        data: [null, null, null, null, null, 6, null],
        stack: 'overviewCur'
      }, {
        name: 'ExpensesCur',
        data: [null, null, null, null, null,-4,null],
        stack: 'overviewCur'
      }]
    });
    //chart.addPoint(4);
    this.chart = chart;
    // chart.addPoint(5);
    // setTimeout(() => {
    //   chart.addPoint(6);
    // }, 2000);

    chart.ref$.subscribe(console.log);
  }

}
