import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Artist } from "../interface/artist";

@Injectable({providedIn: 'root'})
export class FileUploadService {
    // Work in progress, currently not functional
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public addImage(imgData:string): Observable<String> {
    console.log("it passed by here");
    return this.http.post<String>(`${this.apiServerUrl}/files/add`, imgData);
  }
} 