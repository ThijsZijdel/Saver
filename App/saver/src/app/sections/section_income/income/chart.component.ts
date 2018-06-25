// chart.component.ts
import { Chart } from 'angular-highcharts';
import {Component} from "@angular/core";

@Component({
  template: `
    <button (click)="add()">Add Point!</button>
    <div [chart]="chart"></div>
  `
})
export class ChartComponent {
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1',
        data: [1, 2, 3]
      }
    ]
  });

  // add point to chart serie
  add() {
    this.chart.addPoint(Math.floor(Math.random() * 10));
  }
}
