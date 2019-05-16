import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/module/shared/shared.module';

import { PlaylistsComponent } from 'src/app/module/playlist/playlists/playlists.component';
import { ModalComponent } from './modal/modal.component';

import { PlaylistService } from './playlist.service';

@NgModule({
  declarations: [
    PlaylistsComponent,
    ModalComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [PlaylistService],
  exports: [PlaylistsComponent],
  entryComponents: [ModalComponent]
})
export class PlaylistModule { }
