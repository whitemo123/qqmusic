<template>
    <div class="home">
        <van-tabs @click="tabChange" v-model="active" title-active-color="#22D59C">
            <van-tab to="/" title="推荐"></van-tab>
            <van-tab to="/ranking" title="排行"></van-tab>
        </van-tabs>
        <router-view/>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Home',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    ...mapMutations('TabsModule', ['setActiveIndex']),
    tabChange(name) {
      this.setActiveIndex(name);
      this.active = this.activeIndex;
    },
  },
  computed: {
    ...mapState('TabsModule', ['activeIndex']),
  },
  mounted() {
    this.active = this.activeIndex;
  },
};
</script>

<style lang="less">
.van-tabs {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}
.home {
  width: 100%;
  height: calc(100%-78px);
  box-sizing: border-box;
}
#recommend, #ranking {
    margin-top: 44px;
}
.van-tabs__line {
    background-color: #22D59C;
}
</style>
