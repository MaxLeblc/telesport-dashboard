import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicService: OlympicService) { }

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe()
  }
}
