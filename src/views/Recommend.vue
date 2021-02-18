<template>
  <div id="recommend">
    <van-search
      v-model="keywords"
      placeholder="搜索"
      input-align="center"
      :disabled="true"
      @click="navToSearch()"
    ></van-search>
    <mobai-msg title="官方歌单" :list="officialPlaylist"></mobai-msg>
    <mobai-msg title="达人歌单" :list="ugcPlaylist"></mobai-msg>
    <mobai-msg title="专区" :list="zoneList"></mobai-msg>
  </div>
</template>

<script>
import { Search } from 'vant';
import MobaiMsg from '@/components/MobaiMsg.vue';
import { mapState, mapActions } from 'vuex';
import Swiper from 'swiper/bundle';

export default {
  name: 'Recommand',
  components: {
    MobaiMsg,
    [Search.name]: Search,
  },
  data() {
    return {
      keywords: '',
    };
  },
  mounted() {
    if (
      this.officialPlaylist.length === 0
      || this.ugcPlaylist.length === 0
      || this.zoneList.length === 0
    ) {
      this.getAllList().then(() => {
        this.$nextTick(() => {
          const swiper = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 10,
          });
          console.log(swiper);
        });
      });
    } else {
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 3,
        spaceBetween: 10,
      });
      console.log(swiper);
    }
  },
  computed: {
    ...mapState('RecommendModule', [
      'officialPlaylist',
      'ugcPlaylist',
      'zoneList',
    ]),
  },
  methods: {
    ...mapActions('RecommendModule', ['getAllList']),
    navToSearch() {
      this.$router.push('/search');
    },
  },
};
</script>

<style lang="less">
</style>
