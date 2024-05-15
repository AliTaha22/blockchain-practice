import { ethers } from 'ethers';


let private_key = "8b764ca92f524fd732cb1ae294d4b77601168ee66bd4b0e8196a8ad145039658";
let url = "https://eth-sepolia.g.alchemy.com/v2/34YV2G8n7RR0O_rECRkdTqkWe1GkUZpi";

//provider connects us to an ethereum node and enables us to interact with the blockchain & fetch its status & data.
const provider = new ethers.providers.JsonRpcProvider(url);
//const provider = new ethers.providers.StaticJsonRpcProvider(url);
// const provider = new ethers.providers.Web3Provider(window.ethereum);


//signer enables us to send tx's to the blockchain.
const signer = new ethers.Wallet(private_key, provider);
let contract = null;


const sendTx = async () => {
//gas fee
let gasfee = await provider.getGasPrice();


let address = await signer.getAddress()
let tx = await signer.sendTransaction({ to:"0xa1eB35A03D01611f661220349037F5E4C1D0F53F",
                         from: address,
                         value: ethers.utils.parseEther("0.001"),
                        gasPrice: gasfee,
                        gasLimit: ethers.BigNumber.from(21000)})

console.log(tx);

}
const getBalance = async (addr) =>{

    const balance = await provider.getBalance(addr);
    console.log(ethers.utils.formatEther(balance) + " SepoliaETH");

}
const signAndVerifyMessage = async () => {

    
    let message = "Hello World";
    const signature = await signer.signMessage(message);
    console.log("Signature: ", signature);

    let verifiedAddress = ethers.utils.verifyMessage("message",signature);
    console.log("Signer: ", verifiedAddress);

}
const createContractInstance = async () => {



    const contractAddress = '0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC'

    const contractABI =
        [{ "inputs": [{ "internalType": "address", "name": "conduitController", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "BadContractSignature", "type": "error" }, { "inputs": [], "name": "BadFraction", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BadReturnValueFromERC20OnTransfer", "type": "error" }, { "inputs": [{ "internalType": "uint8", "name": "v", "type": "uint8" }], "name": "BadSignatureV", "type": "error" }, { "inputs": [], "name": "CannotCancelOrder", "type": "error" }, { "inputs": [], "name": "ConsiderationCriteriaResolverOutOfRange", "type": "error" }, { "inputs": [], "name": "ConsiderationLengthNotEqualToTotalOriginal", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "considerationIndex", "type": "uint256" }, { "internalType": "uint256", "name": "shortfallAmount", "type": "uint256" }], "name": "ConsiderationNotMet", "type": "error" }, { "inputs": [], "name": "CriteriaNotEnabledForItem", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256[]", "name": "identifiers", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "ERC1155BatchTransferGenericFailure", "type": "error" }, { "inputs": [], "name": "InexactFraction", "type": "error" }, { "inputs": [], "name": "InsufficientNativeTokensSupplied", "type": "error" }, { "inputs": [], "name": "Invalid1155BatchTransferEncoding", "type": "error" }, { "inputs": [], "name": "InvalidBasicOrderParameterEncoding", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "conduit", "type": "address" }], "name": "InvalidCallToConduit", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "address", "name": "conduit", "type": "address" }], "name": "InvalidConduit", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "InvalidContractOrder", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "InvalidERC721TransferAmount", "type": "error" }, { "inputs": [], "name": "InvalidFulfillmentComponentData", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "InvalidMsgValue", "type": "error" }, { "inputs": [], "name": "InvalidNativeOfferItem", "type": "error" }, { "inputs": [], "name": "InvalidProof", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "InvalidRestrictedOrder", "type": "error" }, { "inputs": [], "name": "InvalidSignature", "type": "error" }, { "inputs": [], "name": "InvalidSigner", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }], "name": "InvalidTime", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "fulfillmentIndex", "type": "uint256" }], "name": "MismatchedFulfillmentOfferAndConsiderationComponents", "type": "error" }, { "inputs": [{ "internalType": "enum Side", "name": "side", "type": "uint8" }], "name": "MissingFulfillmentComponentOnAggregation", "type": "error" }, { "inputs": [], "name": "MissingItemAmount", "type": "error" }, { "inputs": [], "name": "MissingOriginalConsiderationItems", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "NativeTokenTransferGenericFailure", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "NoContract", "type": "error" }, { "inputs": [], "name": "NoReentrantCalls", "type": "error" }, { "inputs": [], "name": "NoSpecifiedOrdersAvailable", "type": "error" }, { "inputs": [], "name": "OfferAndConsiderationRequiredOnFulfillment", "type": "error" }, { "inputs": [], "name": "OfferCriteriaResolverOutOfRange", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "OrderAlreadyFilled", "type": "error" }, { "inputs": [{ "internalType": "enum Side", "name": "side", "type": "uint8" }], "name": "OrderCriteriaResolverOutOfRange", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "OrderIsCancelled", "type": "error" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "OrderPartiallyFilled", "type": "error" }, { "inputs": [], "name": "PartialFillsNotEnabledForOrder", "type": "error" }, { "inputs": [], "name": "TStoreAlreadyActivated", "type": "error" }, { "inputs": [], "name": "TStoreNotSupported", "type": "error" }, { "inputs": [], "name": "TloadTestContractDeploymentFailed", "type": "error" }, { "inputs": [{ "internalType": "address", "name": "token", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TokenTransferGenericFailure", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "considerationIndex", "type": "uint256" }], "name": "UnresolvedConsiderationCriteria", "type": "error" }, { "inputs": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "offerIndex", "type": "uint256" }], "name": "UnresolvedOfferCriteria", "type": "error" }, { "inputs": [], "name": "UnusedItemParameters", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newCounter", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "offerer", "type": "address" }], "name": "CounterIncremented", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "offerer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "zone", "type": "address" }], "name": "OrderCancelled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "offerer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "zone", "type": "address" }, { "indexed": false, "internalType": "address", "name": "recipient", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "indexed": false, "internalType": "struct SpentItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "indexed": false, "internalType": "struct ReceivedItem[]", "name": "consideration", "type": "tuple[]" }], "name": "OrderFulfilled", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }, { "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "indexed": false, "internalType": "struct OrderParameters", "name": "orderParameters", "type": "tuple" }], "name": "OrderValidated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "bytes32[]", "name": "orderHashes", "type": "bytes32[]" }], "name": "OrdersMatched", "type": "event" }, { "inputs": [], "name": "__activateTstore", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "counter", "type": "uint256" }], "internalType": "struct OrderComponents[]", "name": "orders", "type": "tuple[]" }], "name": "cancel", "outputs": [{ "internalType": "bool", "name": "cancelled", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "uint120", "name": "numerator", "type": "uint120" }, { "internalType": "uint120", "name": "denominator", "type": "uint120" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, { "internalType": "bytes", "name": "extraData", "type": "bytes" }], "internalType": "struct AdvancedOrder", "name": "", "type": "tuple" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "enum Side", "name": "side", "type": "uint8" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "bytes32[]", "name": "criteriaProof", "type": "bytes32[]" }], "internalType": "struct CriteriaResolver[]", "name": "", "type": "tuple[]" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "fulfillAdvancedOrder", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "uint120", "name": "numerator", "type": "uint120" }, { "internalType": "uint120", "name": "denominator", "type": "uint120" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, { "internalType": "bytes", "name": "extraData", "type": "bytes" }], "internalType": "struct AdvancedOrder[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "enum Side", "name": "side", "type": "uint8" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "bytes32[]", "name": "criteriaProof", "type": "bytes32[]" }], "internalType": "struct CriteriaResolver[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "maximumFulfilled", "type": "uint256" }], "name": "fulfillAvailableAdvancedOrders", "outputs": [{ "internalType": "bool[]", "name": "", "type": "bool[]" }, { "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[][]", "name": "", "type": "tuple[][]" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "maximumFulfilled", "type": "uint256" }], "name": "fulfillAvailableOrders", "outputs": [{ "internalType": "bool[]", "name": "", "type": "bool[]" }, { "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "considerationToken", "type": "address" }, { "internalType": "uint256", "name": "considerationIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "considerationAmount", "type": "uint256" }, { "internalType": "address payable", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "internalType": "address", "name": "offerToken", "type": "address" }, { "internalType": "uint256", "name": "offerIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "offerAmount", "type": "uint256" }, { "internalType": "enum BasicOrderType", "name": "basicOrderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "offererConduitKey", "type": "bytes32" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalAdditionalRecipients", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct AdditionalRecipient[]", "name": "additionalRecipients", "type": "tuple[]" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct BasicOrderParameters", "name": "", "type": "tuple" }], "name": "fulfillBasicOrder", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "considerationToken", "type": "address" }, { "internalType": "uint256", "name": "considerationIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "considerationAmount", "type": "uint256" }, { "internalType": "address payable", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "internalType": "address", "name": "offerToken", "type": "address" }, { "internalType": "uint256", "name": "offerIdentifier", "type": "uint256" }, { "internalType": "uint256", "name": "offerAmount", "type": "uint256" }, { "internalType": "enum BasicOrderType", "name": "basicOrderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "offererConduitKey", "type": "bytes32" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalAdditionalRecipients", "type": "uint256" }, { "components": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct AdditionalRecipient[]", "name": "additionalRecipients", "type": "tuple[]" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct BasicOrderParameters", "name": "", "type": "tuple" }], "name": "fulfillBasicOrder_efficient_6GL6yc", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order", "name": "", "type": "tuple" }, { "internalType": "bytes32", "name": "fulfillerConduitKey", "type": "bytes32" }], "name": "fulfillOrder", "outputs": [{ "internalType": "bool", "name": "fulfilled", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "contractOfferer", "type": "address" }], "name": "getContractOffererNonce", "outputs": [{ "internalType": "uint256", "name": "nonce", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "offerer", "type": "address" }], "name": "getCounter", "outputs": [{ "internalType": "uint256", "name": "counter", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "counter", "type": "uint256" }], "internalType": "struct OrderComponents", "name": "", "type": "tuple" }], "name": "getOrderHash", "outputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "orderHash", "type": "bytes32" }], "name": "getOrderStatus", "outputs": [{ "internalType": "bool", "name": "isValidated", "type": "bool" }, { "internalType": "bool", "name": "isCancelled", "type": "bool" }, { "internalType": "uint256", "name": "totalFilled", "type": "uint256" }, { "internalType": "uint256", "name": "totalSize", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "incrementCounter", "outputs": [{ "internalType": "uint256", "name": "newCounter", "type": "uint256" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "information", "outputs": [{ "internalType": "string", "name": "version", "type": "string" }, { "internalType": "bytes32", "name": "domainSeparator", "type": "bytes32" }, { "internalType": "address", "name": "conduitController", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "uint120", "name": "numerator", "type": "uint120" }, { "internalType": "uint120", "name": "denominator", "type": "uint120" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }, { "internalType": "bytes", "name": "extraData", "type": "bytes" }], "internalType": "struct AdvancedOrder[]", "name": "", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "enum Side", "name": "side", "type": "uint8" }, { "internalType": "uint256", "name": "index", "type": "uint256" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "bytes32[]", "name": "criteriaProof", "type": "bytes32[]" }], "internalType": "struct CriteriaResolver[]", "name": "", "type": "tuple[]" }, { "components": [{ "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "offerComponents", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "considerationComponents", "type": "tuple[]" }], "internalType": "struct Fulfillment[]", "name": "", "type": "tuple[]" }, { "internalType": "address", "name": "recipient", "type": "address" }], "name": "matchAdvancedOrders", "outputs": [{ "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order[]", "name": "", "type": "tuple[]" }, { "components": [{ "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "offerComponents", "type": "tuple[]" }, { "components": [{ "internalType": "uint256", "name": "orderIndex", "type": "uint256" }, { "internalType": "uint256", "name": "itemIndex", "type": "uint256" }], "internalType": "struct FulfillmentComponent[]", "name": "considerationComponents", "type": "tuple[]" }], "internalType": "struct Fulfillment[]", "name": "", "type": "tuple[]" }], "name": "matchOrders", "outputs": [{ "components": [{ "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifier", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ReceivedItem", "name": "item", "type": "tuple" }, { "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }], "internalType": "struct Execution[]", "name": "", "type": "tuple[]" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "components": [{ "components": [{ "internalType": "address", "name": "offerer", "type": "address" }, { "internalType": "address", "name": "zone", "type": "address" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }], "internalType": "struct OfferItem[]", "name": "offer", "type": "tuple[]" }, { "components": [{ "internalType": "enum ItemType", "name": "itemType", "type": "uint8" }, { "internalType": "address", "name": "token", "type": "address" }, { "internalType": "uint256", "name": "identifierOrCriteria", "type": "uint256" }, { "internalType": "uint256", "name": "startAmount", "type": "uint256" }, { "internalType": "uint256", "name": "endAmount", "type": "uint256" }, { "internalType": "address payable", "name": "recipient", "type": "address" }], "internalType": "struct ConsiderationItem[]", "name": "consideration", "type": "tuple[]" }, { "internalType": "enum OrderType", "name": "orderType", "type": "uint8" }, { "internalType": "uint256", "name": "startTime", "type": "uint256" }, { "internalType": "uint256", "name": "endTime", "type": "uint256" }, { "internalType": "bytes32", "name": "zoneHash", "type": "bytes32" }, { "internalType": "uint256", "name": "salt", "type": "uint256" }, { "internalType": "bytes32", "name": "conduitKey", "type": "bytes32" }, { "internalType": "uint256", "name": "totalOriginalConsiderationItems", "type": "uint256" }], "internalType": "struct OrderParameters", "name": "parameters", "type": "tuple" }, { "internalType": "bytes", "name": "signature", "type": "bytes" }], "internalType": "struct Order[]", "name": "", "type": "tuple[]" }], "name": "validate", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }]



    contract = new ethers.Contract(contractAddress, contractABI, provider);
    // console.log(contract);

}

