import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NFTdetails from '../views/NFTDetails.vue'
import Login from '../views/Login.vue'
import SendTx from '@/views/SendTransactions.vue'
import BuyNFT from '@/views/BuyNFT.vue'
import ParseTx from '@/views/ParseTransactions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/nft/:id',
      name: 'NFTDetails',
      component: NFTdetails
    },
    {
      path: '/login',
      name: 'loginPage',
      component: Login
    },
    {
      path: '/SendTx',
      name: 'SendTransactions',
      component: SendTx
    },
    {
      path: '/buyNFT',
      name: 'BuyNFT',
      component: BuyNFT
    },
    {
      path: '/parseTx',
      name: 'ParseTransation',
      component: ParseTx
    },
  ]
})

export default router
