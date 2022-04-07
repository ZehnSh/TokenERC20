const {expect} = require("chai");
const { ethers} = require("hardhat");



describe("Deploying the Token", function(){

   let token,owner,addr1,addr2;
   
    beforeEach(async function () {
        const Token = await hre.ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();

        [owner,addr1,addr2] = await ethers.getSigners();
      });

   




    

    it("Should deploy the Token", async function(){
       console.log("deployed");
    });

    it("should deploy with 10000 supply in msg.sender", async function(){
        

        const balance = await token.balanceOf(owner.address);
        console.log(balance);

        expect(await token.totalSupply()).to.equal(balance);

    });

    it("transfer token", async function(){
        const balance1 = await token.balanceOf(owner.address);
        const balance2 = await token.balanceOf(addr1.address);

        console.log(balance1,balance2);
        await token.transfer(addr1.address,100);
        
        expect(await token.balanceOf(addr1.address)).to.equal(100);
    })

    it("Should let you give another address the approval to send on your behalf", async function() {
        await token.connect(addr1).approve(owner.address, 1000);
        await token.transfer(addr1.address, 1000);
        await token.transferFrom(addr1.address, addr2.address, 1000);
        expect(await token.balanceOf(addr2.address)).to.equal(1000);
      })





})