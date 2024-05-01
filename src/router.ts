import { createRouter, createWebHistory } from 'vue-router';

import ProductsList from './components/products/ProductsList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', component: ProductsList },
    { path: '/:notFound(.*)', redirect: '/products'}
  ],
});


export default router;
