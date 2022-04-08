import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Gallery } from "../interface/gallery";



@Injectable({providedIn: 'root'})
export class GalleryService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllGalleryByMovie(id: number): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(`${this.apiServerUrl}/gallery/${id}`);
  }

}
