<template>
  <div>
    <div>
      <top-nav-bar></top-nav-bar>
    </div>
    <div class="container">
    </div>
    <div class="fixed-bottom">
      <player-control></player-control>
    </div>
    <div class="container">
      <music-list></music-list>
    </div>
  </div>
</template>

<script>
import TopNavBar from "./TopNavBar";
import MusicList from "./mainUI/MusicList";
import PlayerControl from "./mainUI/PlayerControl";
export default {
  name: "mainUI",
  components: {
    TopNavBar,
    MusicList,
    PlayerControl
  }
}
</script>

<style>
</style>
