<template>
    <div class="music-list">
        <ul v-for="music in musics">
            <li>{{$index}} - {{item.path}}</li>
        </ul>
    </div>
</template>

<script>
var musics = [];
export default {
    name: "music-list",
    mounted: function() {
    // initialize all tooltips
    /*
    var tooltipElems = this.$el.querySelector('[data-toggle="tooltip"]');
    tooltipElems.tooltip();
    console.log(tooltipElems);
    */
    this.$electron.ipcRenderer.on('get-musics',(event ,arg) => {
      musics = arg;
      console.log(musics)
    })
  },
    data: function() {
        return {
            musics
        };
    },
}
</script>

<style>
.music-list {
    border: white solid 2px;
    border-radius: 4px;
}
.music-list li {
    color: #aeaace;
}
</style>