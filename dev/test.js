const Blockchain = require('./blockchain')

const bitcoin = new Blockchain();

// bitcoin.createnewBlock(1289, 'OI2109310398', 'OI2109310300');
// bitcoin.createnewBlock(1290, 'OI2109310300', 'OI2109310301');
// bitcoin.createnewBlock(1291, 'OI2109310302', 'OI2109310303');

// bitcoin.createnewBlock(1234, 'PO1234000','PO1234001==');

// bitcoin.createNewTransaction(100, 'ALEXADD1234500', 'JENADD1234501');

// bitcoin.createnewBlock(1235, 'PO1234002','PO1234002==');

// bitcoin.createNewTransaction(50, 'ALEXADD1234500', 'JENADD1234501');
// bitcoin.createNewTransaction(300, 'ALEXADD1234500', 'JENADD1234501');
// bitcoin.createNewTransaction(2000, 'ALEXADD1234500', 'JENADD1234501');

// bitcoin.createnewBlock(1236, 'PO1234003','PO1234003==');

// const previousBlockHash = 'PO1234003==';
// const currentBlockData = [
//     {
//         amount: 10,
//         sender: 'ALEXADD1234500',
//         recipient: 'JENADD1234501'
//     },
//     {
//         amount: 30,
//         sender: 'ALEXADD1234502',
//         recipient: 'JENADD1234503'
//     },
//     {
//         amount: 200,
//         sender: 'ALEXADD1234504',
//         recipient: 'JENADD1234505'
//     }
// ];

// console.log(bitcoin.proofOfWork(previousBlockHash, currentBlockData))
// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, 2806))

// const nonce = 100;

// console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce))

const bc1 = {
    "chain": [
        {
            "index": 1,
            "timestamp": 1681921721590,
            "transactions": [],
            "nonce": 100,
            "hash": "0",
            "previousBlockHash": "0"
        },
        {
            "index": 2,
            "timestamp": 1681921731946,
            "transactions": [
                {
                    "amount": 100,
                    "sender": "WILDAN3005",
                    "recipient": "BELLINDA0503",
                    "transactionId": "724ffbc6eba444d999101d1df9f4e217"
                }
            ],
            "nonce": 24182,
            "hash": "000092340597825ddcb086b80999ead2d5034b38d811dbb8a377f816e3e1222c",
            "previousBlockHash": "0"
        }
    ],
    "pendingTransactions": [
        {
            "amount": 12.5,
            "sender": "00",
            "recipient": "5506604a8f404473935cae129b1f4dda",
            "transactionId": "bdbd59164d954116b9862a8cb07fd666"
        }
    ],
    "currentNodeUrl": "http://localhost:3001",
    "networkNodes": []
}

const data = {
    transactions : [
        {
            "amount": 20,
            "sender": "WILDAN3005",
            "recipient": "BELLINDA0503",
            "transactionId": "e06a8d8360fb4ea6beaf85ffc0e9cf31"
        }
    ],
    index: 2
};

// console.log(bitcoin.proofOfWork("0", data));

// console.log(bitcoin.hashBlock("0", data, 57635));

console.log(`VALID: ${bitcoin.chainIsValid(bc1.chain)}`);