import {Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Slider} from "../interface/slider";

@Injectable({providedIn: 'root'})
export class SliderService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Slider[]> {
    return this.http.get<Slider[]>(`${this.apiServerUrl}/slider`);
  }

  public getById(id: number): Observable<Slider> {
    return this.http.get<Slider>(`${this.apiServerUrl}/slider/${id}`);
  }

  public addNew(newSlider: Slider): Observable<Slider> {
    return this.http.post<Slider>(`${this.apiServerUrl}/slider`, newSlider);
  }

  public update(slider: Slider): Observable<Slider> {
    return this.http.put<Slider>(
      `${this.apiServerUrl}/slider/${slider.id}`,
      slider
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/slider/${id}`
    );
  }


  upload(movie, file): Observable<string> {
    return this.http.post<string>(
      `${this.apiServerUrl}/slider/${movie.id}/image`,
      file
    );
  }

}
