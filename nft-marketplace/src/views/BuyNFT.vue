<script setup>
import { ref, onMounted } from 'vue';
import { useNftStore } from "@/stores/nft"
import { ethers } from 'ethers';
import InputBox from '@/components/icons/InputFieldComponent.vue'


const nftStore = useNftStore();
let contract = null;
const NFTId = ref(null);
const nftData = ref(null);
const nft = ref(null);
const showModal = ref(false);
const recipientAddress = ref('');
const isOwner = ref(false);
const signerAddress = ref(null);

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

onMounted(async () => {

    createContractInstance();
})
const searchNFT = async () => {
    nftData.value = await nftStore.fetchListingStatus(NFTId.value.value);
    nft.value = nftStore.getNftById(NFTId.value.value)
    signerAddress.value = await signer.getAddress()
    checkOwner();
}
const toggleModalVisibility = () => {
    showModal.value = !showModal.value
}
const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString(); // Adjust the format as needed
}
const formatPrice = (priceInWei) => {
    const priceInEth = priceInWei / 1e18; // Convert from wei to ether
    return priceInEth.toLocaleString(undefined, { maximumFractionDigits: 2 }) // Show up to 2 decimal places
}
const createContractInstance = async () => {

    // const contractAddress = '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC'    wrong contract address
    const contractAddress = '0x0000000000000068F116a894984e2DB1123eB395';

    const contractABI =
        [{ "inputs": [{ "internalType": "address", "name": "conduitController", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "BadContractSignature", "type": "error" }, { "inputs": [], "name": "BadFraction", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BadReturnValueFromERC20OnTransfer", "type": "error" }, { "inputs": [{ "internalType": "uint8", "name": "v", "type": "uint8" }], "name": "BadSignatureV", "type": "error" }, { "inputs": [], "name": "CannotCancelOrder", "type": "error" }, { "inputs": [], "name": "ConsiderationCriteriaResolverOutOfRange", "type": "error" }, { "inputs": [], "name": "ConsiderationLengthNotEqualToTotalOriginal", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "considerationIndex", "type": "uint256" }, { "internalType": "uint256", "name": "shortfallAmount", "type": "uint256" }], "name": "ConsiderationNotMet", "type": "error" }, { "inputs": [], "name": "CriteriaNotEnabledForItem", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "identifiers", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "ERC1155BatchTransferGenericFailure", "type": "error" }, { "inputs": [], "name": "InexactFraction", "type": "error" }, { "inputs": [], "name": "InsufficientNativeTokensSupplied", "type": "error" }, { "inputs": [], "name": "Invalid1155BatchTransferEncoding", "type": "error" }, { "inputs": [], "name": "InvalidBasicOrderParameterEncoding", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "conduit", "type": "address" }], "name": "InvalidCallToConduit", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "address", "name": "conduit", "type": "address" }], "name": "InvalidConduit", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "InvalidContractOrder", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "InvalidERC721TransferAmount", "type": "error" }, { "inputs": [], "name": "InvalidFulfillmentComponentData", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "InvalidMsgValue", "type": "error" }, { "inputs": [], "name": "InvalidNativeOfferItem", "type": "error" }, { "inputs": [], "name": "InvalidProof", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "InvalidRestrictedOrder", "type": "error" }, { "inputs": [], "name": "InvalidSignature", "type": "error" }, { "inputs": [], "name": "InvalidSigner", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }], "name": "InvalidTime", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "fulfillmentIndex", "type": "uint256" }], "name": "MismatchedFulfillmentOfferAndConsiderationComponents", "type": "error" }, { "inputs": [{ "internalType": "enum Side", "name": "side", "type": "uint8" }], "name": "MissingFulfillmentComponentOnAggregation", "type": "error" }, { "inputs": [], "name": "MissingItemAmount", "type": "error" }, { "inputs": [], "name": "MissingOriginalConsiderationItems", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "NativeTokenTransferGenericFailure", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "NoContract", "type": "error" }, { "inputs": [], "name": "NoReentrantCalls", "type": "error" }, { "inputs": [], "name": "NoSpecifiedOrdersAvailable", "type": "error" }, { "inputs": [], "name": "OfferAndConsiderationRequiredOnFulfillment", "type": "error" }, { "inputs": [], "name": "OfferCriteriaResolverOutOfRange", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "OrderAlreadyFilled", "type": "error" }, { "inputs": [{ "internalType": "enum Side", "name": "side", "type": "uint8" }], "name": "OrderCriteriaResolverOutOfRange", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "OrderIsCancelled", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "OrderPartiallyFilled", "type": "error" }, { "inputs": [], "name": "PartialFillsNotEnabledForOrder", "type": "error" }, { "inputs": [], "name": "TStoreAlreadyActivated", "type": "error" }, { "inputs": [], "name": "TStoreNotSupported", "type": "error" }, { "inputs": [], "name": "TloadTestContractDeploymentFailed", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TokenTransferGenericFailure", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "considerationIndex", "type": "uint256" }], "name": "UnresolvedConsiderationCriteria", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "offerIndex", "type": "uint256" }], "name": "UnresolvedOfferCriteria", "type": "error" }, { "inputs": [], "name": "UnusedItemParameters", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newCounter", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "offerer", "type": "address" }], "name": "CounterIncremented", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "offerer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "zone", "type": "address" }], "name": "OrderCancelled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "offerer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "zone", "type": "address" }, { "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "indexed": false, "internalType": "struct SpentItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "indexed": false, "internalType": "struct ReceivedItem[]", "name": "consideration", "type": "tuple[]" }], "name": "OrderFulfilled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }, { "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "indexed": false, "internalType": "struct OrderParameters", "name": "orderParameters", "type": "tuple" }], "name": "OrderValidated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32[]", "name": "orderHashes", "type": "bytes32[]" }], "name": "OrdersMatched", "type": "event" }, { "inputs": [], "name": "__activateTstore", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "counter", "type": "uint256" }], "internalType": "struct OrderComponents[]", "name": "orders", "type": "tuple[]" }], "name": "cancel", "outputs": [{ "internalType": "bool", "name": "cancelled", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "uint120", "name": "numerator", "type": "uint120" }, { "internalType": "uint120", "name": "denominator", "type": "uint120" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, { "internalType": "bytes", "name": "extraData", "type": "bytes" }], "internalType": "struct AdvancedOrder", "name": "", "type": "tuple" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "enum Side", "name": "side", "type": "uint8" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "bytes32[]", "name": "criteriaProof", "type": "bytes32[]" }], "internalType": "struct CriteriaResolver[]", "name": "", "type": "tuple[]" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "fulfillAdvancedOrder", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "uint120", "name": "numerator", "type": "uint120" }, { "internalType": "uint120", "name": "denominator", "type": "uint120" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, { "internalType": "bytes", "name": "extraData", "type": "bytes" }], "internalType": "struct AdvancedOrder[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "enum Side", "name": "side", "type": "uint8" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "bytes32[]", "name": "criteriaProof", "type": "bytes32[]" }], "internalType": "struct CriteriaResolver[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "maximumFulfilled", "type": "uint256" }], "name": "fulfillAvailableAdvancedOrders", "outputs": [{ "internalType": "bool[]", "name": "", "type": "bool[]" }, { "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "maximumFulfilled", "type": "uint256" }], "name": "fulfillAvailableOrders", "outputs": [{ "internalType": "bool[]", "name": "", "type": "bool[]" }, { "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "considerationToken", "type": "address" }, { "internalType": "uint256", "name": "considerationIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "considerationAmount", "type": "uint256" }, { "internalType": "address payable", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "internalType": "address", "name": "offerToken", "type": "address" }, { "internalType": "uint256", "name": "offerIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "offerAmount", "type": "uint256" }, { "internalType": "enum BasicOrderType", "name": "basicOrderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "offererConduitKey", "type": "bytes32" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalAdditionalRecipients", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct AdditionalRecipient[]", "name": "additionalRecipients", "type": "tuple[]" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct BasicOrderParameters", "name": "", "type": "tuple" }], "name": "fulfillBasicOrder", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "considerationToken", "type": "address" }, { "internalType": "uint256", "name": "considerationIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "considerationAmount", "type": "uint256" }, { "internalType": "address payable", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "internalType": "address", "name": "offerToken", "type": "address" }, { "internalType": "uint256", "name": "offerIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "offerAmount", "type": "uint256" }, { "internalType": "enum BasicOrderType", "name": "basicOrderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "offererConduitKey", "type": "bytes32" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalAdditionalRecipients", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct AdditionalRecipient[]", "name": "additionalRecipients", "type": "tuple[]" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct BasicOrderParameters", "name": "", "type": "tuple" }], "name": "fulfillBasicOrder_efficient_6GL6yc", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order", "name": "", "type": "tuple" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }], "name": "fulfillOrder", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "contractOfferer", "type": "address" }], "name": "getContractOffererNonce", "outputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "offerer", "type": "address" }], "name": "getCounter", "outputs": [{ "internalType": "uint256", "name": "counter", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "counter", "type": "uint256" }], "internalType": "struct OrderComponents", "name": "", "type": "tuple" }], "name": "getOrderHash", "outputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "getOrderStatus", "outputs": [{ "internalType": "bool", "name": "isValidated", "type": "bool" }, { "internalType": "bool", "name": "isCancelled", "type": "bool" }, { "internalType": "uint256", "name": "totalFilled", "type": "uint256" }, { "internalType": "uint256", "name": "totalSize", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "incrementCounter", "outputs": [{ "internalType": "uint256", "name": "newCounter", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "information", "outputs": [{ "internalType": "string", "name": "version", "type": "string" }, { "internalType": "bytes32", "name": "domainSeparator", "type": "bytes32" }, { "internalType": "address", "name": "conduitController", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "uint120", "name": "numerator", "type": "uint120" }, { "internalType": "uint120", "name": "denominator", "type": "uint120" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, { "internalType": "bytes", "name": "extraData", "type": "bytes" }], "internalType": "struct AdvancedOrder[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "enum Side", "name": "side", "type": "uint8" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "bytes32[]", "name": "criteriaProof", "type": "bytes32[]" }], "internalType": "struct CriteriaResolver[]", "name": "", "type": "tuple[]" }, { "components": [{ "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "offerComponents", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "considerationComponents", "type": "tuple[]" }], "internalType": "struct Fulfillment[]", "name": "", "type": "tuple[]" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "matchAdvancedOrders", "outputs": [{ "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order[]", "name": "", "type": "tuple[]" }, { "components": [{ "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "offerComponents", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "considerationComponents", "type": "tuple[]" }], "internalType": "struct Fulfillment[]", "name": "", "type": "tuple[]" }], "name": "matchOrders", "outputs": [{ "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order[]", "name": "", "type": "tuple[]" }], "name": "validate", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]




    contract = new ethers.Contract(contractAddress, contractABI, provider);
    // console.log(contract);

}
const buyNFT = () => {
    nftStore.buyNFT(contract, nftData.value.order_hash)
}
const advanceBuyNFT = async () => {

    await nftStore.advanceBuyNFT(contract, nftData.value.order_hash, recipientAddress.value.value)
    toggleModalVisibility()

}
const checkOwner = () => {

  if (nftData.value && signerAddress.value) {
    isOwner.value = nftData.value.maker.address.toLowerCase() === signerAddress.value.toLowerCase();
    // console.log(`isOwner: ${isOwner.value}`)
  }
};


