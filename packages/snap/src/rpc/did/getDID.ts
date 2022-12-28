import { SnapProvider } from '@metamask/snap-types';
import { IdentitySnapState } from '../../interfaces';
import { getCurrentDidDocument } from '../../utils/didUtils';

/* eslint-disable */
export async function getDid(
  wallet: SnapProvider,
  state: IdentitySnapState
): Promise<string> {
  return await getCurrentDidDocument(wallet, state);
}
