import {Injectable} from '@angular/core';
import {HttpClient,} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Movie} from '../interface/movie';

@Injectable({providedIn: 'root'})
export class MovieService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerUrl}/movies`);
  }

  public getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiServerUrl}/movies/${id}`);
  }

  public addMovie(newMovie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiServerUrl}/movies`, newMovie);
  }

  public updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(
      `${this.apiServerUrl}/movies/${movie.id}`,
      movie
    );
  }

  public deleteMovie(movieId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/movie/delete/${movieId}`);
  }


  public getPoster(url): Observable<Blob> {
    return this.http.get(url, {responseType: 'blob'});
  }

  upload(movie, file): Observable<string> {
    return this.http.post<string>(
      `${this.apiServerUrl}/movies/${movie.id}/poster`,
      file
    );
  }

}
