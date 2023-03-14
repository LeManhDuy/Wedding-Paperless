import {Component, OnInit} from '@angular/core';
import {Chart} from "angular-highcharts";
import {ChartService} from "../../../../_services/chart.service";
import {QuantityByTime} from "../../../../models/chart";

@Component({
  selector: 'app-content-chart',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentChartComponent implements OnInit{

  contentByTime: QuantityByTime = new QuantityByTime();
  data: { color: string; name: string; y: any }[] = [];
  chart: any = null

  constructor(private chartService: ChartService) { }
  ngOnInit(): void {
    let that = this
    this.chartService.getContentByTime().subscribe(
      (data) => {
        that.contentByTime = data;
        const numbByDays = this.contentByTime.numbByDays;
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
              text: 'Content in Month'
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
