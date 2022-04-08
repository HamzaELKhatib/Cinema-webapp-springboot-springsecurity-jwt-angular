import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from 'src/app/interface/artist';
import { ArtistService } from 'src/app/service/artist.service';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.css']
})
export class ActorDetailComponent implements OnInit {
  artist!: Artist;

  constructor(private route: ActivatedRoute,private artistService: ArtistService) { }

  ngOnInit(): void {
    this.getArtist();
  }

  getArtist(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.artistService.getArtistById(Number(id)).subscribe(artist => this.artist = artist);
  }
}
