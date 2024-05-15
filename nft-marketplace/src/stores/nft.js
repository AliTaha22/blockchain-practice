import { defineStore } from 'pinia'
import axios from 'axios'
import { ethers } from 'ethers'

export const useNftStore = defineStore('nft', {
  state: () => ({
    nfts: [],
    isMetaMaskConnected: false,
    currentAccount: null,
    provider: null,

  }),
  getters: {

    getNftById: (state) => (nftId) => {
      return state.nfts.find(nft => nft.identifier === nftId);
    },

  },
  actions: {
    async fetchNfts() {
      try {
        const options = {
          method: 'GET',
          url: 'https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/0xE3A57B38D80101Cf20820E3cA96C70677465FBa1/nfts',
          headers: { accept: 'application/json' }
        };
        const res = await axios(options);
        this.nfts = res.data.nfts;
        return res.data.nfts;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchListingStatus(nftId) {
      const options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v2/orders/sepolia/seaport/listings?asset_contract_address=0xE3A57B38D80101Cf20820E3cA96C70677465FBa1&token_ids=${nftId}`,
        headers: { accept: 'application/json' }
      };

      return await axios
        .request(options)
        .then(function (response) {
          return response.data.orders[0];
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    async connectToMetaMask() {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Request access to the user's MetaMask accounts
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          this.isMetaMaskConnected = true;
          this.currentAccount = accounts[0]; // Set the current account
          console.log(this.currentAccount);
        } catch (error) {
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        console.error('MetaMask is not installed');
      }
    },
    async listForSale(nftId, amount) {

      // const url = "https://eth-sepolia.g.alchemy.com/v2/34YV2G8n7RR0O_rECRkdTqkWe1GkUZpi";
      // const private_key = "8b764ca92f524fd732cb1ae294d4b77601168ee66bd4b0e8196a8ad145039658";
      // const provider = new ethers.providers.JsonRpcProvider(url);
      // const signer = new ethers.Wallet(private_key, provider);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(await signer.getAddress());
      console.log(`amount: ${amount}`);

      let openseaFee = ethers.utils.parseEther((amount * 0.025).toString()).toString();
      let creatorEarning = ethers.utils.parseEther((amount - (amount * 0.025)).toString()).toString();

      let saltRes = await axios.get("http://127.0.0.1:3000/get-salt", {
        headers: {
          Accept: "application/json"
        }
      })
      // console.log(saltRes.data.salt)
      const parameters = {
        orderType: 0,
        offerer: this.currentAccount,
        offer: [
          {
            itemType: 2,
            token: '0xE3A57B38D80101Cf20820E3cA96C70677465FBa1',
            identifierOrCriteria: nftId,
            startAmount: amount,
            endAmount: amount
          }
        ],
        consideration: [
          {
            itemType: 0,
            token: '0x0000000000000000000000000000000000000000',
            identifierOrCriteria: 0,
            startAmount: creatorEarning,
            endAmount: creatorEarning,
            recipient: this.currentAccount
          },
          {
            itemType: 0,
            token: '0x0000000000000000000000000000000000000000',
            identifierOrCriteria: 0,
            startAmount: openseaFee,
            endAmount: openseaFee,
            recipient: '0x0000a26b00c1F0DF003000390027140000fAa719'
          }
        ],
        startTime: 1711515189,
        endTime: 1714193589,
        zone: '0x004C00500000aD104D7DBd00e3ae0A5C00560C00',
        zoneHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        salt: saltRes.data.salt,
        conduitKey: '0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000',
        totalOriginalConsiderationItems: 2,
        counter: '0'
      }

      // //0x360c6ebe00000000000000000000000000000000000000007e8e74711f8ef12c
      // //24446860302761739304752683030156737591518664810215442929814620341718157728514

      console.log("Navigating to listingForSale with nftId:", nftId);
      const domain = {
        name: "Seaport",
        version: "1.6",
        chainId: (await signer.getChainId()).toString(),
        verifyingContract: "0x0000000000000068F116a894984e2DB1123eB395",
      };

      //  const sig = await signParameter(parameters);
      const EIP_712_ORDER_TYPE = {
        OrderComponents: [
          { name: "offerer", type: "address" },
          { name: "zone", type: "address" },
          { name: "offer", type: "OfferItem[]" },
          { name: "consideration", type: "ConsiderationItem[]" },
          { name: "orderType", type: "uint8" },
          { name: "startTime", type: "uint256" },
          { name: "endTime", type: "uint256" },
          { name: "zoneHash", type: "bytes32" },
          { name: "salt", type: "uint256" },
          { name: "conduitKey", type: "bytes32" },
          { name: "counter", type: "uint256" },
        ],
        OfferItem: [
          { name: "itemType", type: "uint8" },
          { name: "token", type: "address" },
          { name: "identifierOrCriteria", type: "uint256" },
          { name: "startAmount", type: "uint256" },
          { name: "endAmount", type: "uint256" },
        ],
        ConsiderationItem: [
          { name: "itemType", type: "uint8" },
          { name: "token", type: "address" },
          { name: "identifierOrCriteria", type: "uint256" },
          { name: "startAmount", type: "uint256" },
          { name: "endAmount", type: "uint256" },
          { name: "recipient", type: "address" },
        ],
      };
      console.log(EIP_712_ORDER_TYPE);

      const payload = ethers.utils._TypedDataEncoder.getPayload(
        domain,
        EIP_712_ORDER_TYPE,
        parameters
      );
      console.log(payload.message);
      let signerSignedOffer = await signer._signTypedData(
        domain,
        EIP_712_ORDER_TYPE,
        payload.message
      );
      console.log('signerSignedOfer: ' + signerSignedOffer);
      signerSignedOffer = ethers.utils.splitSignature(signerSignedOffer).compact;
      // console.log('signature: ' + sig);
      console.log('signature typed: ' + signerSignedOffer);
      console.log(signer);

      const options = {
        method: 'POST',
        url: 'https://testnets-api.opensea.io/api/v2/orders/sepolia/seaport/listings',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: {
          parameters,
          signature: signerSignedOffer,
          protocol_address: '0x0000000000000068F116a894984e2DB1123eB395'
        }
      };

      await axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error.data);
        });
    },
    async SendTransaction(transferAddress, amountETH) {

      // console.log(amountETH.value);
      // console.log(currentAccount.value);
      // console.log(transferAddress.value);
      // console.log(amountETH.value);
      // console.log(ethers.utils.parseEther(amountETH))

      //to: 0xa1eB35A03D01611f661220349037F5E4C1D0F53F

      // const price = ethers.utils.parseEther(amountETH.toString);

      const value = ethers.utils.parseEther(amountETH.value);
      console.log(value.toString());
      const transactionObject = {
        from: this.currentAccount,
        to: transferAddress.value,
        value: value.toString(), // Convert value to string explicitly
        gasLimit: '0x5028',
        maxPriorityFeePerGas: '0x3b9aca00',
        maxFeePerGas: '0x2540be400',
      };

      console.log(transactionObject);
      const result = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionObject],
      }).then((txHash) => console.log(txHash))
        .catch((error) => console.error(error));

      console.log(result);
    },
    async GetListingData(txHash) {

    //for TokenID 3,5,6 USE chain address: 0x00000000000000adc04c56bf30ac9d3c0aaf14dc
    //default chain address: 0x0000000000000068f116a894984e2db1123eb395
      const options = {
        method: 'POST',
        url: 'https://testnets-api.opensea.io/api/v2/offers/fulfillment_data',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        data: {
          offer: {
            hash: txHash,
            chain: 'sepolia',
            protocol_address: '0x00000000000000adc04c56bf30ac9d3c0aaf14dc'
          },
          fulfiller: { address: this.currentAccount }
        }
      };

      return axios
        .request(options)
        .then(function (response) {
          // console.log(response.data.fulfillment_data);
          return response.data.fulfillment_data;
        })
        .catch(function (error) {
          console.error(error);
        });

    },
    async buyNFT(contract, txHash) {

      const prov = new ethers.providers.Web3Provider(window.ethereum);
      const signer = prov.getSigner();
      const listingData = await this.GetListingData(txHash)
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

      console.log(typeof (listingData.transaction.value))
      const strValue = listingData.transaction.value.toString();
      console.log(typeof (strValue))


      const parameters = [
        listingParams.considerationToken,
        listingParams.considerationIdentifier,
        listingParams.considerationAmount,
        listingParams.offerer,
        listingParams.zone,
        listingParams.offerToken,
        listingParams.offerIdentifier,
        listingParams.offerAmount,
        listingParams.basicOrderType,
        listingParams.startTime,
        listingParams.endTime,
        listingParams.zoneHash,
        listingParams.salt,
        listingParams.offererConduitKey,
        listingParams.fulfillerConduitKey,
        listingParams.totalOriginalAdditionalRecipients,
        listingParams.additionalRecipients,
        listingParams.signature
      ]
      let result = await contract.populateTransaction.fulfillBasicOrder_efficient_6GL6yc(parameters,
        {
          gasPrice: await prov.getGasPrice(),
          value: ethers.utils.parseUnits(strValue, "wei"),
          gasLimit: ethers.BigNumber.from("300000")
        })
      result.data = result.data + '00000000360c6ebe'

      console.log(result)


      // // console.log(await signer.getAddress())
      // // // console.log("Gas Estimate:", await signer.estimateGas(result));

      const trx = await signer.sendTransaction(result);
      console.log(trx);
    },
    async advanceBuyNFT(contract, txHash, recipientAddress){


      const prov = new ethers.providers.Web3Provider(window.ethereum);
      const signer = prov.getSigner();
      const listingData = await this.GetListingData(txHash)
      console.log(listingData)

    // console.log(listingData.orders[0].parameters);

    const listingParams = listingData.orders[0].parameters;

    // console.log(listingParams.offerer)
    // console.log(listingParams.zone)
    // console.log(listingParams.offer)
    // console.log(listingParams.consideration)
    // console.log(listingParams.orderType)
    // console.log(listingParams.startTime)
    // console.log(listingParams.endTime)
    // console.log(listingParams.zoneHash)
    // console.log(listingParams.salt)
    // console.log(listingParams.conduitKey)
    // console.log(listingParams.counter)
    // console.log(listingData.orders[0].signature)

    // console.log(typeof(listingData.transaction.value))
    // const strValue = listingData.transaction.value.toString();
    // console.log(typeof(strValue))

    const offerItem = [
        [
            listingParams.offer[0].itemType,
            listingParams.offer[0].token,
            listingParams.offer[0].identifierOrCriteria,
            listingParams.offer[0].startAmount,
            listingParams.offer[0].endAmount,
        ]
    ]
    const consideration = [
        [
            listingParams.consideration[0].itemType,
            listingParams.consideration[0].token,
            listingParams.consideration[0].identifierOrCriteria,
            listingParams.consideration[0].startAmount,
            listingParams.consideration[0].endAmount,
            listingParams.consideration[0].recipient,
        ],
        [
            listingParams.consideration[1].itemType,
            listingParams.consideration[1].token,
            listingParams.consideration[1].identifierOrCriteria,
            listingParams.consideration[1].startAmount,
            listingParams.consideration[1].endAmount,
            listingParams.consideration[1].recipient,
        ]
    ]
    const parameters = [
        [
            listingParams.offerer,
            listingParams.zone,
            offerItem,
            consideration,
            listingParams.orderType,
            listingParams.startTime,
            listingParams.endTime,
            listingParams.zoneHash,
            listingParams.salt,
            listingParams.conduitKey,
            listingParams.counter,
        ],
        1,
        1,
        listingData.orders[0].signature,
        []
    ];

    const criteriaResolver = []

    console.log(parameters)
    let result = await contract.populateTransaction.fulfillAdvancedOrder(
        parameters,
        criteriaResolver,
        listingParams.conduitKey,
        recipientAddress,
        {
            gasPrice: await prov.getGasPrice(),
            value: ethers.utils.parseUnits("200000000000000000", "wei"),
            gasLimit: ethers.BigNumber.from("300000")
        })
    result.data = result.data + '00000000360c6ebe'

    console.log(result)


    // // console.log(await signer.getAddress())
    // // // console.log("Gas Estimate:", await signer.estimateGas(result));

    const trx = await signer.sendTransaction(result);
    console.log(trx);
    },
    async getNFTOwner(nftId) {
      console.log(nftId)
      const options = {
        method: 'GET',
        url: `https://testnets-api.opensea.io/api/v2/chain/sepolia/contract/0xe3a57b38d80101cf20820e3ca96c70677465fba1/nfts/${nftId}`,
        headers: {accept: 'application/json'}
      };
      return await axios
        .request(options)
        .then(function (response) {
          return response.data.nft.owners[0].address;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    // const parsedTransaction = contract.interface.parseTransaction(tx);
    // console.log("PARSED TRANSACTION: ", parsedTransaction);

  },
  persist: true,  //it keeps the webpage content stored inside device i.e. refreshing webpage will not remove its content.
});
