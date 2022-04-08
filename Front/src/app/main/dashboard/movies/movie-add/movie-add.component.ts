import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Movie} from '../../../../interface/movie';
import {ArtistService} from '../../../../service/artist.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Artist} from '../../../../interface/artist';
import {NationalityService} from '../../../../service/nationality.service';
import {MovieGenreService} from '../../../../service/moviegenre.service';
import {Nationality} from '../../../../interface/nationality';
import {Genre} from '../../../../interface/genre';
import {MovieService} from 'src/app/service/movie.service';
import {CoreSidebarService} from 'src/@core/components/core-sidebar/core-sidebar.service';
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../../../environments/environment";
import {AuthenticationService} from "../../../../auth/service/authentication.service";
import {DomSanitizer} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieAddComponent implements OnInit {
  public allArtists;
  public actors;
  public directors;
  public writers;
  public newArtistType;
  @ViewChild('movieForm') movieForm: NgForm;
  public genres: Genre[];
  public nationalities: Nationality[];
  public posterFile: File;
  public poster: string | ArrayBuffer;


  public uploader: FileUploader = new FileUploader({
    isHTML5: true,
    itemAlias: 'file',
  })

  progress = 0;
  public isSavingMovie = false
  private apiServerUrl = environment.apiBaseUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private route: Router,
    private authenticationService: AuthenticationService,
    private _coreSidebarService: CoreSidebarService,
    private _movieService: MovieService,
    private _artistsService: ArtistService,
    private _nationalityService: NationalityService,
    private _genresService: MovieGenreService
  ) {
  }

  ngOnInit(): void {
    this.getAllArtists();
    this.getNationalities();
    this.getGenres();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  addNewGenre = (tag) => {
    let newGenre: Genre = {title: tag};
    this._genresService.add(newGenre).subscribe(
      (response: Genre) => {
        this.getGenres();
        return tag;
      },
      (error: HttpErrorResponse) => {
        alert('Error adding the genre');
      }
    );
  };

  addNewNationality = (tag) => {
    let nationality: Nationality = {title: tag};
    this._nationalityService.add(nationality).subscribe(
      (response: Nationality) => {
        this.getNationalities();
        return tag;
      },
      (error: HttpErrorResponse) => {
        alert('Error adding the nationality');
      }
    );
  };

  getAllArtists() {
    this._artistsService.getAllArtists().subscribe(
      (response: []) => {
        response.map((artist: any) => {
          artist.full_name = artist.firstName + ' ' + artist.lastName;
          return artist;
        });

        this.allArtists = response;

        this.actors = response.filter((artist: Artist) => {
          return artist.type.toString() == 'ACTOR';
        });
        this.directors = response.filter((artist: Artist) => {
          return artist.type.toString() == 'DIRECTOR';
        });
        this.writers = response.filter((artist: Artist) => {
          return artist.type.toString() == 'WRITER';
        });

      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  getNationalities() {
    this._nationalityService.getAll().subscribe(
      (response: Nationality[]) => {
        this.nationalities = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  getGenres() {
    this._genresService.getAllMovieGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  uploadImage(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      this.posterFile = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (e) => {
        // function call once readAsDataUrl is completed
        this.poster = e.target.result; // Set image in element
      };
    }
  }

  removePoster() {
    this.poster = null
    this.posterFile = null
  }

  uploadGallery(movie) {

    this.uploader.options.authToken = 'Bearer ' + this.authenticationService.getToken()
    this.uploader.setOptions({url: `${this.apiServerUrl}/movies/${movie.id}/galleries`})
    this.uploader.uploadAll()

  }

  getPath(file) {
    return this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));
  }

  addMovie(form): void {
    console.log(form.value);

    if (form.valid && this.poster) {

      this._movieService.addMovie(form.value).subscribe(
        (response: Movie) => {
          this.isSavingMovie = true

          const imageFormData = new FormData();
          imageFormData.append('file', this.posterFile, this.posterFile.name);
          this._movieService.upload(response, imageFormData).subscribe()
          this.uploadGallery(response)

          this.removePoster()
          this.movieForm.resetForm()
          this.openSuccessDialog(response)
          this.isSavingMovie = false

        }
        ,
        (error: HttpErrorResponse) => {
          this.isSavingMovie = false
          console.log(error);
          this.openErrorDialog(error)
        }
      );
    }

  }

  openErrorDialog(error) {
    Swal.fire({
      title: 'Something went wrong!',
      text: error.message,
      icon: 'error',
      customClass: {
        confirmButton: 'btn btn-primary',
      }
    })
  }

  openSuccessDialog(movie) {
    Swal.fire({
      title: 'Successfully Added!',
      text: movie.title,
      icon: 'success',
      showCancelButton: false,
      customClass: {
        confirmButton: 'btn btn-primary',
      }
    }).then(function (result) {
      if (result.value) {
        this.router.navigate(['/dashboard/movies/list']);
      }
    });
  }


}
