import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ListNewReleases: Array<any> = [];

  constructor(private spotifyS: SpotifyService,
              private router: Router ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spotifyS.getNewReleases()
      .subscribe( data => {
        this.ListNewReleases = data;
      });
  }

  viewArtista(item: any) {
    let artistaId;
    if ( item.type === 'artist' ) {
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }
    this.router.navigate([ '/artist', artistaId  ]);
  }

  img( item: any) {
    if ( !item ) { return 'assets/ad.jpg'; }
    if ( item.length > 0 ) { return item[0].url;
    } else { return 'assets/ad.jpg'; }
  }
}
