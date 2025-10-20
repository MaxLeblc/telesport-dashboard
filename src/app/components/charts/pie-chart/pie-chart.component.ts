import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export type ChartData = {
  name: string
  value: number
}

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input() results: ChartData[] = []
  @Output() select = new EventEmitter<ChartData>()

  public onChartSelect(event: ChartData): void {
    this.select.emit(event)
  }

  public getTooltipText = (data: any): string => {
    return `${data.data.name} <br/> ${data.data.value}🏅`;
  }
}
