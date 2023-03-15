import {Component} from '@angular/core';
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

  month = ""

  months = [
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
    'Dec',
  ]

  convertMonth(m: string) {
    let selectedMonth = ""
    switch (m) {
      case "Jan":
        selectedMonth = '01'
        break;
      case "Feb":
        selectedMonth = '02'
        break;
      case "Mar":
        selectedMonth = '03'
        break;
      case "Apr":
        selectedMonth = '04'
        break;
      case "May":
        selectedMonth = '05'
        break;
      case "Jun":
        selectedMonth = '06'
        break;
      case "Jul":
        selectedMonth = '07'
        break;
      case "Aug":
        selectedMonth = '08'
        break;
      case "Sep":
        selectedMonth = '09'
        break;
      case "Oct":
        selectedMonth = '10'
        break;
      case "Nov":
        selectedMonth = '11'
        break;
      case "Dec":
        selectedMonth = '12'
        break;
    }
    return selectedMonth
  }

  onChangeSelection() {
    let that = this
    let check = false
    const numbByDays = that.accountByTime.numbByDays;
    Object.keys(numbByDays!).forEach(key => {
      if (key.split("-")[1] == that.convertMonth(that.month)) {
        check = true
        this.data = [];
        Object.keys(numbByDays!).map(key => {
          if (key.split("-")[1] == that.convertMonth(that.month)) {
            this.data.push({
              name: key,
              y: numbByDays![key],
              color: that.chartService.getRandomColor()
            })
          }
        });

        that.chart = new Chart({
          chart: {
            type: 'pie',
            height: 325
          },
          title: {
            text: 'Account in Month ' + that.month
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
      if (!check) {
        that.chart = new Chart({
          chart: {
            type: 'pie',
            height: 325
          },
          title: {
            text: 'Account in Month ' + that.month
          },
          yAxis: {
            title: {
              text: 'Revenue in %'
            }
          },
          series: [
            {
              type: 'pie',
              data: [{
                name: that.month,
                y: 0,
                color: that.chartService.getRandomColor()
              }]
            }
          ],
          credits: {
            enabled: false
          }
        })
      }
    })
  }

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void {
    let d = new Date();
    let that = this
    that.month = (d.toLocaleString('default', {month: 'short'}));
    this.chartService.getAccountByTime().subscribe(
      (data) => {
        that.accountByTime = data;
        const numbByDays = this.accountByTime.numbByDays;
        Object.keys(numbByDays!).forEach(key => {
          if (key.split("-")[1] == that.convertMonth(that.month)) {
            if (numbByDays) {
              this.data = [];
              Object.keys(numbByDays).map(key => {
                if (key.split("-")[1] == that.convertMonth(that.month)) {
                  this.data.push({
                    name: key,
                    y: numbByDays[key],
                    color: that.chartService.getRandomColor()
                  })
                }
              });

              this.chart = new Chart({
                chart: {
                  type: 'pie',
                  height: 325
                },
                title: {
                  text: 'Account in this month'
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
        })

      }
    );

  }
}
