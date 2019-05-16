import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { MzModalService } from 'ngx-materialize';
import { ModalPlaylistComponent } from '../modal-playlist/modal-playlist.component';
@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];

  show: Array<boolean> = [];
  constructor(private router: ActivatedRoute,
              private searchS: SearchService,
              private routerR: Router,
              private modalService: MzModalService) {

    this.router.params.subscribe( params => {

// tslint:disable-next-line: no-string-literal
      this.getArtista( params['id'] );
// tslint:disable-next-line: no-string-literal
      this.getTopTracks( params['id'] );

    });
  }
  ngOnInit() {
  }
  getArtista(id: string) {
    this.searchS.getArtista(id)
      .subscribe(a => {
        this.artista = a;
      });
  }
  getTopTracks(id: string) {
    this.searchS.getTopTracks(id)
      .subscribe(t => {
        this.topTracks = t;
      });
  }
  viewAlbums(item: any) {
    let artistaId;
    if ( item.type === 'artist' ) {
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }
    this.routerR.navigate([ '/albums', artistaId  ]);
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
  hidden(i: number): boolean {
    this.show[i] = !this.show[i];
    return this.show[i];
  }
  openServiceModal(id: string) {
    this.searchS.setTrack(id);
    this.modalService.open(ModalPlaylistComponent);
  }

}
