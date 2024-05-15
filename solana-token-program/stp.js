import {
    clusterApiUrl, Connection, Keypair, PublicKey, LAMPORTS_PER_SOL,
    sendAndConfirmTransaction, SystemProgram, Transaction
} from '@solana/web3.js';
import {
    createMint, getAccount, getMint, getOrCreateAssociatedTokenAccount, mintTo, transfer,
    createInitializeMetadataPointerInstruction, createInitializeMintInstruction, ExtensionType, getMintLen, LENGTH_SIZE,
    TOKEN_2022_PROGRAM_ID, TYPE_SIZE,
} from '@solana/spl-token';
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';


const privateKey = [7, 148, 29, 164, 175, 231, 168, 110, 194, 49, 35, 238, 18, 17, 174, 137, 172, 59, 228, 73, 100, 138, 25, 108, 120, 155, 185, 68, 90, 19, 89, 207, 205, 200, 199, 233, 184, 208, 224, 157, 31, 118, 216, 162, 118, 148, 15, 74, 154, 34, 89, 54, 127, 14, 143, 54, 245, 184, 89, 188, 206, 191, 98, 57];
const privateKey2 = [149, 73, 4, 143, 108, 60, 243, 12, 212, 189, 69, 170, 72, 142, 53, 38, 78, 53, 120, 56, 137, 38, 108, 67, 62, 252, 86, 191, 29, 236, 44, 208, 245, 203, 140, 182, 24, 57, 94, 251, 112, 169, 176, 94, 117, 151, 170, 36, 210, 242, 125, 101, 185, 160, 72, 166, 189, 188, 220, 14, 209, 136, 185, 252];


const payer = Keypair.fromSecretKey(new Uint8Array(Buffer.from(privateKey, 'base64')));
const payer2 = Keypair.fromSecretKey(new Uint8Array(Buffer.from(privateKey2, 'base64')));
const mintPublicKey = new PublicKey('2dewgNoHgD5ggWhcnD1USb7Aj5VtNrXi7rLVxuUMpkxd'); //token program: mint account address
const mintPublicKey2022 = new PublicKey('HYUuZnR3CcUsgk5x3dUzV84dMsLRaRyMa7Ac2SmKuMxw'); //token program 2022: mint account address


let mint = new PublicKey('DKKU8EV9Q27xqU5zQ1BSF5t3ZZjTrUxL8f3kikWBuVRe');
let tokenAccount = null;
let tokenAccount2 = null;

const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed'
);

const createMintAccount = async () => {
    //creating a mint account essentially means creating an ERC-20 token contract

    //wallet address will have the authority to mint and freeze tokens.
    const mintAuthority = payer.publicKey;
    const freezeAuthority = payer.publicKey;

    //creating a mint account which will hold the information of our token i.e. address,supply etc
    mint = await createMint(
        connection,
        payer,
        mintAuthority,
        freezeAuthority,
        9
    );
    console.log(mint.toBase58());
    //Tokens when initially created by spl-token have no supply:
}
const mintInfo = async () => {
    //returns details about the mint account i.e. address, mint authority, freeze authority, supply etc

    return await getMint(connection, mintPublicKey);                                //Token Program
    //return await getMint(connection, mint, null, TOKEN_2022_PROGRAM_ID);          //Token Program 2022
}
const createTokenAccount = async (publicKey) => {
    /*it will create a deterministic token account i.e. this address will hold tokens of specific mint account
    payer.publicKey will be the owner of this account i.e. it will have send/transfer authority.
    */
    // return await getOrCreateAssociatedTokenAccount(                              //Token Program
    //     connection,
    //     payer,
    //     mint,
    //     publicKey,
    // );
    return await getOrCreateAssociatedTokenAccount(                                 //Token Program 2022
        connection,
        payer,
        mint,
        publicKey,
        false,
        undefined,
        undefined,
        TOKEN_2022_PROGRAM_ID,
        undefined
        
    );
    console.log(result);
}
const getAccountInfo = async () => {
    // return await getAccount(                     //Token Program
    //     connection,
    //     tokenAccount.address
    // )

    return await getAccount(                        //Token Program 2022
        connection,
        tokenAccount.address,
        undefined,
        TOKEN_2022_PROGRAM_ID
    )
}
const mintTokens = async () => {
    // await mintTo(                                    //Token Program
    //     connection,
    //     payer,
    //     mintPublicKey2022,
    //     tokenAccount.address,
    //     payer,
    //     10000000000000
    // );

    await mintTo(                                       //Token Program 2022
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        10000000000000,
        undefined,
        undefined,
        TOKEN_2022_PROGRAM_ID
    );
}
const transferTokens = async () => {

    const signature = await transfer(
        connection,
        payer,
        tokenAccount.address,
        tokenAccount2.address,
        payer.publicKey,
        100000000000
    );
    console.log(signature);
}
const addTokenMetaData = async () => {
    //creating a 'Mint Account' with Token Program 2022 which would have a metadata to define token symbol, name etc.

    const mint = Keypair.generate();
    console.log(`mint: ${mint.publicKey} `)
    const decimals = 9;

    const metadata = {
        mint: mint.publicKey,
        name: 'Solana Fungible',
        symbol: 'SF',
        uri: 'URI',
        additionalMetadata: [['new-field', 'new-value']],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);

    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const mintLamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
    const mintTransaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: mint.publicKey,
            space: mintLen,
            lamports: mintLamports,
            programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(mint.publicKey, payer.publicKey, mint.publicKey, TOKEN_2022_PROGRAM_ID),
        createInitializeMintInstruction(mint.publicKey, decimals, payer.publicKey, null, TOKEN_2022_PROGRAM_ID),
        createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mint.publicKey,
            metadata: mint.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: payer.publicKey,
            updateAuthority: payer.publicKey,
        }),
    );

    const result = await sendAndConfirmTransaction(connection, mintTransaction, [payer, mint]);
    console.log(result);
}

const main = async () => {

    const balance = await connection.getBalance(payer.publicKey);

    console.log('Payer public key:', payer.publicKey.toString());
    console.log('Balance:', (balance / LAMPORTS_PER_SOL));

    // createMintAccount();
    // const result = await mintInfo();
    tokenAccount = await createTokenAccount(payer.publicKey);
    // tokenAccount2 = await createTokenAccount(payer2.publicKey);
    // const accountInfo = await getAccountInfo();
    mintTokens();
    // transferTokens();
    // addTokenMetaData();

    // console.log(tokenAccount.address.toBase58());
    // console.log(await getAccountInfo());


}
main();



//Token Accounts (Token Program):

//HrWHQiRQMX2sFmCih9xBfnLU5Nw7hp7eWbSoc4UPqffz
//APDrABdeQfyHxgwHzTwaJovyCSUebEjQ2AbnLiNmV16J
//------------------------------------------------------------------------------------------

//Token Accounts (Token 2022{Extensions} Program):

//4oedPUjXrzSym6GC24ZzB87sNzL7gmb4sPeAMorRHpZ4

