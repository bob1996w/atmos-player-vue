<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" data-toggle="tooltip" data-placement="bottom" title="Open File" @click="openAndGetFile()">Atmos Player</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation" style="">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-collapse collapse" id="navbarColor03" style="">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Now Playing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" data-toggle="tooltip" data-placement="bottom" title="Your Favorite Songs">Playlists <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Database</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Settings</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" placeholder="Search" type="text">
        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: "top-nav-bar",
  mounted: function() {
    // initialize all tooltips
    /*
    var tooltipElems = this.$el.querySelector('[data-toggle="tooltip"]');
    tooltipElems.tooltip();
    console.log(tooltipElems);
    */
  },
  methods: {
    openAndGetFile: function() {
      this.$electron.ipcRenderer.send('openFileRequest')
    }
  }
}
</script>