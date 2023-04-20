const sha256 = require('sha256');
const currentNodeUrl = process.env.CURRENT_NODE_URL;
const { v4: uuidv4 } = require('uuid');

function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    this.createnewBlock(100, '0', '0');
}

Blockchain.prototype.createnewBlock = function(nonce, previousBlockHash, hash) {
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendingTransactions,
        nonce: nonce,
        hash: hash,
        previousBlockHash: previousBlockHash
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.createNewTransaction = function(data, sender){
    const newTransaction = {
        data: data,
		sender: sender,
        transactionId: uuidv4().split('-').join('')
    }

    return newTransaction;
}

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) {
	this.pendingTransactions.push(transactionObj);
	return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);

    while(hash.substring(0, 4) !== '0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }

    return nonce;
}

Blockchain.prototype.chainIsValid = function(blockchain) {
    let validChain = true;

    for(var i = 1; i < blockchain.length; i++)
    {
        const currentBlock = blockchain[i];
        const prevBlock = blockchain[i-1];

        const blockHash = this.hashBlock(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
        
        if(blockHash.substring(0, 4) !== "0000") validChain = false;

        if(currentBlock['previousBlockHash'] !== prevBlock['hash']) validChain = false;
        
    };

    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 100;
    const correctPreviousBlockHash = genesisBlock['previousBlockHash'] === '0';
    const correctHash = genesisBlock['hash'] === '0';
    const correctTransactions = genesisBlock['transactions'].length === 0;

    if (!correctNonce || !correctPreviousBlockHash || !correctHash || !correctTransactions) validChain = false;

    return validChain;
};

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.getBlock = function(blockHash) {
	let correctBlock = null;
	this.chain.forEach(block => {
		if (block.hash === blockHash) correctBlock = block;
	});
	return correctBlock;
};


Blockchain.prototype.getTransaction = function(transactionId) {
	let correctTransaction = null;
	let correctBlock = null;

	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if (transaction.transactionId === transactionId) {
				correctTransaction = transaction;
				correctBlock = block;
			};
		});
	});

	return {
		transaction: correctTransaction,
		block: correctBlock
	};
};


Blockchain.prototype.getSenderData = function(sender) {
	const senderTransactions = [];
	this.chain.forEach(block => {
		block.transactions.forEach(transaction => {
			if(transaction.sender === sender) {
				senderTransactions.push(transaction);
			};
		});
	});

	return {
		senderTransactions: senderTransactions
	};
};

module.exports = Blockchain;