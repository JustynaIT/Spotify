import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';
import { MzModalService } from 'ngx-materialize';
import { ModalPlaylistComponent } from '../modal-playlist/modal-playlist.component';
import { delay, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchStr: string;
  searchRes: any[];
  searchResT: any[];
  searchResP: any[];
  selected = 'Artist';

  constructor(private searchS: SearchService, private router: Router,
              private modalService: MzModalService) { }

  ngOnInit() {
  }

  search() {
    if (this.searchStr !== '' && this.searchStr !== undefined && this.selected === 'Artist') {
      this.searchS.searchArtist(this.searchStr)
      .subscribe(res => {
        this.searchRes = res;
      });
    } else if (this.searchStr !== '' && this.searchStr !== undefined && this.selected === 'Track') {
      this.searchS.searchTrack(this.searchStr)
      .subscribe(res => {
        this.searchResT = res;
      });
    } else if (this.searchStr !== '' && this.searchStr !== undefined && this.selected === 'Playlist') {
      this.searchS.searchPlaylists(this.searchStr)
      .subscribe(res => {
        this.searchResP = res;
      });
    } else {
      this.searchRes = null;
      this.searchResT = null;
      this.searchResP = null;
    }
  }

  viewArtista(item: any) {
    let artistaId;
    if ( item.type === 'artist' ) {
      artistaId = item.id;
    } else {
      artistaId = item.artists[0].id;
    }
    this.router.navigate([ '/artist', artistaId  ]);
  }

  viewPlaylist(id: string) {
    this.router.navigate([ '/playlist', id  ]);
  }

  selectChanged(event) {
    this.selected = event.target.value;
    this.searchRes = null;
    this.searchResT = null;
    this.searchResP = null;
    this.search();
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
  openServiceModal(id: string) {
    this.searchS.setTrack(id);
    this.modalService.open(ModalPlaylistComponent);
  }
}
