<template>
  <div class="play">
    <div
      :style="{background: 'url('+pic+')'}"
      class="mub"
    >
    </div>
    <div class="main">
      <div class="cover">
        <img
          :src="pic"
        />
      </div>
      <div class="detail">
        <h2>{{ title }}</h2>
        <p>{{ singer }}</p>
      </div>
      <div class="control">
        <div class="slider">
          <van-slider
            v-model="audio.value"
            active-color="#fff"
            inactive-color="#FFFFFF78"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <div class="slider-detail">
            <span>{{ audio.currenttime | formatTime }}</span>
            <span>{{ audio.maxtime | formatTime }}</span>
          </div>
        </div>
        <div class="playcontrol">
          <audio
            :src="audioSrc"
            autoplay
            @ended="overAudio"
            @pause="onPause"
            @play="onPlay"
            @timeupdate="onTimeupdate"
            @loadedmetadata="onLoadedmetadata"
            ref="audio"
          ></audio>
          <img @click="change()" v-if="audio.playing" src="@/assets/pause.png" />
          <img @click="change()" v-else src="@/assets/play.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Slider } from 'vant';
import axios from 'axios';

export default {
  name: 'Play',
  components: {
    [Slider.name]: Slider,
  },
  data() {
    return {
      audio: {
        value: 0,
        playing: true,
        maxtime: 0,
        currenttime: 0,
      },
      title: '',
      singer: '',
      audioSrc: '',
      pic: '',
    };
  },
  mounted() {
    const { songid } = this.$router.currentRoute.params;
    axios(`/musicdetail?id=${songid}`).then((res) => {
      const { data } = res;
      this.title = data.title;
      this.singer = data.singer;
      this.pic = data.pic;
      this.audioSrc = data.m4aUrl;
    });
    console.log(songid);
  },
  methods: {
    overAudio() {
      this.audio.playing = false;
    },
    onPause() {
      console.log('播放暂停');
    },
    onPlay() {
      console.log('开始播放');
    },
    onLoadedmetadata(res) {
      this.audio.maxtime = parseInt(res.target.duration, 10);
    },
    onTimeupdate(res) {
      this.audio.currenttime = parseInt(res.target.currentTime, 10);
      this.audio.value = parseInt((res.target.currentTime / res.target.duration) * 100, 10);
    },
    change() {
      const { audio } = this.$refs;
      if (this.audio.playing) {
        audio.pause();
      } else {
        audio.play();
      }
      this.audio.playing = !this.audio.playing;
    },
  },
  filters: {
    formatTime(second) {
      const secType = typeof second;
      if (secType !== 'number' && secType !== 'sreing') {
        return '00:00';
      }
      const mimute = parseInt(second / 60, 10) >= 10 ? parseInt(second / 60, 10) : `0${parseInt(second / 60, 10)}`;
      const sec = second % 60 >= 10 ? second % 60 : `0${second % 60}`;
      return `${mimute}:${sec}`;
    },
  },
};
</script>

<style lang='less' scoped>
.play {
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
}
.mub {
  position: absolute;
  width: 100%;
  height: 100%;
  // background: transparent
  //   url("http://p2.music.126.net/xGHlWaWQmesOZaMHALlgZw==/109951165723701642.jpg?imageView&thumbnail=50y50&quality=15&tostatic=0")
  //   no-repeat;
  //   transform: scale(1.5);
  filter: blur(60px);
  background-size: cover;
  background-position: 50% 50%;
  top: 0;
  left: 0;
  z-index: 1;
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  padding: 0.7rem 0.5rem 0.1rem;
  box-sizing: border-box;
}
.cover {
  width: 100%;
  height: 5rem;
  border-radius: 0.4rem;
}
.cover img {
  width: 5rem;
  height: 5rem;
  display: block;
  margin: 0 auto;
  border-radius: 0.4rem;
}
.detail {
  width: 100%;
}
.detail h2 {
  color: rgba(255, 255, 255, 0.9);
}
.detail p {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}
.control {
  width: 100%;
  height: 15%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0 0.7rem;
  box-sizing: border-box;
}
.slider {
  width: 100%;
}
.slider-detail {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  color: #ffffff78;
}
.custom-button {
  width: 0.5rem;
  height: 0.5rem;
  background-color: #fff;
  border-radius: 100%;
}
.playcontrol img {
  width: 2rem;
  height: 2rem;
}
</style>
