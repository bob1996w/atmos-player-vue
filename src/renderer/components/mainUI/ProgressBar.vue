<template>
  <div class="col progress border border-gray p-0" style="height: 22px" @mouseover="onMouseOverProgressbar" @mouseenter="onMouseEnterProgressbar" 
      @mouseleave="onMouseLeaveProgressbar" @mousemove="onMouseMove" @click="seekTo">
    <div class="progress-bar bg-warning" role="progressbar" :aria-valuenow="elapseTime" aria-valuemin="0" :aria-valuemax="totalTime" 
      :style="getElapsePercentStyle()"></div>
  </div>
</template>

<script>
export default {
  name: "progress-bar",
  props: ['elapseTime', 'totalTime'],
  data: function() {
    return {
      elapsePercent: 0,
      seekToTime: 0,
      isHoverOnProgressbar: false,
      elementWidth: 0
    }
  },
  mounted: function() {
    this.$nextTick(function () {
      this.elementWidth = this.$el.clientWidth
    })
  },
  methods: {
    getElapsePercentStyle: function() {
      return "width:" + this.elapseTime * 100 / this.totalTime + "%;";
    },
    seekTo(event) {
      this.$emit('mouse-status', {type: "seek", pos: this.seekToTime});
    },
    getStringTime: function(seconds) {
      var mins = ~~(seconds / 60);
      var secs = ~~(seconds % 60);
      return String( mins ) + "\'" + (secs < 10 ? "0" : "") + String( secs );
    },
    onMouseOverProgressbar(event) {
      //console.log(event);
    },
    onMouseEnterProgressbar(event) {
      this.$emit('mouse-status', {type: "hover", isHover: true});
      this.$nextTick(function () {
        this.elementWidth = this.$el.clientWidth;
      })
    },
    onMouseLeaveProgressbar(event) {
      this.$emit('mouse-status', {type: "hover", isHover: false});
    },
    onMouseMove(event) {
      var pointX = (event.offsetX < 0)? 0: (event.offsetX > this.elementWidth)? this.elementWidth: event.offsetX;
      var mouseTimePos = (pointX / this.elementWidth) * this.totalTime;
      this.seekToTime = mouseTimePos;
      this.$emit('mouse-status', {type: "pos", pos: mouseTimePos});
    }
  }
}
</script>
