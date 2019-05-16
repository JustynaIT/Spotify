import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

// tslint:disable-next-line: max-line-length
  private accessToken = 'BQB6ySGOesDZ0iMnhBFK3x6pjImHh-zqlWuMSBzwFYLoe1DWgWrgA1XLrkJkKcXH16TOEGOo972MBSymfnfOlXJvyYRY4I4nhfUn2ovGt7u9UksGjiso-4Uv1TmyNO2VVs9rFTM7njmQRkiesRaQT_sh9y4OhnTvwbVzbd9FNUZpBXAs6sYNYAGueWlzqC3-9N514sI3jfsVDSxs2xKX00VLv9olzZ2qG8If7E2TCYtHgW4';

  getQuery(query: string) {
    const url = 'https://api.spotify.com/v1/' + query;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);

    return this.http.get(url, {headers});
  }

  postQuery(query: string, par) {
    const url = 'https://api.spotify.com/v1/' + query;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    headers.set('Accept', 'application/json');
    return this.http.post(url, par, {headers});
  }

  requestQueryD(query: string, track: string) {
    const url = 'https://api.spotify.com/v1/playlists/' + query;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    headers.set('Accept', 'application/json');
    return this.http.request('delete', url, {body: track, headers});

  }

   /** DELETE PLAYLIST nie można usunąć playlisty można ją tylko przestać obserwoać */
  deleteQuery(query: string) {
    const url = 'https://api.spotify.com/v1/' + query;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    headers.set('Accept', 'application/json');
    console.log('hello');
    return this.http.delete(url, {headers});

  }

  getUser() {
    const url = 'me';
    return this.getQuery(url)
      .pipe(
// tslint:disable-next-line: no-string-literal
        map(data => data['id'])
      );
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=12')
      .pipe(
// tslint:disable-next-line: no-string-literal
        map(data => data['albums'].items)
      );
  }

}
