import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Artist } from "../interface/artist";

@Injectable({providedIn: 'root'})
export class ArtistService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getAllArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiServerUrl}/artists/all`);
  }

  public getAllActors(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiServerUrl}/artists/actors/`);
  }

  public getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiServerUrl}/artists/${id}`);
  }

  public add(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${this.apiServerUrl}/artists/add`, artist);
  }

  public updateArtist(artistId: number,artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.apiServerUrl}/artists/update/${artistId}`, artist);
  }

  public deleteArtist(artistId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/artists/delete/${artistId}`);
  }
  public getUserProfileImage(uid: string): Observable<any> {
      return this.http.get(`${this.apiServerUrl}/artists/${uid}/image`);
    }
}
