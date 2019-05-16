import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './module/search/searchComponent/search.component';
import { ArtistaComponent } from './module/search/artista/artista.component';
import { AlbumsComponent } from './module/search/albums/albums.component';
import { PlaylistComponent } from './module/search/playlist/playlist.component';
import { PlaylistsComponent } from './module/playlist/playlists/playlists.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'search',
  component: SearchComponent
},
{
  path: 'artist/:id',
  component: ArtistaComponent
},
{
  path: 'albums/:id',
  component: AlbumsComponent
},
{
  path: 'playlist/:id',
  component: PlaylistComponent
},
{
  path: 'playlists',
  component: PlaylistsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
