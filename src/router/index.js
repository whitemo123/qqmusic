import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/Recommend.vue'),
      },
      {
        path: '/ranking',
        component: () => import('../views/Ranking.vue'),
      },
    ],
  },
  {
    path: '/search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/musiclist/:type/:musicid',
    component: () => import('../views/MusicList.vue'),
  },
  {
    path: '/play/:songid',
    component: () => import('../views/Play.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
