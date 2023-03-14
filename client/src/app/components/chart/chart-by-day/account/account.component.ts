import { Component } from '@angular/core';
import {Chart} from "angular-highcharts";
import {ChartService} from "../../../../_services/chart.service";
import {QuantityByTime} from "../../../../models/chart";

@Component({
  selector: 'app-account-chart',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountChartComponent {
  accountByTime: QuantityByTime = new QuantityByTime();
  data: { color: string; name: string; y: any }[] = [];
  chart: any = null
  constructor(private chartService: ChartService) { }

  ngOnInit(): void {

    let that = this
    this.chartService.getAccountByTime().subscribe(
      (data) => {
        that.accountByTime = data;
        const numbByDays = this.accountByTime.numbByDays;
        if (numbByDays) {
          this.data = Object.keys(numbByDays).map(key => ({
            name: key,
            y: numbByDays[key],
            color: that.chartService.getRandomColor()
          }));

          this.chart = new Chart({
            chart: {
              type: 'pie',
              height: 325
            },
            title: {
              text: 'Account in Month'
            },
            yAxis: {
              title: {
                text: 'Revenue in %'
              }
            },
            series: [
              {
                type: 'pie',
                data: this.data
              }
            ],
            credits: {
              enabled: false
            }
          })
        }
      }
    );

  }
}
