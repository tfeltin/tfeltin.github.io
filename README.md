# Personal Data Management with Public Blockchain

This is the PoC for a personal data management system based on the Ethereum blockchain and the IPFS network.

## Getting ready

#### MetaMask
To try out the system you need an Ethereum address on the Rinkeby TestNet through MetaMask installed on your preferred browser. You can install MetaMask by going to [this page](https://metamask.io/).

#### Connect your browser to your IPFS node
Install IPFS on your computer with NodeJS by running
`npm install ipfs` and change the config file located in `~/.ipfs/config` (if not initialized yet, run `ipfs init`).
In the `Addresses` part of the document, add the `/ip4/127.0.0.1/tcp/4003/ws` entry as shown below:

```
"Addresses": {
  "Swarm": [
    "/ip4/0.0.0.0/tcp/4002",
    "/ip4/127.0.0.1/tcp/4003/ws"
  ],
  "API": "/ip4/127.0.0.1/tcp/5002",
  "Gateway": "/ip4/127.0.0.1/tcp/9090"
}
```

Then, run `ipfs daemon` in a terminal to start your IPFS node, and `ipfs id` in another terminal to find your peer ID.

When everything is ready, go to https://tfeltin.github.io to access the system interface.

## Try the system

The web application functions as an IPFS client and interacts with the Rinkeby TestNet through MetaMask by exchanging with a Smart Contract. When you close your browser window, the IPFS node goes down, so **make sure to have it on when trying out the system**.

Here are a few explanations on the different parts of the page:

#### Add Personal Data

- If you are a user adding you own personal data, you can select a file on the left part of the box, and simply add your data to the system.
- If you are a service provider and have generated user data, you can add it on the right part of the box, along with the Ethereum address of the data owner.

#### Your Personal data

This box shows all of the data owned by you (Ethereum address on MetaMask).

When you add a file in the *Add Personal Data* box, or one is added on your behalf, and once the transactions are confirmed, the file will be shown here, as a file ID.

#### Access Control

Here you can grant or revoke permissions on the data you own, by precising the file ID and the Ethereum address of the user from whom to give/revoke access. You also have to precise a permission type (Create, Read, Update, Delete).

#### Request a token

Reference a file ID and permission type to ask for an access token.

#### Use token

By giving the appropriate file ID, token and permission type, you can receive files from the system.
