//Goerli Address: 0x10c3F14c6635f8F45EeC0c87F0666B22A359d074
//Polygon Mumbai Address: 0x9DA5E1f4cAe85cb48E2B8Dd316F6E56ac598BBFa

console.log("yo");
document.querySelector(".connect").addEventListener("click", connect);
document.querySelector(".RentCar").addEventListener("click", rentCar);
document.querySelector(".ReturnCar").addEventListener("click", ReturnCar);
document
  .querySelector(".getctnBal")
  .addEventListener("click", getContractBalance);

const addressBox = document.querySelector(".address");
const balanceBox = document.querySelector(".balance");

let account;
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "customer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paid",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "returned",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "carResturned",
        type: "bool",
      },
    ],
    name: "Booking",
    type: "event",
  },
  {
    inputs: [],
    name: "contractBal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rentCar",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "returnCar",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
const coontractAddress = "0x10c3F14c6635f8F45EeC0c87F0666B22A359d074";

async function connect() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request(
        {
          method: "eth_requestAccounts",
        },
        []
      );
      account = accounts[0];
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "goerli"
      );
      const contract = new ethers.Contract(
        coontractAddress,
        contractABI,
        provider
      );

      const balance = await provider.getBalance(account);
      balanceBox.innerHTML =
        "Your balance is: " + ethers.utils.formatEther(balance) + " ETH";
      addressBox.innerHTML = "Your address: " + account;
    } catch (error) {
      alert("Please connect to Goerli Testnet for safe Transactions");
    }
  }
}

ethereum.on("accountsChanged", function (accounts) {
  connect();
});

async function getContractBalance() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  const contract = new ethers.Contract(coontractAddress, contractABI, provider);
  const contractBalance = await contract.contractBal();
  const formattedContractBal = ethers.utils.formatEther(contractBalance);
  document.querySelector(".contractbal").innerHTML =
    "Contract Balance is: " + formattedContractBal + " ETH";
}

async function rentCar() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(coontractAddress, contractABI, signer);
  const price = { value: ethers.utils.parseEther("0.1") };

  let buyTxn = await contract.rentCar(price);
  buyTxn.wait();
  console.log("Car rented");
  connect();
}

async function ReturnCar() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
  const signer = provider.getSigner();
  const contract = new ethers.Contract(coontractAddress, contractABI, signer);

  let returnTxn = await contract.returnCar();
  returnTxn.wait();
  console.log("Car returned");
  connect();
}
