import { ethers } from 'ethers';
import { CustomWallet } from './custom-wallet';

import { NrtManagerFactory } from './typechain/NrtManagerFactory';
import { TimeAllyManagerFactory } from './typechain/TimeAllyManagerFactory';
import { ValidatorManagerFactory } from './typechain/ValidatorManagerFactory';
import { PrepaidEsFactory } from './typechain/PrepaidEsFactory';

const config = {
  ESN: {
    nrtManager: '0x89309551Fb7AbaaB85867ACa60404CDA649751d4',
    timeallyManager: '0x7F87f9830baB8A591E6f94fd1A47EE87560B0bB0',
    timeallyStakingTarget: '0xA3C6cf908EeeebF61da6e0e885687Cab557b5e3F',
    validatorSet: '0x8418249278d74D46014683A8029Fd6fbC88482a1',
    validatorManager: '0xE14D14bd8D0E2c36f5E4D00106417d8cf1000e22',
    randomnessManager: '0x44F70d80642998F6ABc424ceAf1E706a479De8Ce',
    blockRewardManager: '0x2AA786Cd8544c50136e5097D5E19F6AE10E02543',
    prepaidEs: '0x22E0940C1AE5D31B9efBaf7D674F7D62895FBde8',
    dayswappers: '0xF9FCb8678dB15A5507A5f5414D68aBB2f4568E27',
    kycdapp: '0xC4336494606203e3907539d5b462A5cb7853B3C6',
    timeallyclub: '0x6D57FaDF31e62E28Ab059f3dCd565df055428c57',
    timeAllyPromotionalBucket: '0xaDbA96fDA88B0Cbcf11d668FF6f7A29d062eD050',
  },
};

window.provider = new ethers.providers.JsonRpcProvider('https://node0.testnet.eraswap.network');

if (process.env.REACT_APP_LOCAL_BLOCKCHAIN === 'true') {
  config.ESN = {
    nrtManager: '0xAE519FC2Ba8e6fFE6473195c092bF1BAe986ff90',
    timeallyManager: '0x73b647cbA2FE75Ba05B8e12ef8F8D6327D6367bF',
    timeallyStakingTarget: '0x7d73424a8256C0b2BA245e5d5a3De8820E45F390',
    validatorSet: '0x08425D9Df219f93d5763c3e85204cb5B4cE33aAa',
    validatorManager: '0xA10A3B175F0f2641Cf41912b887F77D8ef34FAe8',
    randomnessManager: '0x6E05f58eEddA592f34DD9105b1827f252c509De0',
    blockRewardManager: '0x79EaFd0B5eC8D3f945E6BB2817ed90b046c0d0Af',
    prepaidEs: '0x2Ce636d6240f8955d085a896e12429f8B3c7db26',
    dayswappers: '',
    kycdapp: '',
    timeallyclub: '',
    timeAllyPromotionalBucket: '',
  };
  window.provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
}

// Temporary wallet
if (process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY) {
  window.wallet = new CustomWallet(process.env.REACT_APP_TEST_WALLET_PRIVATE_KEY, window.provider);
}

window.nrtManagerInstance = NrtManagerFactory.connect(config.ESN.nrtManager, window.provider);

window.timeallyManagerInstance = TimeAllyManagerFactory.connect(
  config.ESN.timeallyManager,
  window.provider
);

window.validatorManagerInstance = ValidatorManagerFactory.connect(
  config.ESN.validatorManager,
  window.provider
);

window.prepaidEsInstance = PrepaidEsFactory.connect(config.ESN.prepaidEs, window.provider);
