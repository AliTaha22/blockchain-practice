import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata, createNft, fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata'
import { generateSigner, percentAmount, keypairIdentity } from '@metaplex-foundation/umi'
import { Keypair, PublicKey } from '@solana/web3.js'


const privateKey = [7, 148, 29, 164, 175, 231, 168, 110, 194, 49, 35, 238, 18, 17, 174, 137, 172, 59, 228, 73, 100, 138, 25, 108, 120, 155, 185, 68, 90, 19, 89, 207, 205, 200, 199, 233, 184, 208, 224, 157, 31, 118, 216, 162, 118, 148, 15, 74, 154, 34, 89, 54, 127, 14, 143, 54, 245, 184, 89, 188, 206, 191, 98, 57];
const payer = Keypair.fromSecretKey(new Uint8Array(Buffer.from(privateKey, 'base64')));
const mintPublicKey = new PublicKey('Aj34up27qktfRwodKApJhRo44U6QwkbNVSAswaCnekgw'); //NFT mint account address

const umi = createUmi('https://api.devnet.solana.com').use(mplTokenMetadata());
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(privateKey))


umi.use(keypairIdentity(keypair));


const createNFT = async () => {

    const mint = generateSigner(umi)

    await createNft(umi, {
        mint,
        name: 'Zeus NFT',
        uri: 'https://bronze-defeated-tuna-485.mypinata.cloud/ipfs/QmQN6WT33WSdtMtrTTMon1f6SnzHt1nE4xqhZBXcb2q89w',
        sellerFeeBasisPoints: percentAmount(5.5),
    }).sendAndConfirm(umi)

}

const fetchNFTData = async () => {

    const asset = await fetchDigitalAsset(umi, mintPublicKey);
    console.log(asset);
}


const main = async () => {

    fetchNFTData();

}
main();