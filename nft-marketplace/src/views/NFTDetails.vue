<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNftStore } from "@/stores/nft"
import InputBox from '@/components/icons/InputFieldComponent.vue'

const nftStore = useNftStore()
const nft = ref(null)
const listingStatus = ref(null)
const isLoading = ref(true)
const amountETH = ref(null);
const nftOwner = ref(null);
const isOwner = ref(false);

onMounted(async () => {
    // Get the NFT ID from route parameters
    const route = useRoute();
    const nftId = route.params.id;


    // //fetchingStatus of its listing:
    listingStatus.value = await nftStore.fetchListingStatus(nftId)

    //calling store getter
    nft.value = nftStore.getNftById(nftId);
    await new Promise(resolve => setTimeout(resolve, 1000)); //opensea doesnt allow 2 api calls within short time period, have to wait.

    nftOwner.value = await nftStore.getNFTOwner(nftId);
    checkOwner();
    isLoading.value = false;

    // // await nftStore.fetchListingStatus(nftId).then((response) =>{

    // //     // listingStatus.value = response;
    // //     // console.log(listingStatus.value);


    // // })
    // // console.log(listingStatus.value[0]);

});

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Adjust the format as needed
}

const formatPrice = (priceInWei) => {
    const priceInEth = priceInWei / 1e18; // Convert from wei to ether
    return priceInEth.toLocaleString(undefined, { maximumFractionDigits: 2 }) // Show up to 2 decimal places
}
const checkOwner = () => {
    if (nftOwner.value === nftStore.currentAccount) {
        isOwner.value = true
    }
};
</script>

<template>

    <div class="container">

        <div v-if="nft" class="left-div">
            <h1> {{ nft.name }}</h1>
            <h2> NFT ID {{ nft.identifier }}</h2>
            <img :src="nft.image_url" style="width: 500px;">
            <p>Description: {{ nft.description }}</p>
        </div>
        <div v-if="isLoading">
            <p>Loading...</p>
        </div>
        <div v-else-if="listingStatus" class="right-div">
            <h1> Item is Listed for Sell</h1>
            <h3>Current Price: {{ formatPrice(listingStatus.current_price) }} ETH</h3>
            <h3>Listed for sell on: {{ formatDateTime(listingStatus.created_date) }}</h3>
            <h3>Sale ends {{ formatDateTime(listingStatus.closing_date) }}</h3>
        </div>
        <div v-else-if="isOwner && !listingStatus" class="right-div">
            <h2>Set a price</h2>
            <div class="horizontal-container">
                <InputBox pHolder="Amount" ref="amountETH"></InputBox>
                <p class="eth-text">ETH</p>
            </div>
            <button class="button" @click="nftStore.listForSale(nft.identifier, amountETH.value)">List for Sale</button>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    /* Display children side by side */
}

.horizontal-container {
    display: flex;
    /* Use flexbox */
    flex-direction: row;
    /* Set the direction to horizontal (row) */
}

.eth-text {
    font-weight: bold;
    /* Make the text bold */
    font-size: 1.4em;
    /* Adjust the font size as needed */
    margin-left: 5px;
    /* Adjust the margin between the input box and the text */
}

.left-div {
    flex: 1;
    /* Take up available space */
    margin-right: 20px;
    /* Add some space between the divs */
}

.right-div {
    flex: 1;
    /* Take up available space */
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
</style>

<!-- //     const getNFTDetails = () => {
    //     // Get the NFT ID from route parameters
    //     const route = useRoute();
    //     const nftId = route.params.id;
    //     // Get the NFT data from query parameters
    //     const nftData = nftStore.nfts.find(a => a.identifier == nftId);
    
    //     console.log('nftData: ' + nftData);
    
    //     // Assign the retrieved NFT data to the component data
    //     nft.value = nftData;
    // }; -->