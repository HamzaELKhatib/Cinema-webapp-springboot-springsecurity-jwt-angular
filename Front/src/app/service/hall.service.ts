import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Hall } from "../interface/hall";

@Injectable({providedIn: 'root'})
export class HallService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllHalls(): Observable<Hall[]> {
    return this.http.get<Hall[]>(`${this.apiServerUrl}/halls/all`);

  }
  public getHallById(id: number): Observable<Hall> {
    return this.http.get<Hall>(`${this.apiServerUrl}/halls/${id}`);
  }

  public addHall(hall: Hall): Observable<Hall> {
    return this.http.post<Hall>(`${this.apiServerUrl}/halls/add`, hall);
  }

  public updateHall(hallId: number,hall: Hall): Observable<Hall> {
    return this.http.put<Hall>(`${this.apiServerUrl}/halls/update/${hallId}`, hall);
  }

  public deleteHall(hallId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/halls/delete/${hallId}`);
  }
  }