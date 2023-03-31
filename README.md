# Sample Hardhat Project

This project demonstrates a basic Hardhat, ethersjs, zepplin and polygon use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

I will ue the following accounts to send funds using 1_ERC20 token
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

//Response from network after mint transaction
{
  type: 2,
  chainId: 80001,
  nonce: 3,
  maxPriorityFeePerGas: BigNumber { _hex: '0x59682f00',_isBigNumber: true },
  maxFeePerGas: BigNumber { _hex: '0x59682f20',_isBigNumber: true },
  gasPrice: null,
  gasLimit: BigNumber { _hex: '0x902e',_isBigNumber: true },
  to: '0xD3cBC1D0E8029f314a38506eAe061e81f897DF57',
  value: BigNumber { _hex: '0x00',_isBigNumber: true },
  data: '0x40c10f19000000000000000000000000c97baea3e2a9a80dbfad0258c82962bc95392e780000000000000000000000000000000000000000000000056bc75e2d63100000',
  accessList: [],
  hash: '0x8e938d0b27025c60b3f306ef3f9fc206c868557af6c8230afed8f1d568cc4ab6',
  v: 1,
  r: '0x0a3496b6e07c4fa4c27bded47fbcf5a06d96678ba599ea25245640f9dc52056f',
  s: '0x5cbd5a289f8e81c4d10bcb1e99e707c4c9093548ccb4bcaa9165ab2084a189f8',
  from: '0xC97baeA3E2a9A80dBfaD0258c82962BC95392e78',
  confirmations: 0,
  wait: [Function (anonymous)]
}

//Response after a successful trasfer
{
  type: 2,
  chainId: 80001,
  nonce: 9,
  from: '0xC97baeA3E2a9A80dBfaD0258c82962BC95392e78',
  confirmations: 0,
  wait: [Function (anonymous)]
}
//2nd response after a successful transfer
{
  type: 2,
  chainId: 80001,
  nonce: 8,
  value: BigNumber { _hex: '0x00',_isBigNumber: true },
  data: '0xa9059cbb00000000000000000000000018dff63fe34589c72b930cb8772db5c1042bfb0a0000000000000000000000000000000000000000000000000000000000004650',
  accessList: [],
  hash: '0x62c4e946b589750711dffc56611d9f4281f0b7ab7f36d15fff685de70efa41ee',
  v: 0,
  r: '0xffe50a10822046f1fe8d0c74f58269e8605182bcaea7e08dbd77a9f1bf0fe831',
  s: '0x66da49f49d2a5cadb3e3c60fb8d130a8e27470a0b0850e76843d5e33a4b55ec4',
  from: '0xC97baeA3E2a9A80dBfaD0258c82962BC95392e78',
  confirmations: 0,
  wait: [Function (anonymous)]
}
