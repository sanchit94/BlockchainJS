var SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, blockData, timestamp, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.blockData = blockData;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    
    calculateHash() {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.blockData)).toString();
    }
}

class Blockchain {
    constructor() {
        this.blockchain = [this.createGenesis()];
    }
    
    createGenesis() {
        return new Block(0, '15/07/2018', 'Genesis Block is created', '0000');
    }
    
    getLatestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }
    
    addNewBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        newBlock.timestamp = new Date();
        this.blockchain.push(newBlock);
    }
}

let DogaCoin = new Blockchain();
DogaCoin.addNewBlock(new Block(1, {amount: 200}));
DogaCoin.addNewBlock(new Block(2, {amount: 56}));
DogaCoin.addNewBlock(new Block(3, {amount: 500}));

console.log(DogaCoin);
