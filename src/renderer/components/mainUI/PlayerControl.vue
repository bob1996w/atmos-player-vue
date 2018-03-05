<template>
  <div class="border border-white rounded pc-bgc">
    <div class="row m-0">
      <div class="m-0 px-1 align-middle" :style="leftTimeStyle">
        {{timeDisplayLeft()}}
      </div>
      <div class="col progress border border-gray p-0" style="height: 22px" @ mouseover="onMouseOverProgressbar" @mouseenter="onMouseEnterProgressbar" 
          @mouseleave="onMouseLeaveProgressbar" @click="seekTime">
      <!-- TODO: change progressbar to slider with left & right elapse time display-->
        <div class="progress-bar bg-warning" role="progressbar" :aria-valuenow="elapseTime" aria-valuemin="0" :aria-valuemax="totalTime" 
          :style="getElapsePercentStyle()"></div>
      </div>
      <div class="m-0 px-1 align-middle">
        {{timeDisplayRight()}}
      </div>
    </div>
    
    <div class="row m-0">
      <div class="btn-group m-0 p-0" role="controlGroupA">
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-fast-backward"></i></a>
        <a class="btn btn-warning btn-lg" @click="toggleMusicPause()">
          <template v-if="isPlaying === true">
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
import { clearInterval } from 'timers';

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
      songAlbum: "Just no one knows this album",
      elapseTime: 0,
      elapsePercent: 0,
      isHoverOnProgressbar: false,
      totalTime: 0,
      updateElapseTimeIntervalId: null,
      leftTimeStyle: {
        color: "white"
      }
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
      debugMode: false,
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
        onplay: function() {
          this.totalTime = data.meta.duration;
          //console.log(data.meta.duration);
          this.updateElapseTimeIntervalId = setInterval(this.updateElapseTime, 100);
        }.bind(this),
        onfinish: function() {
          this.isPlaying = false;
          clearInterval(this.updateElapseTimeIntervalId);
        }.bind(this)
      })
      this.songTitle = data.meta.title;
      this.songArtist = data.meta.artist.join(", ");
      this.songAlbum = data.meta.album;
      this.isMusicLoaded = true;
      this.playingSound.play();
      this.isPlaying = true;
    }.bind(this))

  },
  methods: {
    toggleMusicPause: function() {
      // FIXME: The pause icon in the template does not change with v-if!
      if(this.isMusicLoaded){
        this.isPlaying = !this.isPlaying;
        this.playingSound.togglePause();
      }
    },
    getStringTime: function(seconds) {
      var mins = ~~(seconds / 60);
      var secs = ~~(seconds % 60);
      return String( mins ) + "\'" + (secs < 10 ? "0" : "") + String( secs );
    },
    updateElapseTime: function() {
      this.elapseTime = Math.floor(this.playingSound.position / 1000);
    },
    getElapsePercentStyle() {
      return "width:" + this.elapseTime * 100 / this.totalTime + "%;";
    },
    onMouseOverProgressbar(event) {
      console.log(event);
    },
    onMouseEnterProgressbar(event) {
      this.isHoverOnProgressbar = true;
      this.leftTimeStyle.color = "rgb(255, 193, 7)";
    },
    onMouseLeaveProgressbar(event) {
      this.isHoverOnProgressbar = false;
      this.leftTimeStyle.color = "white";
    },
    seekTime(event) {

    },
    timeDisplayLeft() {
      if(this.isMusicLoaded && this.isHoverOnProgressbar) {
        return this.getStringTime(0);
      }
      else {
        return this.getStringTime(this.elapseTime);
      }
    },
    timeDisplayRight() {
      return this.getStringTime(this.totalTime);
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
  .pc-bgc {
    background-color: rgb(68, 68, 68);
  }
  
  .progress-bar {
    -webkit-transition: none;
    -moz-transition: none;
    -ms-transition: none;
    -o-transition: none;
    transition: none;
  }
</style>

