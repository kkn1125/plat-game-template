import { makeAutoObservable } from "mobx";

export class AudioManager {
  tracks: Map<string, HTMLAudioElement> = new Map();
  currentTrack: HTMLAudioElement | null = null;
  isPlaying: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadTracks();
  }

  loadTracks() {
    const audio = new Audio();
    audio.src = "/plat-game-template/bgm/plat-game-main-bgm.wav";
    audio.loop = true;
    audio.volume = 0.35;
    // 미리 로딩
    audio.preload = "auto";
    audio.load(); // 명시적 로드
    this.tracks.set("main-bgm", audio);
  }

  playCurrentTrack() {
    const currentTrack = this.tracks.get("main-bgm");
    if (currentTrack) {
      this.currentTrack = currentTrack;
      currentTrack.play();
      this.isPlaying = true;
    }
  }

  pauseTrack() {
    if (this.currentTrack) {
      this.currentTrack.pause();
      this.isPlaying = false;
    }
  }
}
