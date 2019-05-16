import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { SearchComponent } from './searchComponent/search.component';
import { ArtistaComponent } from './artista/artista.component';
import { AlbumsComponent } from './albums/albums.component';
import { PlaylistComponent } from './playlist/playlist.component';

import { SearchService } from './search.service';
import { ModalPlaylistComponent } from './modal-playlist/modal-playlist.component';
import {PlayerComponent} from "../../components/shared/player/player.component";

@NgModule({
  declarations: [
    SearchComponent,
    ArtistaComponent,
    AlbumsComponent,
    PlaylistComponent,
    ModalPlaylistComponent,
    PlayerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [SearchService],
  exports: [
    SearchComponent,
    ArtistaComponent,
    AlbumsComponent,
    PlaylistComponent
  ],
  entryComponents: [ModalPlaylistComponent]
})
export class SearchModule { }
