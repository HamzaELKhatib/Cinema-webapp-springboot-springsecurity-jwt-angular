import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { Projection } from 'src/app/interface/projection';
import { ProjectionService } from 'src/app/service/projection.service';

@Component({
  selector: 'app-projection-search',
  templateUrl: './projection-search.component.html',
  styleUrls: ['./projection-search.component.css']
})
export class ProjectionSearchComponent implements OnInit {

  projections: Projection[] = [];
  filteredProjections: Projection[] = [];
  filteredTodayProjections: Projection[] = [];
  proj!: Projection;
  public DropdownVar : number =1;

  pickedDateValue! : string;
  minDatePicker! : string;
  pickedDateToday : number=1;

  todayDate!: string;

   today = new Date();
   tmr = new Date();




  constructor(private projectionService: ProjectionService,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllProjections();
    console.log(this.today.toLocaleString());
    this.minDatePicker = this.dateFormatter(this.today);
  }
  public getAllProjections(): void {
    this.projectionService.getAllProjections().subscribe(
      (response: Projection[]) => {
        this.projections = response;
        console.log(this.projections);
        //this.filteredMovies = this.movies;
        console.log(this.pickedDateToday);
        this.filteredProjections=this.projections;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getFilteredProjectionsByDate(nbr:number):void{

    //this.filteredProjections[0].startTime.setHours(0,0,0,0);
    //console.log(this.filteredProjections[0].startTime.toLocaleString());
    //this.getPureDates();
    //this.filteredProjections[0].startTime.setHours(0,0,0,0);
    //console.log(this.filteredProjections[0].startTime.toLocaleString());
    //for(let i=0; i<this.filteredProjections.length; i++)
    //{


      //if(    )
      //this.filteredTodayProjections[i]=this.filteredProjections[i];
    //}
    //console.log(this.today.toLocaleString());
    if (nbr == 1) {
      this.filteredProjections = this.projections.filter(x =>this.datepipe.transform(x.startTime) === this.datepipe.transform(new Date(this.today)));

    //this.filteredProjections = this.filteredProjections.filter(x => new Date(x.startTime.toLocaleDateString()) === this.today);

    }
    else if (nbr == 2){
      this.tmr.setDate(this.today.getDate() + 1);
      this.filteredProjections = this.projections.filter(x =>this.datepipe.transform(x.startTime) === this.datepipe.transform(new Date(this.tmr)));

    }
    else{
      console.log(this.pickedDateValue);
      this.filteredProjections = this.projections.filter(x =>this.datepipe.transform(x.startTime) === this.datepipe.transform(new Date(this.pickedDateValue)));
    }
    //this.filteredProjections = this.projections.filter(x => x.startTime.getDate.(genreValue.toLocaleLowerCase()));

  }
  dateFormatter(date : Date) : string{

   var dd = String(date.getDate()).padStart(2, '0');
   var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();


    //var dd = date.substring(0,4);
    //var mm = date.substring(5,7); //January is 0!
    //var yyyy = date.substring(8,10);
    return yyyy + '-' + mm + '-' + dd;
  }

}
