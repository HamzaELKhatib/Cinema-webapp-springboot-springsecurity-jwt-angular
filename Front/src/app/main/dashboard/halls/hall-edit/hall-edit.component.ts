import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, NgForm, SelectControlValueAccessor } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import { Artist } from "src/app/interface/artist";
import { ArtistService } from "src/app/service/artist.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NationalityService } from "src/app/service/nationality.service";
import { Nationality } from "src/app/interface/nationality";
import { FileUploadService } from "src/app/service/file-upload.service";
import { Hall } from "src/app/interface/hall";
import { HallService } from "src/app/service/hall.service";

@Component({
  selector: "app-hall-edit",
  templateUrl: "./hall-edit.component.html",
  styleUrls: ["./hall-edit.component.scss"],
  encapsulation : ViewEncapsulation.None
})
export class HallEditComponent implements OnInit {
  hall: Hall;
  public urlLastValue;
  public rows;
  public currentRow;
  public tempRow;
  public moviePoster: string;
  public nationalities : Nationality[];
  private hallServ : HallService;
  private fileUploadService :FileUploadService;
  private nationality : Nationality;
  public selectedOption : string;
  public imagePath : string;
  public picUrl : string| ArrayBuffer;
  fileToUpload: File | null = null;
  fileName : string;
  registerForm : FormGroup;
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  @ViewChild("hallForm") hallForm: NgForm;

  constructor(private route: ActivatedRoute,private router: Router,private hallService : HallService) {
    this.hallServ=hallService;
  }

  ngOnInit(): void {
    //Load current hall data
    this.getCurrentHall();
  }

 //Function that triggers on form submit 
public onEditHall(hall : Hall): void {
  var id = this.route.snapshot.paramMap.get('id');
  var idHall =  + id;
  //Replaces old  hall data with new one in database
  this.hallServ.updateHall(idHall,hall).subscribe(
    (response: Hall) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    
  );
 //Redirect to hall list after edit is complete
  this.router.navigate(['/dashboard/halls/list']);
}

//Get current hall data
getCurrentHall(): void {
  const id = this.route.snapshot.paramMap.get('id');
  this.hallServ.getHallById(Number(id)).subscribe(hall => this.hall = hall);
}
}