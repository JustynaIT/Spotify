import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/spotify.service';
import { MzModalService } from 'ngx-materialize';
import { ModalComponent } from '../modal/modal.component';
import { PlaylistService } from '../playlist.service';
import { Router } from '@angular/router';


import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { Location } from '@angular/common';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlists: any;

  constructor(private playlistS: PlaylistService, private modalService: MzModalService, private routerR: Router,
              private location: Location) { }
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.playlistS.getPlaylists()
      .subscribe( res => {
        this.playlists = res;
      });

  }
  delete(id: string) {
    if (window.confirm('Are you sure you want to delete the playlist?')) {
      this.playlistS.deletePlaylist(id).subscribe(
        res => {
        });
      this.playlists = this.playlists.filter(e => e.id !== id);
    }
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
  openServiceModal() {
    this.modalService.open(ModalComponent);
  }
}
