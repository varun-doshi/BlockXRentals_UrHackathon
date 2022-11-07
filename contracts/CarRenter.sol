// SPDX-License-Identifier: MIT
// 0x97063A3CbeAFc56BA7653Fa8CF7AaA0b2eB3d55f
//Deployed to Goerli:0x10c3F14c6635f8F45EeC0c87F0666B22A359d074
pragma solidity ^0.8.17;

contract CarRenter{

    address payable public owner;
    mapping (address => uint256) accounts;

    event Booking(address customer, uint paid, uint returned, bool carResturned);

     constructor(){
         owner=payable(msg.sender);  
     }

    function getBal() public view returns (uint256){
        return msg.sender.balance;
    }

    function contractBal() public view returns(uint256){
        return address(this).balance;
    }

     function rentCar() external payable{
         require(accounts[msg.sender]==0,"You have already rented a car");
         require(msg.value==100000000000000000 wei,"Not enough credits");
        accounts[msg.sender]=1;
        emit Booking(msg.sender, msg.value, 0, false);
     }

     function calculateReturn() private pure returns(uint256){
         uint amt=100000000000000000;
         uint returnAmt=(amt*40)/100;
         return returnAmt;
     }

     function returnCar() public payable {
         require(accounts[msg.sender]==1,"You have not rented a car");
         uint returnAmt=calculateReturn();
         payable(msg.sender).transfer(returnAmt);
         accounts[msg.sender]=0;
         
         emit Booking(msg.sender, msg.value, returnAmt, true);
     }
     
}