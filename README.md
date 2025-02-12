# INT20H Test Task

## Deployed Instances

Contract in Sepolia - 0x22362F018694345d00f1252C5Cc8F443214d5C9B

Etherscan - https://sepolia.etherscan.io/address/0x22362f018694345d00f1252c5cc8f443214d5c9b#code

Application - https://int20h.netlify.app/

## How to run

### Contract

`cd ./contracts`
`yarn install`

#### Deploy to local node

`yarn startLocalNode`
`yarn deployLocal`

#### Deploy to Sepolia

Create and fill .env based on .env.example and run
`yarn build`
`yarn deploy`

### Application

Create and fill .env based on .env.example and run
`yarn install`
`yarn dev`

Note: student submission should be validated by all project verifiers to count as verified