const connectContract = async () => {

    const contractAddress = "0x0000000000000068F116a894984e2DB1123eB395";

    const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "ECDSAInvalidSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "length",
                "type": "uint256"
            }
        ],
        "name": "ECDSAInvalidSignatureLength",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "ECDSAInvalidSignatureS",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "ERC2612ExpiredSignature",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "signer",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC2612InvalidSigner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "currentNonce",
                "type": "uint256"
            }
        ],
        "name": "InvalidAccountNonce",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidShortString",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "str",
                "type": "string"
            }
        ],
        "name": "StringTooLong",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "EIP712DomainChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "burnFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eip712Domain",
        "outputs": [
            {
                "internalType": "bytes1",
                "name": "fields",
                "type": "bytes1"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "version",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "chainId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "verifyingContract",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
            },
            {
                "internalType": "uint256[]",
                "name": "extensions",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "nonces",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
            },
            {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
            }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
    ];

    // The Contract object
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);



    //----------------------------------------READ ONLY OPERATIONS------------------------------------------
    //let name = contract.name();
    // let owner = await contract.owner();
    // let symbol = await contract.symbol();
    // let balance = await contract.balanceOf(owner);

    // console.log("Contract Owner: ", owner);
    // console.log("Contract symbol: ", symbol);
    // console.log("Owner Balance: ", ethers.utils.formatEther(balance));
    //--------------------------------------------------------------------------------------------------------


    //----------------------------------------COMMUNICATION WITH BLOCKCHAIN------------------------------------------

    //sending transaction
    // const contractSigner = contract.connect(signer);
    // const mytoken = ethers.utils.parseUnits("1.0", 3);

    // const tx = await contractSigner.transfer("0xa1eB35A03D01611f661220349037F5E4C1D0F53F", mytoken);

    //console.log("Transaction: ", tx);
    //--------------------------------------------------------------------------------------------------------



    //----------------------------------------LISTENING TO AN EVENT------------------------------------------
    // contract.on("Transfer", (from, to, amount, event) => {
    // console.log(`${from} sent ${ethers.utils.formatEther(amount)} ETH to ${to}`);});

    //----------------------------------------LISTENING TO AN EVENT WITH FILTER------------------------------------------

    // const myAddress = "0xa1eB35A03D01611f661220349037F5E4C1D0F53F";
    // const filter = contract.filters.Transfer(null, myAddress)
    // // Receive an event when that filter occurs
    // contract.on(filter, (from, to, amount, event) => {
    // console.log(`I got ${ ethers.utils.formatEther(amount) } from ${ from }.`);


    //----------------------------------------PARSING TRANSACTION------------------------------------------
    // const txn = "0xc09ef3dc9f228f6d859aabfcbf6f7a3ab7797901744854063442ab67b32e6664";
    // const data = "0x23b872dd0000000000000000000000008ba1f109551bd432803012645ac136ddd64dba72000000000000000000000000ab7c8803962c0f2f5bbbe3fa8bf41cd82aa1923c0000000000000000000000000000000000000000000000000de0b6b3a7640000";
    // const value = ethers.utils.parseUnits("1.0", 5);
    // const dummyTransaction = {
    //     data: data,
    //     value: value,
    // };

    // const parsedTransaction =  contract.interface.parseTransaction({txn})
    // console.log("PARSED TRANSACTION: ", parsedTransaction);

    provider.getTransaction("0xc09ef3dc9f228f6d859aabfcbf6f7a3ab7797901744854063442ab67b32e6664").then((tx) => {
        if (tx) {
            // Assuming `contract` is your contract instance
            const parsedTransaction = contract.interface.parseTransaction(tx);
    
            // Log the parsed transaction
            console.log("PARSED TRANSACTION: ", parsedTransaction);
        } else {
            console.log("Transaction not found");
        }
    }).catch((err) => {
        console.error("Error:", err);
    });
}

