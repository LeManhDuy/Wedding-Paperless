// import {Component, OnInit} from '@angular/core';
// import {Chart ,ChartDataset, ChartOptions} from "chart.js";
// import * as ApexCharts from 'apexcharts';
//
//
// @Component({
//   selector: 'app-chart',
//   templateUrl: './chart.component.html',
//   styleUrls: ['./chart.component.css']
// })
// export class ChartComponent implements OnInit{
//   options = {
//     chart: {
//       type: 'line'
//     },
//     series: [{
//       name: 'sales',
//       data: [30,40,35,50,49,60,70,91,125]
//     }],
//     xaxis: {
//     }
//   }
//
//    datasets: ChartDataset[] = [
//     {
//       label: 'Dataset 1',
//       data: [10, 20, 30],
//       fill: 'origin'
//     },
//     {
//       label: 'Dataset 2',
//       data: [40, 50, 60],
//       fill: '+2'
//     },
//   ];
//   constructor() {
//   }
//
//   ngOnInit(): void {
//     const ctx = document.getElementById("myAreaChart") as HTMLCanvasElement;
//     var chart = new ApexCharts(ctx, this.options);
//     chart.render();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {

  chart = new Chart({
    chart: {
      type: 'line',
      height: 325
    },
    title: {
      text: 'Monthly Account and Content'
    },
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    yAxis: {
      title: {
        text: 'Number'
      }
    },
    series: [
      {
        name: "Account",
        type: "line",
        color: '#4e73df',
        data: [70, 69, 95, 145, 182, 215, 252, 265, 233, 183, 139, 196]
      },
      {
        name: 'Content',
        type: 'line',
        color: '#f6c23e',
        data: [
          47, 52, 44, 35, 58, 69, 32, 53, 71, 82, 99, 159
        ]
      },
    ],
    credits: {
      enabled: false
    }
  })

  constructor() { }

  ngOnInit(): void {
  }

}
