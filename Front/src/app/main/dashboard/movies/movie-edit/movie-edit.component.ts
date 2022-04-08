import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Genre} from "../../../../interface/genre";
import {Nationality} from "../../../../interface/nationality";
import {Router} from "@angular/router";
import {CoreSidebarService} from "../../../../../@core/components/core-sidebar/core-sidebar.service";
import {MovieService} from "../../../../service/movie.service";
import {ArtistService} from "../../../../service/artist.service";
import {NationalityService} from "../../../../service/nationality.service";
import {MovieGenreService} from "../../../../service/moviegenre.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Artist} from "../../../../interface/artist";
import {Movie} from "../../../../interface/movie";
import {cloneDeep} from 'lodash';
import Swal from "sweetalert2";

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class MovieEditComponent implements OnInit {
  public url = this.route.url;
  public urlLastValue;

  public currentMovie;
  public tempMovie;

  public allArtists;
  public actors;
  public directors;
  public writers;
  public newArtistType;
  public selectBasicLoading = false;
  @ViewChild('movieForm') movieForm: NgForm;
  public genres: Genre[];
  public nationalities: Nationality[];
  public posterFile: File;
  public poster: string | ArrayBuffer;


  public contentHeader: object;

  constructor(
    private route: Router,
    private _coreSidebarService: CoreSidebarService,
    private _movieService: MovieService,
    private _artistsService: ArtistService,
    private _nationalityService: NationalityService,
    private _genresService: MovieGenreService
  ) {
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }


  ngOnInit(): void {
    this._movieService.getMovieById(this.urlLastValue).subscribe(
      (response) => {
        response.director.fullName = response.director.firstName + ' ' + response.director.lastName
        response.writer.fullName = response.writer.firstName + ' ' + response.writer.lastName
        response.actors.map(actor => actor.fullName = actor.firstName + ' ' + actor.lastName)


        this._movieService.getPoster(response.poster).subscribe(
          posterResponse => {
            this.createImageFromBlob(posterResponse)
            this.posterFile = this.blobToFile(posterResponse, response.id.toString())
          }
        )


        this.currentMovie = response
        this.tempMovie = cloneDeep(response)

        this.contentHeader = {
          headerTitle: 'Edit Movie',
          actionButton: true,
          breadcrumb: {
            type: '',
            links: [
              {
                name: 'Dashboard',
                isLink: true,
                link: '/dashboard'
              },
              {
                name: 'Movies',
                isLink: true,
                link: '/dashboard/movies/list'
              },
              {
                name: 'Edit',
                isLink: false
              }
            ]
          }
        };

      }
    )


    this.getAllArtists();
    this.getNationalities();
    this.getGenres();
    // this.uploader.onCompleteAll = () => alert('File uploaded to :' + this.uploader.options.url + '\n' + this.uploader.authToken);
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.poster = reader.result;


    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return <File>theBlob;
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
        this.selectBasicLoading = true;
        response.map((artist: any) => {
          artist.fullName = artist.firstName + ' ' + artist.lastName;
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
        this.selectBasicLoading = false;

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
    this.currentMovie.poster = null
    this.poster = null
    this.posterFile = null
  }

  saveMovie(form): void {
    console.log(form.value);

    if (form.valid && this.poster) {


      this._movieService.updateMovie(this.currentMovie).subscribe(
        (response: Movie) => {

          const imageFormData = new FormData();
          imageFormData.append('file', this.posterFile, this.posterFile.name);
          this._movieService.upload(response, imageFormData).subscribe()

          this.openSuccessDialog(response)

        }
        ,
        (error: HttpErrorResponse) => {
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
      title: 'Successfully Saved!',
      text: movie.title,
      icon: 'success',
      showCancelButton: false,
      customClass: {
        confirmButton: 'btn btn-primary',
      }
    })

  }
}
