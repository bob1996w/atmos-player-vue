<template>
  <div class="container border border-white rounded">
    <div class="progress m-2">
      <!-- TODO: change progressbar to slider with left & right elapse time display-->
      <div class="progress-bar bg-warning" role="progressbar" style="width: 26%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="row m-0">
      <div class="btn-group m-0 p-0" role="controlGroupA">
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-fast-backward"></i></a>
        <a class="btn btn-warning btn-lg" @click="toggleMusicPause()">
          <template v-if="isPlaying">
            <i class="fas fa-pause"></i>
          </template>
          <template v-else>
            <i class="fas fa-play"></i>
          </template>
        </a>
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-fast-forward"></i></a>
      </div>
      <div class="col m-0 p-1">
        <div class="song-title turncate-strings">{{ songTitle }}</div>
        <div class="song-sub turncate-strings">{{ getSubInfoString }}</div>
      </div>
      <div class="btn-group m-0 p-0" role="controlGroupB">
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-random"></i></a>
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-undo"></i></a>
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-volume-up"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/soundmanager2/script/soundmanager2.js'
const fs = require('fs')

export default {
  name: "player-control",
  data: function() {
    return {
      playingSound: {},
      playingObjectURL: "",
      isPlaying: false,
      isMusicLoaded: false,
      repeat: true,
      shuffle: true,
      songTitle: "A song never sung",
      songArtist: "Nobody",
      songAlbum: "Just no one knows this album"
    }
  },
  computed: {
    getSubInfoString() {
      return this.songArtist + " - " + this.songAlbum;
    }
  },
  mounted: function() {
    // soundmanager2
    soundManager.setup({
      url: '../../assets/soundmanager2/swf/',
      onready: function() {
        console.log("Sound Manager startup")
        // use this.$soundManager to access soundmanager object
      },
      ontimeout: function() {
        console.log("Sound Manager failed")
      }
    })

    this.$electron.ipcRenderer.on('play-music-dispatch', function (event, data) {
      console.log(data);
      if (this.isMusicLoaded){
        this.playingSound.stop();
        this.playingSound.destruct();
        (window.URL || window.webkitURL).revokeObjectURL(this.playingObjectURL);
        this.playingObjectURL = "";
        this.isMusicLoaded = false;
        this.isPlaying = false;
      }
      var musicFileData = fs.readFileSync(data.path)
      var musicFileBlob = new Blob([musicFileData]);
      this.playingObjectURL = (window.URL || window.webkitURL).createObjectURL(musicFileBlob);
      this.playingSound = soundManager.createSound({
        url: this.playingObjectURL,
        onfinish: function() {
          this.isPlaying = false;
        }
      })
      this.songTitle = data.meta.title;
      this.songArtist = data.meta.artist.join(", ");
      this.songAlbum = data.meta.album;
      this.isMusicLoaded = true;
      this.playingSound.play();
      this.isPlaying = true;
      console.log(this.isPlaying);
    }.bind(this))
  },
  methods: {
    toggleMusicPause: function() {
      // FIXME: The pause icon in the template does not change with v-if!
      if(this.isMusicLoaded){
        this.isPlaying = !this.isPlaying;
        this.playingSound.togglePause();
      }
    }
  }
}
</script>

<style>
  .btn-group {
    max-height: 45px;
  }
  .turncate-strings {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

