import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ChartData, PieChartComponent } from '../../components/charts/pie-chart/pie-chart.component';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    PieChartComponent
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

    // Number of athlete per country
    this.numberOfCountries$ = this.olympicService.getOlympics().pipe(
      map((countries) => countries.length)
    )

    // Number of JOs
    this.numberOfJos$ = this.olympicService.getOlympics().pipe(
      map(countries => countries.reduce((sum, country) => sum + country.participations.length, 0))
    )

    // Transform OlympicCountry data to ChartData format
    this.chartData$ = this.olympicService.getOlympics().pipe(
      map(countries => {
        // If no data, return empty array to avoid breaking the chart
        if (!countries || countries.length === 0) {
          return []
        }
        // Map every OlympicCountry object to {name, value} object
        return countries.map(country => ({
          name: country.country,
          value: country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0) // Reduce to total medals
        }))
      })
    )
  }

  public onChartSelect(event: ChartData): void {
    console.log('Chart segment selected:', event);
    if (event && event.name) {
      this.router.navigate(['/detail'], { queryParams: { country: event.name } })
    }
  }
}
