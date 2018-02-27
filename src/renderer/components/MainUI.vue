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

    </div>
  </div>
</template>

<script>
import TopNavBar from "./TopNavBar";
import PlayerControl from "./mainUI/PlayerControl";
export default {
  name: "mainUI",
  components: {
    TopNavBar,
    PlayerControl
  }
}
</script>

<style>
</style>
