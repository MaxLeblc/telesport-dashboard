import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

export type ChartData = {
  id: number
  name: string
  value: number
}

export type NgxChartEvent = Pick<ChartData, 'name' | 'value'> & {
  label?: string
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

  public onChartSelect(event: NgxChartEvent): void {
    // Find complete ChartData object with id
    const fullData = this.results.find(item => item.name === event.name)

    if (fullData) {
      this.select.emit(fullData)
    } else {
      // Fallback: emit original event (cast as ChartData for compatibility)
      this.select.emit(event as ChartData)
    }
  }

  public getTooltipText = (data: { data: NgxChartEvent }): string => {
    return `${data.data.name} <br/> ${data.data.value}🏅`;
  }
}
