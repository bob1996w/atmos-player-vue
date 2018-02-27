<template>
  <div class="container border border-white rounded">
    <div class="progress m-2">
      <div class="progress-bar bg-warning" role="progressbar" style="width: 26%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="row m-0">
      <div class="btn-group m-0 p-0" role="controlGroupA">
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-fast-backward"></i></a>
        <a class="btn btn-warning btn-lg"><i class="fa fa-play"></i></a>
        <a class="btn btn-outline-primary btn-lg"><i class="fa fa-fast-forward"></i></a>
      </div>
      <div class="col m-0 p-1">
        <div class="song-title">{{ songTitle }}</div>
        <div class="song-sub">{{ getSubInfoString }}</div>
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
export default {
  name: "player-control",
  data: function() {
    return {
      play: true,
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
  }
}
</script>

<style>
  .btn-group {
    max-height: 45px;
  }
</style>

