import ethers from 'ethers'
let randomSalt = `0x${Buffer.from(
    ethers.utils.concat([
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes("opensea.io")).slice(0, 10),
        Uint8Array.from(Array(20).fill(0)),
        ethers.utils.randomBytes(8),
    ])
).toString("hex")}`;
randomSalt = ethers.utils.formatUnits(randomSalt, 0);
console.log(randomSalt)