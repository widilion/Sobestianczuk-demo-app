/* Main router configuration */
import { createRouter, createWebHistory } from 'vue-router';

import ProductsList from './components/products/ProductsList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' }, // redirect to main URL
    { path: '/products', component: ProductsList },  // main URL and page
    { path: '/:notFound(.*)', redirect: '/products'} // catch-all hook for incorrect URLs
  ],
});


export default router;
