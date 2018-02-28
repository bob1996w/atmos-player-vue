<template>
    <div class="music-list">
        <ul>
            <template v-for="music in musics">
                <li>{{music.meta.title}}</li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: "music-list",
    mounted: function() {
    // initialize all tooltips
    this.$electron.ipcRenderer.on('get-musics',(event ,arg) => {
      this.musics.push(arg);
      console.log(arg)
    })
  },
    data: function() {
        return {
            musics: []
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