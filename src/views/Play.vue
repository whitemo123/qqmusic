<template>
  <div class="play">
    <div :style="{ background: 'url(' + pic + ')' }" class="mub"></div>
    <div class="main">
      <div class="cover">
        <img :src="pic" />
      </div>
      <div class="detail">
        <h2>{{ title }}</h2>
        <p>{{ singer }}</p>
      </div>
      <div class="lyric" ref="lyric">
        <ul id="lyricbox" ref="ul">
          <li> </li>
          <li> </li>
          <li :class="{active: activeIndex == index}" v-for="(value, index) in lyricList" :key="index">{{ value.mg }}</li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div class="control">
        <div class="slider">
          <van-slider
            v-model="audio.value"
            active-color="#fff"
            inactive-color="#FFFFFF78"
            @change="sliderChange"
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
          <img
            @click="change()"
            v-if="audio.playing"
            src="@/assets/pause.png"
          />
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
      lyricList: [],
      activeIndex: 0,
      scroll: null,
    };
  },
  mounted() {
    const { songid } = this.$router.currentRoute.params;
    axios(`/musicdetail?id=${songid}`).then((res) => {
      const { data } = res;
      this.title = data.title;
      this.singer = data.singer;
      this.pic = data.pic;
      axios(`/musiclyric?id=${data.id}`).then((lyricData) => {
        const lyricmsg = lyricData.data;
        const arr = lyricmsg.split('\n');
        const musicLyric = [];
        arr.forEach((item) => {
          const p = /\[(?<hour>[0-9]{2}):(?<mimute>[0-9]{2})\.(?<sec>[0-9]{2})\](?<msg>(.*))/;
          const m = item.match(p);
          if (m === null) {
            return;
          }
          const mimute = parseInt(m.groups.hour, 10);
          const sec = parseInt(m.groups.mimute, 10);
          const ms = parseInt(m.groups.sec, 10);
          const { msg } = m.groups;
          const time = (mimute * 60000) + (sec * 1000) + ms;
          const obj = {
            tm: time,
            mg: msg,
          };
          musicLyric.push(obj);
        });
        this.lyricList = musicLyric;
        this.audioSrc = data.m4aUrl;
      });
    });
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
      this.audio.value = parseInt(
        (res.target.currentTime / res.target.duration) * 100,
        10,
      );
      const time = res.target.currentTime * 1000;
      this.activeIndex = this.lyricList.findIndex((item, index) => (item.tm < time && this.lyricList[index + 1] ? this.lyricList[index + 1].tm > time : true));
      // console.log(this.activeIndex * -56);
      // document.querySelector('ul').scrollTop = (this.activeIndex * 56);
      if (this.$refs.ul) {
        this.$refs.ul.scrollTo(0, this.activeIndex * 37.52, 500);
      }
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
    sliderChange(value) {
      console.log(value);
      this.$refs.audio.currentTime = value * (this.audio.maxtime / 100);
    },
  },
  filters: {
    formatTime(second) {
      const secType = typeof second;
      if (secType !== 'number' && secType !== 'sreing') {
        return '00:00';
      }
      const mimute = parseInt(second / 60, 10) >= 10
        ? parseInt(second / 60, 10)
        : `0${parseInt(second / 60, 10)}`;
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
.lyric {
  width: 100%;
  height: 5rem;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 1rem auto 0;
  border-radius: 0.5rem;
  scroll-snap-type: y mandatory;
}
.lyric ul {
  width: 100%;
  height: 100%;
  list-style-type: none;
  overflow: scroll;
}
.lyric ul li {
  width: 100%;
  color: #fff;
  height: 1rem;
  line-height: 1rem;
  scroll-snap-align: start;
  font-size: 0.5rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.lyric ul::-webkit-scrollbar {
  display: none;
}
.active {
  font-weight: bold !important;
  color: #e74c3c !important;
}
</style>
