import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Genre } from 'src/app/interface/genre';
import { Movie } from 'src/app/interface/movie';
import { MovieService } from 'src/app/service/movie.service';
import { MovieGenreService } from 'src/app/service/moviegenre.service';



@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies!: Movie[];
  genres! : Genre[];
  filteredMovies!: Movie[];
  public filterGenre!: string ;
  public filterText!: string;
  public DropdownVar : number =1;
  //page = 1;
  //count = 0;
  //tableSize = 7;
  //tableSizes = [3, 6, 9, 12];

  constructor(private movieService: MovieService, private genreService : MovieGenreService) {

  }

  ngOnInit(): void {
    this.getAllMovies();
    this.getAllMovieGenres();

  }
  public getFilteredMovies(){
    if (!this.filterText || this.filterText.length === 0) {
      this.filteredMovies = this.movies;
    }
    this.filteredMovies = this.movies.filter(x => x.title.toLocaleLowerCase().includes(this.filterText));

  }

  public getAllMovies(): void {
    this.movieService.getAllMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
        console.log(this.movies);
        this.filteredMovies = this.movies;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getFilteredMoviesByGenre(genreValue : string){
    if (!genreValue || genreValue === "All") {
      this.filteredMovies = this.movies;
    }else{
    this.filteredMovies = this.movies.filter(x => x.genre.title.toLocaleLowerCase().includes(genreValue.toLocaleLowerCase()));
  }
  }
public getAllMovieGenres(): void {
   this.genreService.getAllMovieGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
        console.log(this.genres);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //onTableDataChange(event){
   // this.page = event;
   // this.getFilteredMovies();
  //}
  //onTableSizeChange(event): void {
   // this.tableSize = event.target.value;
    //this.page = 1;
  //  this.getFilteredMovies();
}
