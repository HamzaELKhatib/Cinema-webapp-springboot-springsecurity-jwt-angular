import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from 'src/app/interface/artist';
import { Nationality } from 'src/app/interface/nationality';
import { NationalityService } from 'src/app/service/nationality.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { FormControl, NgForm } from '@angular/forms';
import { ArtistService } from 'src/app/service/artist.service';
import { FileUploadService } from 'src/app/service/file-upload.service';

@Component({
  selector: 'app-artist-edit',
  templateUrl: './artist-edit.component.html',
  styleUrls: ['./artist-edit.component.scss']
})
export class ArtistEditComponent implements OnInit,AfterViewInit {

  //public url = this.router.url;
  public tempRow;
  private artistService : ArtistService;
  public nationalities : Nationality[];
  private nationalityService : NationalityService;
  private fileUploadService :FileUploadService;
  private nationality : Nationality;
  public selectedOption : Nationality;
  public imagePath : string;
  public picUrl : string| ArrayBuffer;
  fileToUpload: File | null = null;
  fileName : string;
  ///////////////
  artist: Artist;
  formattedDate : string;

  @ViewChild("artistForm") artistForm: NgForm;

  constructor( private route: ActivatedRoute, private natioServ : NationalityService,private artiServ : ArtistService,fileUploadServ :FileUploadService) {
    this.nationalityService=natioServ;
    this.artistService=artiServ;
    this.fileUploadService=fileUploadServ;
  }
  ngAfterViewInit(): void {
    this.formattedDate = this.dateFormatter(new Date(this.artist.dateOfBirth));
    this.selectedOption = this.artist.nationality;
  }

  ngOnInit(): void {
     //Fill Nationality select box with data, load current artist's data
    this.getAllNationalities();
    this.getCurrentArtist();
    this.selectedOption = this.artist.nationality;

  }
  resetFormWithDefaultValues() {
    this.artistForm.resetForm(this.tempRow);
  }


//Gets current artist's data
  getCurrentArtist(){
    const id = this.route.snapshot.paramMap.get('id');
    this.artistService.getArtistById(Number(id)).subscribe(artist => this.artist = artist);
  }
  dateFormatter(date : Date) : string{

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
     var yyyy = date.getFullYear();

     return yyyy + '-' + mm + '-' + dd;
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
public onEditArtist(arti : Artist): void {
  //Replaces old  artist data with new one in database
  var id = this.route.snapshot.paramMap.get('id');
  var idArti =  + id;
  this.artistService.updateArtist(idArti,arti).subscribe(
    (response: Artist) => {
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );

  //currently not functional
  if(this.fileName!=null && this.fileName!="")
  this.fileUploadService.addImage(String(this.picUrl)).subscribe(
    (response: string) => {
      console.log(response);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
    );
}

 //currently not functional
onFileChanged(event) {
  const files = event.target.files;
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
      this.picUrl = reader.result;1
      this.fileName = files[0].name;
  }
}
}
