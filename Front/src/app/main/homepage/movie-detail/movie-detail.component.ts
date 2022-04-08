import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from 'src/app/interface/gallery';
import { Movie } from 'src/app/interface/movie';
import { GalleryService } from 'src/app/service/gallery.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  movieGallery : Gallery[] = [];
  public DropdownVar=1;
  backdropPicture : string="";
  constructor(private route: ActivatedRoute,private movieService: MovieService,private galleryService: GalleryService) { }

   getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.movieService.getMovieById(Number(id)).subscribe(movie => this.movie = movie);
  }
  getGallery(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.galleryService.getAllGalleryByMovie(Number(id)).subscribe(movieGallery => this.movieGallery = movieGallery);
  }

  ngOnInit() {
    this.getMovie();
    this.getGallery();
    this.backdropPicture="/../../../../assets/movies/movie"+this.movie.id+"/"+this.movieGallery[0].photoUrl;
    console.log("-----------"+this.backdropPicture);
      
  }
  showPopUp(i:number)
  {
    (document.getElementById('popup') as HTMLElement).style.transform = 'translateY(0)';
    //var index = (document.getElementById('clickedImage') as HTMLImageElement).alt;
    console.log(i);
    (document.getElementById('selectedImage') as HTMLImageElement).src = (document.getElementById(''+i) as HTMLImageElement).src;
  }
  closePopUp(){
    (document.getElementById('popup') as HTMLElement).style.transform = 'translateY(-100%)';
  }
}
