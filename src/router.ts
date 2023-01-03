import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    props: true,
    meta: {
      transition: 'slide',
      weight: 2,
    },
  },
  {
    path: '/:id',
    name: 'play',
    component: () => import('@/pages/Play.vue'),
    props: true,
    meta: {
      transition: 'slide',
      weight: 2,
    },
  },
  {
    path: '/:id/restart',
    name: 'restart',
    component: () => import('@/pages/Restart.vue'),
    props: true,
    meta: {
      transition: 'slide',
      weight: 2,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  },
});

export default router;
