import { SnapProvider } from '@metamask/snap-types';
import { IdentitySnapState } from '../interfaces';
import { getAgent } from '../veramo/setup';
import { getHederaChainIDs } from './config';
import { isHederaAccountImported } from './params';
import { getCurrentNetwork } from './snapUtils';

/* eslint-disable */
export async function getCurrentDid(
  wallet: SnapProvider,
  state: IdentitySnapState
): Promise<string> {
  let did: string = '';
  const method =
    state.accountState[state.currentAccount].accountConfig.identity.didMethod;
  const chain_id = await getCurrentNetwork(wallet);
  const hederaChainIDs = getHederaChainIDs();

  if (method === 'did:pkh') {
    if (
      Array.from(hederaChainIDs.keys()).includes(chain_id) &&
      isHederaAccountImported(state)
    ) {
      // Handle Hedera
      did = `${method}:hedera:${hederaChainIDs.get(chain_id)}:${
        state.hederaAccount.accountId
      }`;
    } else {
      // Handle everything else
      did = `${method}:eip155:${chain_id}:${state.currentAccount}`;
    }
  } else {
    console.error(
      'did method not supported. Supported methods are: ["did:pkh"]'
    );
    throw new Error(
      'did method not supported. Supported methods are: ["did:pkh"]'
    );
  }
  return did;
}

/* eslint-disable */
export async function getCurrentDidDocument(
  wallet: SnapProvider,
  state: IdentitySnapState
): Promise<string> {
  let did: string = '';
  const method =
    state.accountState[state.currentAccount].accountConfig.identity.didMethod;
  const chain_id = await getCurrentNetwork(wallet);
  const hederaChainIDs = getHederaChainIDs();

   const agent = await getAgent(wallet, state);



  if (method === 'did:pkh') {
    if (
      Array.from(hederaChainIDs.keys()).includes(chain_id) &&
      isHederaAccountImported(state)
    ) {
      // // Handle Hedera
      // let pk = "2386d1d21644dc65d4e4b9e2242c5f155cab174916cbc46ad85622cdaeac835c";
      // let pkhHederaIdentifier1 = await agent.didManagerCreate({ kms: 'local', provider: "did:pkh", 
      //   options: { network: 'hedera', chainId: "testnet", hederaAccountId: "0.0.48865029", privateKey: pk } });


        

    } else {
      // Handle everything else
      did = `${method}:eip155:${chain_id}:${state.currentAccount}`;
    }
  } else {
    console.error(
      'did method not supported. Supported methods are: ["did:pkh"]'
    );
    throw new Error(
      'did method not supported. Supported methods are: ["did:pkh"]'
    );
  }
  return did;
}
