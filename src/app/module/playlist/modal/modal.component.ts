import { Component, OnInit } from '@angular/core';
import { MzBaseModal, MzModalComponent, MzToastService } from 'ngx-materialize';
import { PlaylistService } from '../playlist.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends MzBaseModal {

  name: string;
  constructor(private playlistS: PlaylistService, private routerR: Router, private toastService: MzToastService) {
    super();
  }
  submit() {
    this.playlistS.createPlaylist(this.name).subscribe(res => {
    });
    this.toastService.show('Added playlist! Search for tracks to playlists. ', 6000, 'green');
    this.routerR.navigate(['search']);
  }
}
