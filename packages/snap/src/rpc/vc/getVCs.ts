import { VCQuery } from '@blockchain-lab-um/ssi-snap-types';
import { SnapProvider } from '@metamask/snap-types';
import { VerifiableCredential } from '@veramo/core';
import { IdentitySnapState } from '../../interfaces';
import { snapConfirm } from '../../utils/snapUtils';
import { veramoListVCs } from '../../utils/veramoUtils';

export async function getVCs(
  wallet: SnapProvider,
  state: IdentitySnapState,
  account: string,
  query?: VCQuery
): Promise<VerifiableCredential[]> {
  console.log('query', query);
  const vcs = await veramoListVCs(
    wallet,
    state,
    state.accountState[account].accountConfig.identity.vcStore,
    query
  );
  console.log('VCs: ', vcs);
  const promptObj = {
    prompt: 'Send VCs',
    description: 'Are you sure you want to send VCs to the dApp?',
    textAreaContent: `Some dApps are less secure than others and could save data from VCs against your will. Be careful where you send your private VCs! Number of VCs submitted is ${vcs.length.toString()}`,
  };

  if (
    state.snapConfig.dApp.disablePopups ||
    (await snapConfirm(wallet, promptObj))
  ) {
    return vcs;
  }

  return [];
}