<template>
  <div>
    <top-nav-bar></top-nav-bar>
    <div class="d-flex flex-column padding-topbottom">
      <div class="mb-auto p-0 shrinkable container">
      <music-list></music-list>
      </div>
    </div>
    <div class="fixed-bottom">
      <player-control></player-control>
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
  .padding-topbottom {
    padding-top: 80px;
    padding-bottom: 85px;
  }
</style>
