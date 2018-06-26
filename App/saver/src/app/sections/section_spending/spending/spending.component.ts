import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";
import {SpendingService} from "../service_spending/spending.service";
import {Spending} from "../../../models/Spending";
import {BehaviorSubject} from "rxjs/index";

@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {

  constructor(private serviceSpending: SpendingService) { }

  chart: Chart;

  spendings: Spending[] = [];
  spendingData: dataObj[] = [];


  ngOnInit() {
    this.getSpendings();

    setTimeout(()=>{
      this.init();
    }, 500);
  }



  private getSpendings() {
    //TODO the spendings should be collected in groups, sorted and the sum of the amounts for each category!
    //TODO This way they can be all loaded into the chart


    this.serviceSpending.getSpendings().subscribe(spendings => {
      this.spendingData = [];
      this.spendings = [];

      // loop trough all the incomes
      for (let spending of spendings) {
        this.spendings.push(spending);

        this.spendingData.push( new dataObj(spending.monthName, spending.amount) );

      }
    });
  }




  init() {
    console.log(this.spendingData.length+": spend chart")

      let chart = new Chart({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: ['#EB7092', '#D23556', '#FF6E1F', '#FFBB28', '#4BCA81',
              '#00AEEF', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#B8E986'],
            dataLabels: {
              enabled: false
            }
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Categories',
          innerSize: '75%',
          data: this.spendingData
        }]

      });


      this.chart = chart;


      chart.ref$.subscribe(console.log);





  }

}

export class dataObj {
  name: string;
  y: number;

  constructor(name: string, y: number) {
    this.y = y;
    this.name = name;
  }
}