const buyNFT = async () => {

    console.log(contract);

    const additionalRecipient = [
    // [97500000000000000, '0x92b2421a252F9329C401Bd379D9926Ef2162138f'],
    [25000000000000000, '0x0000a26b00c1F0DF003000390027140000fAa719'],
    ];


    // console.log(`provider: ${provider}`);
    // console.log(`signer: ${signer}`);


    const parameters = [
        '0x0000000000000000000000000000000000000000',
        0,
        97500000000000000,
        '0x92b2421a252f9329c401bd379d9926ef2162138f',
        '0x004C00500000aD104D7DBd00e3ae0A5C00560C00',
        '0xE3A57B38D80101Cf20820E3cA96C70677465FBa1',
        4,
        1,
        1711953795,
        1714193589,
        '0x0000000000000000000000000000000000000000000000000000000000000000',
        '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
        '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
        1,
        additionalRecipient,
        '0x9f1967b9d5da3be7b6a4eb32635edf448e1246f523a9b16abde7c0020e987ed14871d46c5c68714634f3e9f9f912e8d284b5452a05b70a0eef9468c3178922f0'
    ];

    // const contractSigner = contract.connect(signer);
    // console.log(contractSigner)

    // const result = await contract.fulfillBasicOrder(parameters,
    // {
    //     gasPrice: await provider.getGasPrice(),
    //     value: ethers.utils.parseUnits("25000000000000000","wei")
    // });
    
    // const gas = await signer.estimateGasresult(result)
    // console.log(gas)

    // const trx = await signer.signTransaction(result);
    // console.log(trx);

}

//anonymous function, self-invoking function.
(async () => {
        //sendTx();
    // getBalance(signer.getAddress());
    //signAndVerifyMessage();
    connectContract();
    // createContractInstance();
    // buyNFT();

})();


// const main = async () => {



// }
// main();