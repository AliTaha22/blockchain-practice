import axios from "axios";
import clc from 'cli-color';

const API_KEY = 'live_Cw9ytoDQGpRUMh4uHvjo1YKzSlA693DVdX3XwbIovuSHHPUKGcCuFYNmKNMsos0A';




//normal way to fetch data from the API
const fetchData = () => {
    const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${API_KEY}';
    axios.get(API_URL,)
        .then(res => {
            const data = res.data;
            const widthTypesObject = {};
            data.forEach(type => {

                if (widthTypesObject[type.width]) {
                    widthTypesObject[type.width].push(type)
                } else {
                    widthTypesObject[type.width] = [type]
                }
            });
            console.log(widthTypesObject)
            console.log(clc.blue("HELLO"));

        })
        .catch(error => {
            console.error('ERROR: ', error);
        });

}

//fetching data from the API using async/await.
const fetchDataAsync = async () => {

    const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&ap_key=${API_KEY}';

    await fetch(API_URL)
        .then(Response => {
            if (!Response.ok) {
                throw new Error('Network response was not OK');
            }
            //console.log(Response)
            return Response.json();
        })
        .then(data => {

            console.log('Fetched data:', data);

        })
        .catch(error => {
            console.error('ERROR: ', error);
        });


}



async function myDisplay() {
    let myPromise = new Promise( (resolve, reject) =>{

        setTimeout( ()=> { resolve("www.w3school.com"); }, 5000);

    });
    console.log(myPromise);
}

//manipulation console text styles and colors with cli-color library
function displayColor() {


    console.log(clc.red('This is red text'));
    console.log(clc.bgGreen.black('This is green background with black text'));
    console.log(clc.blue.bold('This is BOLD blue text'));
    console.log(clc.yellow.italic('This is ITALIC yellow text'));
    console.log(clc.white.italic.bold('This is BOLD ITALIC white text'));

}
const myfun = function (x) { return x + 10 };





async function nodeConnection() {

    //  let tx = await signer.sendTransaction({ to: "0xa1eB35A03D01611f661220349037F5E4C1D0F53F", from: "0x92b2421a252F9329C401Bd379D9926Ef2162138f", value: ethers.utils.parseEther("0.01") , gasPrice: gasfee, gasLimit: ethers.BigNumber.from(21000) })
    //  console.log(await tx.wait());






    // //get block number, get block tx's
    // let blockNumber = await provider.getBlockNumber()
    // let block = await provider.getBlock(blockNumber);
    // console.log("Block Number: " + blockNumber);

    // //get block tx's
    // console.log("Block Transactions: " + block.transactions.length);

    // const myAddress = await signer.getAddress();
    // console.log(myAddress);


    // //signMessage(signer);
    // //getBalance(provider);
    // //sendTx(provider);



}

const main = async () => {

    nodeConnection();
    //console.log("Hello world");
    myDisplay

}

main();

//console.log(myfun(20));

// const x = main(fetchDataAsync);
// const test = async () => {
//     console.log((await x).call());
// }
// let a = [1,2,3,4,5]

// a = a.map((val) => val *2)
// console.log(a);
// // test()
