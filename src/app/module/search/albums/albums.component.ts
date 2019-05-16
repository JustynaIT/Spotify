import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import { SearchService } from '../search.service';
import { PlaylistService } from '../../playlist/playlist.service';
import { MzModalService } from 'ngx-materialize';
import { ModalPlaylistComponent } from '../modal-playlist/modal-playlist.component';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  artista: any = {};
  albums: any;
  ListTracks: any = [];
  show: Array<boolean> = [];
  urlSafe: SafeResourceUrl;
  urlSafe2: SafeResourceUrl;
  trackActive: string;
  albumFirst: string;
  isClicked = false;

  id: string;

  constructor(private router: ActivatedRoute,
              private searchS: SearchService,
              public sanitizer: DomSanitizer,
              private playlistS: PlaylistService,
              private modalService: MzModalService) {

    this.router.params.subscribe( params => {

// tslint:disable-next-line: no-string-literal
      this.getData( params['id'] );
// tslint:disable-next-line: no-string-literal
      this.getArtista( params['id'] );
    });
   }

  ngOnInit() {
    this.trackActive = this.albumFirst;
    console.log(this.albumFirst);
  }
  url2() {
    const linkAudio = 'https://open.spotify.com/embed/album/' + this.trackActive;
    this.urlSafe2 = this.sanitizer.bypassSecurityTrustResourceUrl(linkAudio);
    return this.urlSafe2;
  }
  url(id: string) {
    const linkAudio = 'https://open.spotify.com/embed/album/' + id;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(linkAudio);
    return this.urlSafe;
  }
  play( id: string) {
    this.trackActive = id;
    this.isClicked = true;
  }
  hidden(i: number): boolean {
    console.log(this.show[i]);
    this.show[i] = !this.show[i];
    console.log(this.show[i]);
    return this.show[i];
  }
  getArtista(id: string) {
    this.searchS.getArtista(id)
      .subscribe(a => {
        this.artista = a;
      });
  }
  getData(id: string) {
    this.searchS.getAlbums(id)
      .subscribe(a => {
        this.albums = a;
        this.albumFirst = this.albums[0].id;
        for (const album of this.albums) {
          this.searchS.getAlbumTracks(album.id)
            .subscribe( t => {
              this.ListTracks.push(t);
            });
        }
        console.log(this.ListTracks);
      });

  }
  close() {
    this.isClicked = false;
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

  openServiceModal(id: string) {
    this.searchS.setTrack(id);
    this.modalService.open(ModalPlaylistComponent);
  }

}
