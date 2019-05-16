import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SpotifyService } from 'src/app/spotify.service';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  id: string;
  constructor(private spotifyS: SpotifyService) { }

  getPlaylists() {
    const url = 'me/playlists';
    return this.spotifyS.getQuery(url).pipe(
      // tslint:disable-next-line: no-string-literal
            map(data => data['items']));
  }

  createPlaylist(name: string) {
    this.spotifyS.getUser().subscribe(res => {
// tslint:disable-next-line: no-string-literal
      this.id = res;
      console.log(this.id);
    });
    const url = 'users/' + 'jlfv172g0vvm5ejsri9o5emf1' + '/playlists';
    const pra = '{"name": "' + name + '"}';
    return this.spotifyS.postQuery(url, pra);
  }
  deletePlaylist(id: string) {
    const url = 'playlists/' + id + '/followers';
    return this.spotifyS.deleteQuery(url);
  }

  addTrackPlaylist(id: string, track: string) {
    const url = 'playlists/' + id + '/tracks';
    const pra = '{"uris":["' + track + '"]}';
    return this.spotifyS.postQuery(url, pra);
  }
}
