<template>
    <div class="music-list">
        <ul class="list-group list-group-flush">
            <template v-for="(music, index) in musics">
                <div class="list-group-item list-group-item-action clearfix" @click="playMusicItem(index)">
                    <span class="float-left mr-2">
                        <i class="fas fa-music"></i>
                    </span>
                    <span>
                        {{index + 1}}. {{music.meta.title}}
                    </span>
                    <span class="float-right">
                        <span class="mr-2">
                            {{getStringTime(music.meta.duration)}}
                        </span>
                        <button class="btn btn-sm btn-warning" @click.stop="removeMusicItem(index)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </span>
                </div>
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
            console.log(arg);
        })
    },
    data: function() {
        return {
            musics: []
        };
    },
    methods: {
        getStringTime: function(seconds) {
            var mins = ~~(seconds / 60);
            var secs = ~~(seconds % 60);
            return String( mins ) + "\'" + (secs < 10 ? "0" : "") + String( secs );
        },
        playMusicItem: function(index) {
            /* TODO: 
                call ipcMain to play music
                broadcast music tags to PlayerControl (this.musics[index] object)
            */
            console.log("Play " + this.musics[index].path);
            this.$electron.ipcRenderer.send('play-music', this.musics[index]);
        },
        removeMusicItem: function(index) {
            console.log("Remove " + this.musics[index].path);
            this.musics.splice(index, 1);
        }
    }
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