<template>
  <div class="search">
    <van-search
      v-model="keywords"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div v-if="list.length == 0" class="hotsearch">
      <h2>热门搜索</h2>
      <div class="hotlist">
        <span
          @click="hotclick(value.title)"
          v-for="(value, index) in hotList"
          :key="index"
        >
          {{ value.title }}
        </span>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-if="list.length!=0"
    >
      <van-cell v-for="item in list" :key="item.id">
        <h3>{{ item.name }}</h3>
        <p>{{ item.singer }}</p>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Search, List, Cell } from 'vant';
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'Search',
  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Cell.name]: Cell,
  },
  data() {
    return {
      keywords: '',
      loading: false,
      finished: false,
      list: [],
    };
  },
  methods: {
    onSearch() {
      axios(`/search?name=${this.keywords}`).then((res) => {
        this.list = res.data;
      });
    },
    onCancel() {
      this.$router.replace('/');
    },
    hotclick(name) {
      this.keywords = name;
      this.onSearch();
    },
  },
  computed: {
    ...mapState('RecommendModule', ['hotList']),
  },
};
</script>

<style lang="less" scoped>
.hotsearch {
  width: 100%;
  padding: 0.1rem 0.3rem;
  box-sizing: border-box;
}
.hotsearch h2 {
  width: 100%;
  text-align: left;
  font-weight: 700;
  color: rgba(26, 26, 26, 1);
}
.hotlist {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.hotlist span {
  display: block;
  padding: 0.05rem 0.15rem;
  border-radius: 0.2rem;
  background-color: #fff;
  color: rgba(26, 26, 26, 1);
  margin: 0.15rem;
}
.van-cell h3, .van-cell p {
  margin: 0;
  padding: 0;
}
.van-cell h3 {
  color: rgba(26,26,26,1);
  font-weight: 400;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-cell p {
  font-size: 0.2rem;
  color: rgba(26,26,26,.5);
  font-weight: 300;
}
</style>
