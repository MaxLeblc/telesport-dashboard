import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export type ChartData = {
  name: string
  series: {
    name: string
    value: number
  }[];
}

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {
  @Input() results: ChartData[] = []
}
