const express = require('express');
const Web3 = require('web3');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 


const web3 = new Web3('http://localhost:7545'); // Ethereum node address

// smart contract ABI
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "studentName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "course",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "graduationYear",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "result",
                "type": "string"
            }
        ],
        "name": "addRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getRecord",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
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
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "records",
        "outputs": [
            {
                "internalType": "string",
                "name": "studentName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "course",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "graduationYear",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "result",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// your contract's address
const contractAddress = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.post('/addRecord', async (req, res) => {
    const { studentName, course, graduationYear, result } = req.body;

    // Your Ethereum account address
    const account = '0xe55035eba4E957d5f739913a03F058F78bBe209B'; 

    try {
        
        const transactionHash = await contract.methods.addRecord(studentName, course, graduationYear, result).send({ from: account });

        res.json({ message: 'Record added successfully', transactionHash });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/', (req, res) => {
    // Serve the HTML file as a response
    res.sendFile(__dirname + '/frontend/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
