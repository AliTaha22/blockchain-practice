import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplBubblegum } from '@metaplex-foundation/mpl-bubblegum'
import { generateSigner, keypairIdentity, none } from '@metaplex-foundation/umi'
import {
    createTree, fetchMerkleTree, fetchTreeConfigFromSeeds, mintV1,
    parseLeafFromMintV1Transaction, findLeafAssetIdPda
} from '@metaplex-foundation/mpl-bubblegum'
import { Keypair, PublicKey } from '@solana/web3.js'

const privateKey = [7, 148, 29, 164, 175, 231, 168, 110, 194, 49, 35, 238, 18, 17, 174, 137, 172, 59, 228, 73, 100, 138, 25, 108, 120, 155, 185, 68, 90, 19, 89, 207, 205, 200, 199, 233, 184, 208, 224, 157, 31, 118, 216, 162, 118, 148, 15, 74, 154, 34, 89, 54, 127, 14, 143, 54, 245, 184, 89, 188, 206, 191, 98, 57];


//address of the merkleTree that we created.
const merkleTreeAddress = "CHfineQebeaCt5fSMgKuxpEFRjTrEJgF68VGjtDCmF6L";   //Tree config: 5bKZbZU4oEbqM9qwVuSmurbzu9z4HVnH2nfnHrERVLtU


const umi = createUmi('https://api.devnet.solana.com').use(mplBubblegum())
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(privateKey))


umi.use(keypairIdentity(keypair));


const create_Tree = async () => {

    const merkleTree = generateSigner(umi)
    console.log(merkleTree);
    const builder = await createTree(umi, {
        merkleTree,
        maxDepth: 14,
        maxBufferSize: 64,
    })
    const result = await builder.sendAndConfirm(umi)
    console.log(result);

}
const fetch_MerkleTree = async () => {

    const merkleTreeAccount = await fetchMerkleTree(umi, merkleTreeAddress);
    console.log(merkleTreeAccount);
}
const fetch_TreeConfig = async () => {

    const treeConfig = await fetchTreeConfigFromSeeds(umi, { merkleTree: merkleTreeAddress });
    console.log(treeConfig);
}
const mint_cNFT = async () => {

    const leafOwner = new PublicKey(umi.identity.publicKey);
    const merkleTree = new PublicKey(merkleTreeAddress);

    const result = await mintV1(umi, {
        leafOwner,
        merkleTree,
        metadata: {
            name: 'Natures Prophet cNFT',
            uri: 'https://bronze-defeated-tuna-485.mypinata.cloud/ipfs/QmPWQDzeArLAzXYLpSW6uhpu34vJMnH8Bb3pwVZe2uDA99',
            sellerFeeBasisPoints: 500, // 5%
            collection: none(),
            creators: [
                { address: umi.identity.publicKey, verified: false, share: 100 },
            ],
        },
    }).sendAndConfirm(umi)
    console.log(result);
}
const getAssetID = async () => {

    // const leafOwner = new PublicKey(umi.identity.publicKey);
    const merkleTree = new PublicKey(merkleTreeAddress);
    // const metadata = {
    //     name: 'Natures Prophet cNFT',
    //     uri: 'https://bronze-defeated-tuna-485.mypinata.cloud/ipfs/QmPWQDzeArLAzXYLpSW6uhpu34vJMnH8Bb3pwVZe2uDA99',
    //     sellerFeeBasisPoints: 500, // 5%
    //     collection: none(),
    //     creators: [
    //         { address: umi.identity.publicKey, verified: false, share: 100 },
    //     ],
    // }

    // const { signature } = await mintV1(umi, { leafOwner, merkleTree, metadata }).sendAndConfirm(umi, { confirm: { commitment: 'confirmed' } });

    const signature = [
        98, 245, 240, 207, 109,  93, 152, 157,  87, 170,  58,
       129,  47,  15,  99, 190, 119,  52, 222, 158, 197,  10,
       255, 174,  10,  73,   3,  85,  79,  65, 199,  97, 111,
        86, 146, 161,  26, 166, 193, 129, 159, 168, 249, 160,
       122,  22, 187, 159,  73, 236,  23,  59,  59,  50, 160,
        13,  91, 190, 126, 189, 236,  80,  16,   2
     ]

    // console.log(signature);
    const leaf = await parseLeafFromMintV1Transaction(umi, signature);
    const assetId = findLeafAssetIdPda(umi, { merkleTree, leafIndex: leaf.nonce });
    return assetId;

}
const fetch_cNFT = async (assetId) => {
    
    const rpcAsset = await umi.rpc.getAsset(assetId);
    console.log(rpcAsset);

}

const main = async () => {

    // create_Tree();
    // fetch_MerkleTree();
    // fetch_TreeConfig();
    // mint_cNFT();
    const assetId = await getAssetID();
    fetch_cNFT(assetId[0]);

}
main();



// const merkleTreeSigner = [
//     216, 207,  30,  84, 130, 147, 142, 203,  54,  51, 227,
//      50, 226,  56, 193,  91,  11, 165, 104,   9, 245,  21,
//     102, 184,  38, 226, 243, 193, 156, 154, 105, 170, 167,
//     181, 161, 104, 192, 244, 195,  40, 179, 200, 226,  20,
//      91,  16, 121, 237, 181, 215,  76,  84, 137, 187,  97,
//     157, 145, 212,  28,  11, 228, 147,  77, 253
// ];
// const merkleTree = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(merkleTreeSigner))
// console.log(merkleTree);