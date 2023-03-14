import {Component, OnInit} from '@angular/core';
import {Chart ,ChartDataset, ChartOptions} from "chart.js";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{
  const datasets: ChartDataset[] = [
    {
      label: 'Dataset 1',
      data: [10, 20, 30],
      fill: 'origin'
    },
    {
      label: 'Dataset 2',
      data: [40, 50, 60],
      fill: '+2'
    },
  ];
  constructor() {
  }

  ngOnInit(): void {
    const ctx = document.getElementById("myAreaChart") as HTMLCanvasElement;
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: this.datasets
      },
      options: {

      }

    });
  }
}
