import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/interface/artist';
import { ArtistService } from 'src/app/service/artist.service';

@Component({
  selector: 'app-actor-search',
  templateUrl: './actor-search.component.html',
  styleUrls: ['./actor-search.component.css']
})
export class ActorSearchComponent implements OnInit {
  actors!: Artist[];
  filteredActors!: Artist[];
  public filterText!: string;
  constructor(private actorService: ArtistService) { }

  ngOnInit(): void {
    this.getAllActors();
  }
  public getAllActors(): void {
    this.actorService.getAllActors().subscribe(
      (response: Artist[]) => {
        this.actors = response;
        console.log(this.actors);
        this.filteredActors = this.actors;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    }
    public getFilteredActors(){
      if (!this.filterText || this.filterText.length === 0) {
        this.filteredActors = this.actors;
      }
      this.filteredActors = this.actors.filter(x => x.firstName.toLocaleLowerCase().includes(this.filterText) || x.lastName.toLocaleLowerCase().includes(this.filterText));
      return this.filteredActors;
    }

}
