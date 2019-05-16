import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpotifyService } from './spotify.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';


import { HeaderComponent } from './components/header/header.component';

import { PlaylistModule } from './module/playlist/playlist.module';
import { SharedModule } from './module/shared/shared.module';
import { SearchModule } from './module/search/search.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    PlaylistModule,
    SearchModule
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
