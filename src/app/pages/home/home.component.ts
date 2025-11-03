import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ChartData, PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { StatItemComponent } from '../../components/stat-item/stat-item.component';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    PieChartComponent,
    StatItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  public numberOfCountries$: Observable<number>
  public numberOfJos$: Observable<number>
  public chartData$: Observable<ChartData[]>
  public error$: Observable<string | null>

  constructor(
    private olympicService: OlympicService,
    private router: Router
  ) {
    this.error$ = this.olympicService.getError()

    // Number of countries
    this.numberOfCountries$ = this.olympicService.getOlympics().pipe(
      map((countries) => countries.length)
    )

    // Number of unique JOs
    this.numberOfJos$ = this.olympicService.getOlympics().pipe(
      map(countries => {
        const uniqueSet = new Set<string>()
        countries.forEach(country => {
          country.participations.forEach(participation => {
            uniqueSet.add(`${participation.year}-${participation.city}`)
          });
        });
        return uniqueSet.size
      })
    )

    // Transform OlympicCountry data to ChartData format
    this.chartData$ = this.olympicService.getOlympics().pipe(
      map(countries => {
        // If no data, return empty array to avoid breaking the chart
        if (!countries || countries.length === 0) {
          return []
        }
        // Map every OlympicCountry object to {id, name, value} object
        return countries.map(country => ({
          id: country.id,
          name: country.country,
          // Sum up all medals from participations
          value: country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
        }))
      })
    )
  }

  public onChartSelect(event: ChartData): void {
    if (event && event.id) {
      this.router.navigate(['/detail'], { queryParams: { id: event.id } })
    }
  }
}
