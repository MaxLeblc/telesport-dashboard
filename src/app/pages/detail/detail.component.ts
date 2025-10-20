import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { ChartData, LineChartComponent } from '../../components/charts/line-chart/line-chart.component';
import { StatItemComponent } from '../../components/stat-item/stat-item.component';
import { OlympicCountry } from '../../core/models/Olympic';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    LineChartComponent,
    StatItemComponent
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public countrydata$!: Observable<OlympicCountry | undefined>
  public countryName$!: Observable<string>
  public numberOfJos$!: Observable<number>
  public medalsCount$!: Observable<number>
  public athletesCount$!: Observable<number>
  public chartData$!: Observable<ChartData[]>
  public error$ = Observable<string | null>

  constructor(
    private route: ActivatedRoute,
    private olympicService: OlympicService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.countrydata$ = this.route.queryParams.pipe(
      map(params => params['country']),



      switchMap(countryName =>
        this.olympicService.getOlympics().pipe(
          map(countries => countries.find(c => c.country === countryName))
        )
      )
    );

    // Country Name
    this.countryName$ = this.countrydata$.pipe(
      map(country => country?.country ?? 'Unknow')
    );

    // Number of JOs
    this.numberOfJos$ = this.countrydata$.pipe(
      map(country => country?.participations?.length ?? 0)
    )

    // Number of medals
    this.medalsCount$ = this.countrydata$.pipe(
      map(country => country?.participations?.reduce((sum, p) => sum + p.medalsCount, 0) ?? 0)
    )

    // Number of athletes
    this.athletesCount$ = this.countrydata$.pipe(
      map(country => country?.participations?.reduce((sum, p) => sum + p.athletesCount, 0) ?? 0)
    )

    // Transform OlympicCountry data to ChartData format
    this.chartData$ = this.countrydata$.pipe(
      map(country => {
        // If no data, return empty array to avoid breaking the chart
        if (!country) {
          return []
        }
        return [{
          name: country.country,
          series: country.participations.map(p => ({
            name: p.year.toString(),
            value: p.medalsCount,
          }))
        }]
      })
    )
  }

  public goBack(): void {
    this.router.navigate(['/']);
  }
}
