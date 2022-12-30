import { SnapProvider } from '@metamask/snap-types';
import { IdentitySnapState } from '../../interfaces';
import { getCurrentDid, getCurrentDidDocument } from '../../utils/didUtils';

/* eslint-disable */
export async function getDid(
  wallet: SnapProvider,
  state: IdentitySnapState
): Promise<string> {
  return await getCurrentDid(wallet, state);
}

export async function getDidHedera(
  wallet: SnapProvider,
  state: IdentitySnapState
): Promise<string> {
  
  return await getCurrentDidDocument(wallet, state);
}