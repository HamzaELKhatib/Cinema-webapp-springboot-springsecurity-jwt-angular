import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, NgForm, SelectControlValueAccessor } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { FileUploadService } from "src/app/service/file-upload.service";
import { Projection } from "src/app/interface/projection";
import { Movie } from "src/app/interface/movie";
import { Hall } from "src/app/interface/hall";
import { ProjectionService } from "src/app/service/projection.service";
import { HallService } from "src/app/service/hall.service";
import { MovieService } from "src/app/service/movie.service";


@Component({
  selector: "app-projection-add",
  templateUrl: "./projection-add.component.html",
  styleUrls: ["./projection-add.component.scss"],
  encapsulation : ViewEncapsulation.None
})
export class ProjectionAddComponent implements OnInit {
  projection: Projection;
  movies : Movie[];
  halls : Hall[];
  movie : Movie;
  hall : Hall;
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public tempRow;
  private projectionService : ProjectionService;
  public movieService : MovieService;
  private hallService : HallService;
  private fileUploadService :FileUploadService;
  public selectedOption : string;
  registerForm : FormGroup;

  @ViewChild("projectionForm") projectionForm: NgForm;

  constructor(private router: Router,  private hallServ : HallService,private movieServ : MovieService, projectionServ :ProjectionService) {
    this.projectionService=projectionServ;
    this.hallService=hallServ;
    this.movieService=movieServ;
  }

  ngOnInit(): void {
   this.getAllHalls();
   this.getAllMovies();
  }

  resetFormWithDefaultValues() {
    this.projectionForm.resetForm(this.tempRow);
  }

//Gets all halls from database
public getAllHalls(): void {
  this.hallService.getAllHalls().subscribe(
    (response: Hall[]) => {
      this.halls = response;
      console.log(this.halls);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
//Gets all movies from database
public getAllMovies(): void {
  this.movieService.getAllMovies().subscribe(
    (response: Movie[]) => {
      this.movies = response;
      console.log(this.movies);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
//Function that triggers on form submit
public onAddProjection(proj : Projection): void {
  //Adds projection to database
  this.projectionService.addProjection(proj).subscribe(
    (response: Projection) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    
  );
 //Redirect to projection list after add is complete
this.router.navigate(['/dashboard/projections/list']);
}
}