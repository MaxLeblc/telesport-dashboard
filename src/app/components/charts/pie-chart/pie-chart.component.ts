import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export type ChartData = {
  id: number
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

  public onChartSelect(event: any): void {
    // Find complete ChartData object with id
    const fullData = this.results.find(item => item.name === event.name)

    if (fullData) {
      this.select.emit(fullData)
    } else {
      // Fallback: emit original event
      this.select.emit(event)
    }
  }

  public getTooltipText = (data: any): string => {
    return `${data.data.name} <br/> ${data.data.value}🏅`;
  }
}
