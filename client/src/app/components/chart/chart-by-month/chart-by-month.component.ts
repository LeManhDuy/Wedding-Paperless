import { Component } from '@angular/core';
import {Chart} from "angular-highcharts";
import {ChartService} from "../../../_services/chart.service";
import {QuantityByTime} from "../../../models/chart";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-chart-by-month',
  templateUrl: './chart-by-month.component.html',
  styleUrls: ['./chart-by-month.component.css']
})
export class ChartByMonthComponent {
  chart: any = null
  accountByTime: QuantityByTime = new QuantityByTime();
  contentByTime: QuantityByTime = new QuantityByTime();
  dataAccount: any[] = [];
  dataContent: any[] = [];
  // chart: any = null
  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    // this.chartService.getAccountByTime().subscribe(
    //   data => {
    //     this.accountByTime = data
    //     console.log("11", data)
    //     this.chartService.getContentByTime().subscribe(
    //       data => {
    //         this.contentByTime = data
    //         console.log("21", data)
    //         console.log("31", this.accountByTime, this.contentByTime)
    //       }
    //     )
    //   }
    // )

    forkJoin([
      this.chartService.getAccountByTime(),
      this.chartService.getContentByTime()
    ]).subscribe(([accountData, contentData]) => {
      this.accountByTime = accountData;
      this.contentByTime = contentData;
      for (let i = 1; i <= 12 ; i++) {
        let checkDataAccount: number[] = []
        let checkDataContent: number[] = []
        //add data Account
        Object.keys(this.accountByTime.numbByMonths!).map(key => {
          let m = key.split("-")[1]
          if (i.toString() == m) {
            checkDataAccount.push(this.accountByTime.numbByMonths![key])
            return
          }
          checkDataAccount.push(0)
        })
        let nonZeroAccountElement = checkDataAccount.find(element => element !== 0);
        if (nonZeroAccountElement) {
          this.dataAccount.push(nonZeroAccountElement)
        }
        else {
          this.dataAccount.push(0)
        }
        //add data Content
        Object.keys(this.contentByTime.numbByMonths!).map(key => {
          let m = key.split("-")[1]
          if (i.toString() == m) {
            checkDataContent.push(this.contentByTime.numbByMonths![key])
            return
          }
          checkDataContent.push(0)
        })
        let nonZeroContentElement = checkDataContent.find(element => element !== 0);
        if (nonZeroContentElement) {
          this.dataContent.push(nonZeroContentElement)
        }
        else {
          this.dataContent.push(0)
        }

      }
      this.chart = new Chart(
        {
          chart: {
            type: 'line',
            height: 325
          },
          title: {
            text: 'Account and Content in Year'
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
              data: this.dataAccount
            },
            {
              name: 'Content',
              type: 'line',
              color: '#f6c23e',
              data: this.dataContent
            },
          ],
          credits: {
            enabled: false
          }
        }
      )
    });
  }
}
