import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  private static current: any = null;
  @Input() private track: any;
  private time: string = '00:00';
  private duration: string = '00:00';
  public interval: number;
  public audio: HTMLAudioElement = new Audio();
  public playing: boolean = false;
  public loaded: boolean = false;

  ngOnInit() {
    this.audio.addEventListener('canplaythrough', () => {
      this.duration = this.getTime(this.audio.duration);
      this.loaded = true;
      this.audio.addEventListener('ended', () => {
        this.playing = false;
        clearInterval(this.interval);
      }, false);
    }, false);

    if ('preview_url' in this.track) {
      this.audio.src = this.track.preview_url;
    }
  }

  play() {
    this.audio.play();
    this.playing = true;
    this.interval = setInterval(() => {
      this.time = this.getTime(this.audio.currentTime);
    }, 1000);
  }

  pause() {
    this.audio.pause();
    this.playing = false;
    clearInterval(this.interval);
  }

  toggle() {
    if (this.loaded) {
      if (PlayerComponent.current) {
        if (PlayerComponent.current.track.id !== this.track.id) {
          PlayerComponent.current.audio.pause();
          PlayerComponent.current.playing = false;
        }
      }

      PlayerComponent.current = this;

      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  getTime(time: number): string {
    let s = Math.round(time);
    const m = Math.floor(s / 60);
    s -= (m * 60);
    let M: string = m.toString();
    let S: string = s.toString();
    if (m < 10) {
      M = '0' + M;
    }
    if (s < 10) {
      S = '0' + S;
    }
    return `${M}:${S}`;
  }

}
