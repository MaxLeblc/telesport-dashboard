import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { OlympicCountry } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<OlympicCountry[]>([]);
  // I chose to separate data state from error state
  public error$ = new BehaviorSubject<string | null>(null);


  constructor(private http: HttpClient) { }

  loadInitialData(): Observable<OlympicCountry[]> {
    return this.http.get<OlympicCountry[]>(this.olympicUrl).pipe(
      tap((data) => {

        this.olympics$.next(data)
        this.error$.next(null) // Success: clean previous errors
      }),
      catchError((error) => {
        console.error('Error loading Olympic data', error)
        this.olympics$.next([]) // Error: push empty array to prevent app from breaking
        this.error$.next('Failed to load Olympic data')
        return of([]) // return empty array to subscribers
      })
    )
  }

  getOlympics(): Observable<OlympicCountry[]> {
    return this.olympics$.asObservable()
  }

  // Optional getter for error state
  getError(): Observable<string | null> {
    return this.error$.asObservable()
  }
}