</script>

<template>

    <div class="container">

        <div class="left-div">
            <div v-if="nft">
                <h1 class="bold-text"> {{ nft.name }}</h1>
                <h3> NFT ID {{ nft.identifier }}</h3>
                <img :src="nft.image_url" style="width: 500px;">
                <p>Description: {{ nft.description }}</p>
            </div>
        </div>

        <div class="right-div">

            <div v-if="nftData">
                <h1> Item is Listed for Sell</h1>
                <h3>Owner: {{ nftData.maker.address }}</h3>
                <h3>Current Price: {{ formatPrice(nftData.current_price) }} ETH</h3>
                <h3>Listed for sell on: {{ formatDateTime(nftData.created_date) }}</h3>
                <h3>Sale ends {{ formatDateTime(nftData.closing_date) }}</h3>
                <div v-if="!isOwner">
                    <button class="buyButton" @click="buyNFT">Buy Now</button>
                    <button class="buyButton" @click="toggleModalVisibility">Buy For Someone Else</button>
                </div>

            </div>

            <div class="horizontal-container">
                <InputBox pHolder="Enter NFT ID to Purchase" ref="NFTId"></InputBox>
                <button class="button" @click="searchNFT">Search</button>
            </div>

            <!-- Modal for entering contract address -->
            <div v-if="showModal" @click.self="toggleModalVisibility" class="modal">
                <div class="modal-content">
                    <!-- <input type="text" v-model="recipientAddress" placeholder="Recipient's Address"> -->
                    <InputBox inputType="text" pHolder="Recipient's Address" ref="recipientAddress"></InputBox>
                    <button class="button" @click="advanceBuyNFT">Submit</button>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped>
