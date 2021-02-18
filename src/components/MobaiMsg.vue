<template>
  <div class="mobai-msg-box">
    <van-skeleton class="skeleton-title" title :loading="list.length == 0">
      <p>{{ title }}</p>
    </van-skeleton>
    <van-skeleton class="skeleton-main" title :loading="list.length == 0">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            @click="navToMusicList(value.id)"
            v-for="value in list"
            :key="value.id"
            class="swiper-slide"
          >
            <div class="mobai-main">
              <img :src="value.cover" />
              <div>4342.7万</div>
            </div>
            <div class="mobai-title">{{ value.title }}</div>
          </div>
        </div>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import { Skeleton } from 'vant';
import 'swiper/swiper-bundle.min.css';

export default {
  name: 'MobaiMsg',
  props: {
    title: String,
    list: Array,
  },
  components: {
    [Skeleton.name]: Skeleton,
  },
  methods: {
    navToMusicList(id) {
      this.$router.push(`/musiclist/taogelist/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
.mobai-msg-box {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.3rem;
  min-height: 3.5rem;
}
.mobai-msg-box p {
  width: 100%;
  text-align: left;
  color: rgba(26, 26, 26, 1);
  font-weight: 700;
  font-size: 0.5rem;
}
.swiper-slide {
  width: 2.9rem;
}
.mobai-main {
  width: 100%;
  position: relative;
}
.mobai-main img {
  width: 2.9rem;
  height: 2.9rem;
  display: block;
  border-radius: 0.2rem;
}
.mobai-main div {
  position: absolute;
  right: 0.1rem;
  bottom: 0.1rem;
  font-weight: 300;
  color: #fff;
  padding: 0.05rem 0.1rem;
  font-size: 0.05rem;
  border-radius: 0.1rem;
  background-color: rgba(0, 0, 0, 0.4);
}
.mobai-title {
  width: 100%;
  text-align: left;
  color: rgba(26, 26, 26, 1);
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0.1rem;
}
.van-skeleton__avatar {
  width: 100%;
  height: 100%;
  border-radius: 0.2rem;
}
.van-skeleton {
  padding: 0;
}
.skeleton-title {
  width: 20%;
  height: 0.5rem;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
.skeleton-main {
  width: 100%;
  height: 2.9rem;
  border-radius: 0.3rem !important;
}
.van-skeleton__title {
  width: 100%;
  height: 100%;
}
</style>
