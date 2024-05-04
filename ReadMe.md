![Logo](/Aqua_Frontend/img/AquaLogo.png)
# Aqua Blockchain Voting
  Aqua voting system is a decentralized application (DApp), based on the Ethereum blockchain, of a multi-winner and approval-based voting committee size k=3 that follows the AV rule.

It was created in the context of my thesis entitled **"Study of the security of electronic voting with blockchain technology. "**.

## Table of Contents
* [Technologies](#Technologies)
* [Installation](#Installation)
* [Author](#Author)

## Technologies
Aqua has been created with:

* Solidity version: 0.8.9
* Hardhat version: 2.12.4
* Node.js version: 18.12.1
* Ethers.js version: 5.1

## Installation
First, for Aqua we use the text editor **Visual Studio Code**. 
In it we install **WSL**(*Windows Subsystem for Linux*), which allows us to use Linux commands on a Windows subsystem. (Note: it is possible that Virtualization in BIOS is off, i.e. we can't create a Linux virtual machine until we change it.)
```bash
wsl --install
```
To complete the installation we need to restart the computer and then fill in the information we get asked for. Now in our Visual Studio Code we need to install the extension **Remote Developement**.

Next, we will install the NVM tool with the command:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
and version 18.12.1 of Node.js with the command:
```bash
nvm install 18.12.1
```
At the same time, we need to install the extension **Solidity + Hardhat** in our Visual Studio Code. The extension adds support for the Solidity language and provides an editor for Hardhat projects.

Personally I prefer to use **yarn package manager** but npm or npx can be used as well. The yarn is added with the command:
```bash
corepack enable
```
Another tool I use is **Ganache**, which creates a local blockchain.

The last step to run Aqua is to add its directories to our Visual Sudio Code and install all the dependencies:
```bash
git clone https://github.com/NikStef/AquaBlockchainVoting
cd AquaBlockchainVoting/
yarn
```
## Author

- [@NikStef](https://github.com/NikStef)

