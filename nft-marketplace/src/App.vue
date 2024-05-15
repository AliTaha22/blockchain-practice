<script setup>
import { useRouter, RouterView } from 'vue-router';
import { useNftStore } from "@/stores/nft"


const router = useRouter();
const nftStore = useNftStore()

const SendTransaction = () => {
    router.push({ name: 'SendTransactions' });
}
const parseTransaction = () => {
    router.push({ name: 'ParseTransation' });
}
const BuyNFT = () => {
    router.push({ name: 'BuyNFT' });
}

</script>

<template>
  <div>
    <div class="header">
        <button class="header-button" @click="parseTransaction"> View Transactions </button>
        <button class="header-button" @click="SendTransaction"> Send ETH </button>
        <button class="header-button" @click="BuyNFT"> Buy NFT </button>
        <button class="header-button" @click="nftStore.connectToMetaMask()"> Connect Wallet </button>
    </div>
    <RouterView></RouterView>
  </div>


  <!-- <Login/> -->
  
  <!-- <button class="button" @click="navigateView">Check NFTs</button> -->



  <!-- <router-view></router-view> -->
</template>

<style scoped>
.header-button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #555; /* Button background color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.header-button:hover {
  background-color: #777; /* Button background color on hover */
}
.header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid #ccc; /* Border color */
}
</style>
