import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Genre } from '../interface/genre';

@Injectable({ providedIn: 'root' })
export class MovieGenreService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllMovieGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiServerUrl}/genres/`);
  }

  public add(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(`${this.apiServerUrl}/genres`, genre);
  }

  //public getMovieGenreById(id: number): Observable<Genre> {
  // return this.http.get<Genre>(`${this.apiServerUrl}/genres/${id}`);
  //}
}
