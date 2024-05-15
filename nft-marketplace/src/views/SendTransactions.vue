<script setup>
import { ref, onMounted, computed } from 'vue';
import { useNftStore } from "@/stores/nft"
import InputBox from '@/components/icons/InputFieldComponent.vue'

const nftStore = useNftStore();
const currentAccount = ref(null);
const transferAddress = ref(null);
const amountETH = ref(null);

//txn's are sent successfully but somehow values doesnt match.


onMounted(() => {

    currentAccount.value = nftStore.currentAccount; // Access currentAccount
    // console.log(currentAccount.value);
})

const SendTransaction = () =>{

    nftStore.SendTransaction(transferAddress.value,amountETH.value)

}

</script>

<template>

    <div class="horizontal-container">
        <p class="bold-text">Account {{ currentAccount }}</p>
    </div>
    <div class="horizontal-container">
        <p class="bold-text">Send To</p>
        <InputBox pHolder="Address" ref="transferAddress"></InputBox>
    </div>
    <div class="horizontal-container">
        <p class="bold-text">Amount</p>
        <InputBox pHolder="Amount" ref="amountETH"></InputBox>
        <p class="bold-text">ETH</p>
    </div>

    <button class="button" @click="SendTransaction">Send Transaction</button>

</template>

<style scoped>
.bold-text {
    font-weight: bold;
    /* Make the text bold */
    font-size: 1.4em;
    /* Adjust the font size as needed */
    margin-left: 5px;
    /* Adjust the margin between the input box and the text */
}

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