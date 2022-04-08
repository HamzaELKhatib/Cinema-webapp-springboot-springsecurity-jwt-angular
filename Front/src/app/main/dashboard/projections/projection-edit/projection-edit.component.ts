import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Movie } from 'src/app/interface/movie';
import { Projection } from 'src/app/interface/projection';
import { Hall } from 'src/app/interface/hall';
import { ProjectionService } from 'src/app/service/projection.service';
import { MovieService } from 'src/app/service/movie.service';
import { HallService } from 'src/app/service/hall.service';

@Component({
  selector: 'app-projection-edit',
  templateUrl: './projection-edit.component.html',
  styleUrls: ['./projection-edit.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class ProjectionEditComponent implements OnInit {
  
  projection: Projection;
  movies : Movie[];
  halls : Hall[];
  movie : Movie;
  hall : Hall;
 
  public tempRow;
  private projectionService : ProjectionService;
  public movieService : MovieService;
  private hallService : HallService;
  public selectedOption : string;
  registerForm : FormGroup;
  projHall : Hall;

  @ViewChild("projectionForm") projectionForm: NgForm;

  constructor(private router: Router,private route: ActivatedRoute,  private hallServ : HallService,private movieServ : MovieService, projectionServ :ProjectionService) {
    this.projectionService=projectionServ;
    this.hallService=hallServ;
    this.movieService=movieServ;
  }

  ngOnInit(): void {
   this.getAllHalls();
   this.getAllMovies();
   this.getCurrentProjection();
  }

  resetFormWithDefaultValues() {
    this.projectionForm.resetForm(this.tempRow);
  }


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
getCurrentProjection(){
  const id = this.route.snapshot.paramMap.get('id');
  this.projectionService.getProjectionById(Number(id)).subscribe(projection => this.projection = projection);
}
public onEditProjection(proj : Projection): void {
  var id = this.route.snapshot.paramMap.get('id');
  var idProj =  + id;
  this.projectionService.updateProjection(idProj,proj).subscribe(
    (response: Projection) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    
  );
 
this.router.navigate(['/dashboard/projections/list']);
}
}
