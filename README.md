# Guide on how to run this project

### First you'll need to download [Ganache](https://archive.trufflesuite.com/ganache/)
______


## Install Node.js
#### Note: to install the latest version of ```npm```, run ```npm i -g npm```

#### Node Package Manager (NPM) recommends installing ```Node.js``` and ```npm``` with a Node version manager to avoid permission errors when installing globally. To do so, follow the instructions for your operating system [here](https://github.com/nodejs/node-gyp#installation).
1. Truffle requires node-gyp for compiling native add-on modules for Node.js. Truffle recommends installing the following ```node-gyp``` to avoid errors when installing Truffle. Follow the installation instructions here.
2. Use ```nvm``` to install a compatible version of Node.js. For example, to install Node.js v18 on OSX or Linux, run: ```nvm install 18```

## Install Truffle
### Requirements
+ Node.js v14 - v18
+ Windows, Linux, or macOS

### In a terminal, use NPM to install Truffle:

```shell 
npm install -g truffle
```

### You may receive a list of warnings during installation. To confirm that Truffle was installed correctly, run:

```shell 
truffle version
```

## Run project 

#### Start Ganache and create a new workspace. After that, all settings can be left at their defaults.

#### Now everything is ready for deployment. Open in the root directory of contracts and write the command for building and deploying a smart contract.


```shell
cd contracts
truffle migrate --network development
```

### Clone contract address

![photo](../Twitter-Web3/client/public/photo_2024-04-27%2013.06.26.jpeg)

### Paste the contract address that you copied.

![photo](./client/public/photo_2024-04-27%2013.11.48.jpeg)

### Install [MetaMask](https://metamask.io/download/) 
1





 





