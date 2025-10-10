import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OlympicService } from '../../core/services/olympic.service';

import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
// export class HomeComponent implements OnInit {
//   public olympics$: Observable<any> = of(null);

//   constructor(private olympicService: OlympicService) { }

//   ngOnInit(): void {
//     this.olympics$ = this.olympicService.getOlympics();
//   }
// }
export class HomeComponent {
  public olympics$: Observable<any>;
  constructor(private olympicService: OlympicService) {
    this.olympics$ = this.olympicService.getOlympics();
  }
}
