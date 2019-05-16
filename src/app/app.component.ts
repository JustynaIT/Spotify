import { Component } from '@angular/core';
import { SpotifyService } from './spotify.service';
import { Artist } from './artist';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project Spotify';

  constructor() {

  }
}
