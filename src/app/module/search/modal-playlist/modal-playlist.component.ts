import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistService } from '../../playlist/playlist.service';
import { MzBaseModal, MzModalService, MzToastService } from 'ngx-materialize';
import { SearchService } from '../search.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-playlist',
  templateUrl: './modal-playlist.component.html',
  styleUrls: ['./modal-playlist.component.css']
})
export class ModalPlaylistComponent extends MzBaseModal {

  playlists: any;
  constructor(private playlistS: PlaylistService,
              private searchS: SearchService,
              private toastService: MzToastService) {
    super();
    this.getData();
  }

  getData() {
    this.playlistS.getPlaylists()
      .subscribe( res => {
        this.playlists = res;
        console.log(res);
      });
  }
  img( item: any) {
    if ( !item ) {
      return 'assets/ad.jpg';
    }
    if ( item.length > 0 ) {
      return item[0].url;
    } else {
      return 'assets/ad.jpg';
    }
  }
  addTrack(id: string) {
    const track = this.searchS.getTrack();
    this.playlistS.addTrackPlaylist(id, track)
     .subscribe(res => {
     });

    this.toastService.show('Added to playlist!', 4000, 'green');
  }
}
