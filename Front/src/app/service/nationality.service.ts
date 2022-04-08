import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from '../interface/artist';
import { Nationality } from '../interface/nationality';

@Injectable({ providedIn: 'root' })
export class NationalityService {
  // Work in progress, currently not functional
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

   public getAll(): Observable<Nationality[]> {
      return this.http.get<Nationality[]>(`${this.apiServerUrl}/nationalities`);
    }

    public getNationalityById(id: number): Observable<Nationality> {
      return this.http.get<Nationality>(`${this.apiServerUrl}/nationalities/${id}`);
    }

  public add(nationality: Nationality): Observable<Nationality> {
    return this.http.post<Nationality>(
      `${this.apiServerUrl}/nationalities`,
      nationality
    );
  }
}
