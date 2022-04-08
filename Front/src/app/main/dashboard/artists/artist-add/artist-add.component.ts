import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormGroup, NgForm, SelectControlValueAccessor } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { FileUploader } from "ng2-file-upload";
import { Artist } from "src/app/interface/artist";
import { ArtistService } from "src/app/service/artist.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NationalityService } from "src/app/service/nationality.service";
import { Nationality } from "src/app/interface/nationality";
import { FileUploadService } from "src/app/service/file-upload.service";
import { ArtistListComponent } from "../artist-list/artist-list.component";


@Component({
  selector: "app-artist-add",
  templateUrl: "./artist-add.component.html",
  styleUrls: ["./artist-add.component.scss"],
  encapsulation : ViewEncapsulation.None
})
export class ArtistAddComponent implements OnInit {
  artist: Artist;
  public tempRow;
  private artistService : ArtistService;
  public nationalities : Nationality[];
  private nationalityService : NationalityService;
  private fileUploadService :FileUploadService;
  private nationality : Nationality;
  public selectedOption : string;
  public imagePath : string;
  public picUrl : string| ArrayBuffer;
  fileToUpload: File | null = null;
  fileName : string;
  registerForm : FormGroup;
 
  @ViewChild("artistForm") artistForm: NgForm;

  constructor(private router: Router,  private natioServ : NationalityService,private artiServ : ArtistService,fileUploadServ :FileUploadService) {
    this.nationalityService=natioServ;
    this.artistService=artiServ;
    this.fileUploadService=fileUploadServ;
  }

  ngOnInit(): void {
    //Fill Nationality select box with data
   this.getAllNationalities();
  }

  resetFormWithDefaultValues() {
    this.artistForm.resetForm(this.tempRow);
  }

//Gets all nationalities
public getAllNationalities(): void {
  this.nationalityService.getAll().subscribe(
    (response: Nationality[]) => {
      this.nationalities = response;
      console.log(this.nationalities);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
//Function that triggers on form submit
public onAddArtist(arti : Artist): void {
  //Adds artist to database
  this.artistService.add(arti).subscribe(
    (response: Artist) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    
  );
  //Add artist picture(if any) to local storage with artist id
  if(this.fileName!=null && this.fileName!="")
  this.fileUploadService.addImage(String(this.picUrl)).subscribe(
    (response: string) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
);
//Redirect to artist list after add is complete
this.router.navigate(['/dashboard/artists/list']);
}

//Changes display of picture and gets file info
onFileChanged(event) {
  const files = event.target.files;
  document.getElementById("labelPic").hidden=true;
  console.log( document.getElementById("labelPic").innerHTML);
  if (files.length === 0)
      return;

  const mimeType = files[0].type;
  if (mimeType.match(/image\/*/) == null) {
      return;
  }

  const reader = new FileReader();
  this.imagePath = files;
  reader.readAsDataURL(files[0]); 
  reader.onload = (_event) => { 
      this.picUrl = reader.result;
      this.fileName = files[0].name;
  }
}
}