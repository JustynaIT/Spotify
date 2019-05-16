import { Injectable } from '@angular/core';
import { SpotifyService } from 'src/app/spotify.service';
import { map, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  track: string;
  constructor(private spotifyS: SpotifyService) { }

  searchArtist(str: string) {
    const url = 'search?q=' + str + '&type=artist&market=US&limit=10';
    return this.spotifyS.getQuery(url).pipe(
// tslint:disable-next-line: no-string-literal
      map(data => data['artists'].items),
    );
  }
  searchTrack(str: string) {

    const url = 'search?q=' + str + '&type=track&market=US&limit=10';
    return this.spotifyS.getQuery(url).pipe(
// tslint:disable-next-line: no-string-literal
      map(data => data['tracks'].items)
    );
  }
  searchPlaylists(str: string) {
    const url = 'search?q=' + str + '&type=playlist&market=US&limit=10';
    return this.spotifyS.getQuery(url).pipe(
// tslint:disable-next-line: no-string-literal
      map(data => data['playlists'].items)
    );
  }


  getArtista(id: string) {
    const url = 'artists/' + id;
    return this.spotifyS.getQuery(url);
  }
  getTopTracks(id: string) {
    const url = 'artists/' + id + '/top-tracks?country=us';
    return this.spotifyS.getQuery(url).pipe(
// tslint:disable-next-line: no-string-literal
     map( data => data['tracks'])
   );
  }
  getAlbums(id: string) {
    const url = 'artists/' + id + '/albums';
    return this.spotifyS.getQuery(url).pipe(
// tslint:disable-next-line: no-string-literal
      map(data => data['items'])
    );
  }
  getAlbumTracks(id: string) {
    const url = 'albums/' + id + '/tracks';
    return this.spotifyS.getQuery(url).pipe(
// tslint:disable-next-line: no-string-literal
      map(data => data['items'])
    );
  }
  getAudio(id: string) {
    const url = 'audio-features/' + id;
    return this.spotifyS.getQuery(url);
  }

  getPlaylist(id: string) {
    const url = 'playlists/' + id;
    return this.spotifyS.getQuery(url);
  }
  deleteTrack(id: string, trackID: string) {
    const url = id + '/tracks?';
    const track = '{"tracks": [{ "uri": "' + trackID + '" }] }';
    return this.spotifyS.requestQueryD(url, track);
  }

  getTrack() {
    return this.track;
  }

  setTrack(newTrack: string) {
    this.track = newTrack;
  }
}
