<template>
    <div id="ranking">
        <div
          v-for="(value, index) in topList"
          :key="'box-'+index"
          class="box"
          @click="navToMusicList(value.id)"
        >
            <div class="box-left">
                <van-skeleton class="skeleton-title" title :loading="loading">
                  <h2>{{ value.title }}</h2>
                </van-skeleton>
                <ol>
                  <li v-for="(item, index2) in value.songArr" :key="'item-'+index2">
                    <van-skeleton class="skeleton-item" title :loading="loading">
                      <strong>1.</strong>{{ item.title }}-{{ item.singel }}
                    </van-skeleton>
                  </li>
                </ol>
            </div>
            <div class="box-right">
                <van-skeleton avatar :loading="loading">
                  <img :src="value.pic">
                </van-skeleton>
            </div>
        </div>
    </div>
</template>

<script>
import { Skeleton } from 'vant';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Ranking',
  components: {
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    if (this.topList.length === 0) {
      this.getTopList().then(() => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  },
  computed: {
    ...mapState('ToplistModule', ['topList']),
  },
  methods: {
    ...mapActions('ToplistModule', ['getTopList']),
    navToMusicList(id) {
      this.$router.push(`/musiclist/toplist/${id}`);
    },
  },
};
</script>

<style lang="less" scoped>
#ranking {
    width: 100%;
    height: 100%;
    padding: 0.6rem 0.5rem;
    box-sizing: border-box;
}
.box {
    width: 100%;
    height: 2.8rem;
    border-radius: 0.2rem;
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem 0 0.2rem 0.4rem;
    box-sizing: border-box;
    margin: 0.3rem 0;
}
.box-left {
    flex: 7;
    width: 100%;
    height: 2.8rem;
}
.box-left h2 {
    font-weight: 700;
    font-size: 0.45rem;
    text-align: left;
}
.box-left ol {
  width: 100%;
  height: inherit;
}
.box-left li {
  max-width: 5.9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  color: rgba(26,26,26,1);
}
.box-left li strong {
    color: rgba(26,26,26,1);
}
.box-right {
    flex: 3.2;
    width: 100%;
    height: 2.8rem;
}
.box-right img {
    width: 100%;
    height: 2.8rem;
    border-radius: 0 0.2rem 0.2rem 0;
}
.van-skeleton {
  padding: 0;
}
.skeleton-title {
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  width: 50%;
}
.skeleton-item {
  margin: 0.05rem 0;
  width: 80%;
}
.van-skeleton__avatar {
  width: 100%;
  height: 2.8rem;
  border-radius: 0 0.2rem 0.2rem 0;
  margin-right: 0;
}
.van-skeleton__title {
  width: 100%;
}
</style>
