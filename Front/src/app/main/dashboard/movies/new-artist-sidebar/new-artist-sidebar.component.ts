import {HttpErrorResponse} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreSidebarService} from 'src/@core/components/core-sidebar/core-sidebar.service';
import {Artist} from 'src/app/interface/artist';
import {Nationality} from 'src/app/interface/nationality';
import {ArtistService} from 'src/app/service/artist.service';
import {NationalityService} from 'src/app/service/nationality.service';

@Component({
  selector: 'new-artist-sidebar',
  templateUrl: './new-artist-sidebar.component.html',
})
export class NewArtistSidebarComponent implements OnInit {
  @Input()
  public type;

  @Output() onArtistAdded = new EventEmitter<boolean>();

  public artist_types = [
    {name: 'Actor', value: 'ACTOR'},
    {name: 'Director', value: 'DIRECTOR'},
    {name: 'Writer', value: 'WRITER'},
  ];

  public nationalities;

  public dateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input',
    //defaultDate: ['1990-01-01'],
    allowInput: false,
    dateFormat: 'Y-n-d H:i:s.u',
    altFormat: 'F j, Y'
  };

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _nationalityService: NationalityService,
    private _artistService: ArtistService
  ) {
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  submit(form) {
    //form.value.dateOfBirth=form.value.dateOfBirth.toISOString()()

    form.value.dateOfBirth = form.value.dateOfBirth[0]
    console.log(form.value);

    if (form.valid) {
      this._artistService.add(form.value).subscribe(
        (response: Artist) => {
          this.onArtistAdded.emit(true);
          this.toggleSidebar('new-artist-sidebar');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getNationalities();
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

  addNewNationality = (tag) => {
    let nationality: Nationality = {title: tag};
    this._nationalityService.add(nationality).subscribe(
      () => {
        this.getNationalities();
        return tag;
      },
      () => {
        alert('Error adding the nationality');
        //this.getGenres();
      }
    );
  };
}
