import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, NgForm, SelectControlValueAccessor } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { NationalityService } from "src/app/service/nationality.service";
import { Nationality } from "src/app/interface/nationality";
import { FileUploadService } from "src/app/service/file-upload.service";
import { Hall } from "src/app/interface/hall";
import { HallService } from "src/app/service/hall.service";

@Component({
  selector: "app-hall-add",
  templateUrl: "./hall-add.component.html",
  styleUrls: ["./hall-add.component.scss"],
  encapsulation : ViewEncapsulation.None
})
export class HallAddComponent implements OnInit {
  hall: Hall;
  public tempRow;
  private hallServ : HallService;
  registerForm : FormGroup;

  @ViewChild("hallForm") hallForm: NgForm;

  constructor(private router: Router,private hallService : HallService) {
    this.hallServ=hallService;
  }

  ngOnInit(): void {

  }

//Function that triggers on form submit
public onAddHall(hall : Hall): void {
    //Add artist to database
  this.hallServ.addHall(hall).subscribe(
    (response: Hall) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
 //Redirect to hall list after add is complete
this.router.navigate(['/dashboard/halls/list']);
}

}