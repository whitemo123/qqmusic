<template>
    <div class="musiclist">
        <van-skeleton class="skeleton-pic" avatar :loading="!list.picurl">
          <div class="cover">
            <img :src="list.picurl">
          </div>
        </van-skeleton>
        <van-skeleton class="skeleton-title" title :loading="!list.title">
          <h2 class="info">{{ list.title }}</h2>
        </van-skeleton>
        <van-skeleton class="skeleton-nick" title :loading="!list.nick">
          <p class="avatar"><img v-if="list.headurl" :src="list.headurl">{{ list.nick }}</p>
        </van-skeleton>
        <van-skeleton class="skeleton-desc" title :loading="!list.listennum">
          <p class="desc">播放量：{{ list.listennum }}</p>
        </van-skeleton>
        <van-skeleton class="skeleton-main" title :loading="!list.listennum">
            <div class="main">
            <p class="sum">歌曲 共{{ list.songnum }}首</p>
            <van-list>
              <van-cell
                v-for="item in list.songlist"
                :key="item.id"
                @click="navToPlay(item.id)"
              >
                  <h3 class="music-name">{{ item.title }}</h3>
                  <p class="music-desc">{{ item.singer }}</p>
              </van-cell>
            </van-list>
        </div>
        </van-skeleton>
    </div>
</template>

<script>
import { List, Cell, Skeleton } from 'vant';
import axios from 'axios';

export default {
  name: 'Musiclist',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      list: {},
    };
  },
  mounted() {
    const { musicid, type } = this.$router.currentRoute.params;
    if (type === 'toplist') {
      axios(`/topmusiclist?id=${musicid}`).then((res) => {
        this.list = res.data;
      });
    } else if (type === 'taogelist') {
      axios(`/taogelist?id=${musicid}`).then((res) => {
        this.list = res.data;
      });
    }
  },
  methods: {
    navToPlay(id) {
      this.$router.push(`/play/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.musiclist {
    width: 100%;
    min-height: 100vh;
    padding-top: 2.1rem;
    box-sizing: border-box;
}
.cover {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
    box-shadow: 0 7px 13px rgba(0,0,0,0.21);
    position: relative;
    border-radius: 0.5rem;
}
.cover img {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    z-index: 9;
}
.cover::before {
    content: '';
    width: 3.85rem;
    height: 3.85rem;
    position: absolute;
    top: 50%;
    right: -0.3rem;
    background-color: rgba(0,0,0,.06);
    border-radius: 0.5rem;
    transform: translate(0, -50%);
    z-index: 0;
}
.info {
    color: #121212;
    font-weight: 400;
    font-size: 0.5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0.7rem 0 0.5rem 0;
}
.avatar {
    color: #121212;
    font-size: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.avatar img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 100%;
    display: inline-block;
    margin-right: 0.2rem;
}
.desc {
    color: grey;
    font-size: 0.35rem;
    font-weight: 400;
    font-family: sans-serif;
}
.main {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.45rem;
}
.sum {
    text-align: left;
    color: grey;
    font-size: 0.3rem;
}
.music-name {
    color: #000;
    font-weight: 400;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.4rem;
    margin: 0;
    padding: 0;
}
.music-desc {
    color: rgba(0,0,0,.4);
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.1rem;
    margin: 0;
    padding: 0;
}
.skeleton-pic {
    width: 5rem;
    height: 5rem;
    margin: 0 auto;
}
.van-skeleton__avatar {
    width: 100%;
    height: inherit;
    border-radius: 0.5rem;
}
.van-skeleton {
    padding: 0;
}
.skeleton-title {
    width: 100%;
    margin: 0.7rem 0 0.5rem 0;
}
.van-skeleton__content {
    width: 100%;
}
.van-skeleton__title {
    margin: 0 auto;
}
.skeleton-desc {
    margin: 0.5rem 0;
}
.skeleton-main {
    width: 100%;
    height: 10rem;
    padding: 0.5rem;
    box-sizing: border-box;
}
.skeleton-main .van-skeleton__title {
    width: 100%;
    height: 100%;
}
</style>
