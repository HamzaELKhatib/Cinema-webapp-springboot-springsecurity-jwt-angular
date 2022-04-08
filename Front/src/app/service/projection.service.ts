import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Projection } from "../interface/projection";

@Injectable({providedIn: 'root'})
export class ProjectionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllProjections(): Observable<Projection[]> {
    return this.http.get<Projection[]>(`${this.apiServerUrl}/projections/all`);

  }
  public getProjectionById(id: number): Observable<Projection> {
    return this.http.get<Projection>(`${this.apiServerUrl}/projections/${id}`);
  }

  public addProjection(projection: Projection): Observable<Projection> {
    return this.http.post<Projection>(`${this.apiServerUrl}/projections/add`, projection);
  }

  public updateProjection(projectionId: number,projection: Projection): Observable<Projection> {
    return this.http.put<Projection>(`${this.apiServerUrl}/projections/update/${projectionId}`, projection);
  }

  public deleteProjection(projectionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/projections/delete/${projectionId}`);
  }
  }
