import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { SpotifyService } from 'src/app/spotify.service';
import { PlaylistService } from '../../playlist/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  playlists: any;
  idUsers: string;
  idNew: string;
  idPlaylist: string;
  constructor(private router: ActivatedRoute,
              private searchS: SearchService,
              private spotifyS: SpotifyService) {

    this.router.params.subscribe( params => {
// tslint:disable-next-line: no-string-literal
      this.getData( params['id'] );
// tslint:disable-next-line: no-string-literal
      this.idPlaylist = params['id'];
    });
  }
  ngOnInit() {
    this.spotifyS.getUser()
      .subscribe(res => {
        this.idUsers = res;
      });
  }
  getData(id: string) {
    this.searchS.getPlaylist(id)
      .subscribe( res => {
        this.playlists = res;
        this.idNew = this.playlists.owner.id;
      });
  }
  removeTrack(playlistID: string, trackID: string) {
    if (window.confirm('Are you sure you want to delete the track?')) {
      this.searchS.deleteTrack(playlistID, trackID).subscribe(res => {});
      let cos = this.playlists.tracks.items;
      cos = cos.filter(e => e.track.uri !== trackID);
      this.playlists.tracks.items = cos;
    }
  }
  cos( item: any) {
    if ( !item ) {
      return 'assets/ad.jpg';
    }
    if ( item.length > 0 ) {
      return item[0].url;
    } else {
      return 'assets/ad.jpg';
    }
  }
}