.bold-text {
    font-weight: bold;
    /* Make the text bold */
    font-size: 2.4em;
    /* Adjust the font size as needed */
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Semi-transparent black overlay */
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: rgba(19, 15, 15, 0.148);
    padding: 20px;
    border: 1px solid #ccc;
}

.buyButton {

    margin: 6px;
    background-color: #037924;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

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

.horizontal-container {
    display: flex;
    /* Use flexbox */
    flex-direction: row;
    /* Set the direction to horizontal (row) */
}

.button:hover {
    background-color: #0056b3;
}

.container {
    display: flex;
    justify-content: flex-end;
    /* Aligns content to the right */
    padding: 20px;
    /* Add padding for spacing */
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
</style>




<!-- const buyNFT = async () => {

    const listingData = await nftStore.GetListingData(nftData.value[0].order_hash)
    console.log(listingData)

    // console.log(listingData.transaction.input_data.parameters);

    const listingParams = listingData.transaction.input_data.parameters;

    console.log(listingParams.considerationToken)
    console.log(listingParams.considerationIdentifier)
    console.log(listingParams.considerationAmount)
    console.log(listingParams.offerer)
    console.log(listingParams.zone)
    console.log(listingParams.offerToken)
    console.log(listingParams.offerIdentifier)
    console.log(listingParams.offerAmount)
    console.log(listingParams.basicOrderType)
    console.log(listingParams.startTime)
    console.log(listingParams.endTime)
    console.log(listingParams.zoneHash)
    console.log(listingParams.salt)
    console.log(listingParams.offererConduitKey)
    console.log(listingParams.fulfillerConduitKey)
    console.log(listingParams.totalOriginalAdditionalRecipients)
    console.log(listingParams.additionalRecipients[0])
    console.log(listingParams.signature)


    // const additionalRecipient = [
    //     [ethers.BigNumber.from("2500000000000000"), "0x0000a26b00c1f0df003000390027140000faa719"]
    // ]

    const parameters = [
        '0x0000000000000000000000000000000000000000',   //considerationToken
        0,                                              //considerationIdentifier
        ethers.BigNumber.from("97500000000000000"),     //considerationAmount
        "0x92b2421a252f9329c401bd379d9926ef2162138f",   //offerer
        '0x004c00500000ad104d7dbd00e3ae0a5c00560c00',   //zone
        "0xe3a57b38d80101cf20820e3ca96c70677465fba1",   //offerToken
        4,                                              //offerIdentifier
        1,                                              //offerAmount
        0,                                              //basicOrderType
        1712031549,                                     //startTime
        1714623549,                                                                         //endTime
        '0x0000000000000000000000000000000000000000000000000000000000000000',               //zoneHash
        '24446860302761739304752683030156737591518664810215442929812934157727518685457',    //salt
        '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',               //offererConduitKey
        '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',               //fulfillerConduitKey
        1,                                                                                  //totalOriginalAdditionalRecipients
        additionalRecipient,                                                                //additionalRecipients[]
        "0x4202790b313dc1065e4f45d263d424eaf391d8a214912a1b3724be1be0983b0d70d1bad4a453397b62ab42b33a3ead2665830ab4456912e672b7cc9d50763d11"                                                                                //signature
    ]

    // let result = await contract.populateTransaction.fulfillBasicOrder_efficient_6GL6yc(parameters,
    //     {
    //         gasPrice: await provider.getGasPrice(),
    //         value: ethers.utils.parseUnits("100000000000000000", "wei"),
    //         gasLimit: ethers.BigNumber.from("300000")
    //     })
    // result.data = result.data + '00000000360c6ebe'

    // console.log(result)


    // // console.log(await signer.getAddress())
    // // // console.log("Gas Estimate:", await signer.estimateGas(result));

    // const trx = await signer.sendTransaction(result);
    // console.log(trx);




} -->