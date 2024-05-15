<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useNftStore } from "@/stores/nft"
import axios from "axios"


const nftStore = useNftStore()
const nftLoading = ref(true)
const router = useRouter();


// const signParameter = async (message) => {

//     const messageString = JSON.stringify(message);

//     // Convert the JSON string into bytes (array of bytes)
//     const messageBytes = ethers.utils.toUtf8Bytes(messageString);

//     const signature = await signer.signMessage(messageString);
//     return signature;
// }
const viewDetails = (nft) => {
    // Navigate to NFT details page with all relevant data
    //   console.log('nft: ' + nft.id);
    router.push({ name: 'NFTDetails', params: { id: nft.identifier } });
}

const nftsToDisplay = computed(() => {
    return nftStore.nfts.filter(n => n.name != null && n.name != "")
})

onMounted(async () => {
    nftStore.fetchNfts().then(() => {
        nftLoading.value = false;
    })

});

</script>

<template>

    <div v-if="nftLoading">
        <h1>Loading...</h1>
    </div>
    <div v-else class="flex">
        <div v-for="nft in nftsToDisplay" :key="nft.identifier" class="nft-card">
            <h1>
                {{ nft.name + " TID " + nft.identifier }}
            </h1>
            <img :src="nft.image_url" style="max-width: 200px;">
            <p>Description: {{ nft.description }}</p>
            <button class="button" @click="viewDetails(nft)">View Details</button>
        </div>

    </div>

</template>

<style scoped>
.container {
    display: flex;
    justify-content: flex-end;
    /* Aligns content to the right */
    padding: 20px;
    /* Add padding for spacing */
}

.connect-button {
    margin: 2px;
    background-color: #580202;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.connect-button:hover {
    background-color: #0056b3;
}

.button {
    margin: 2px;
    background-color: #274e77;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}

.nft-card {
    flex-basis: 30%;
}

.flex {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 25px;
    justify-content: space-between;
}
</style>
