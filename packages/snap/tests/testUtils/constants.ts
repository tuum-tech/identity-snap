import cloneDeep from 'lodash.clonedeep';
import { IdentitySnapState, SnapConfirmParams } from '../../src/interfaces';
import { getEmptyAccountState } from '../../src/utils/config';

export const privateKey =
  '0x63ce0077f0d617dbf54d5f335de2983313c6356f25b45e0f68f85bee1490a6ae';
export const address = '0xb6665128eE91D84590f70c3268765384A9CAfBCd';
export const publicKey =
  '0x0480a9cd48fd436f8c1f81b156eb615618cd573c3eb1e6d937a17b8222027cae850a9f561d414001a8bdefdb713c619d2caf08a0c9655b0cf42de065bc51e0169a';
export const signedMsg =
  '0x30eb4dbf93e7bfdb109ed03f7803f2378fa27d18ddc233cb3d121b5ba13253fe2515076d1ba66f3dc282c182479b843c925c62eb1f5a0676bcaf995e8e7552941c';

export const exampleDIDPkh = `did:pkh:eip155:0x4:${address}`;

const defaultSnapState: IdentitySnapState = {
  accountState: {
    '0xb6665128eE91D84590f70c3268765384A9CAfBCd': getEmptyAccountState(),
  },
  snapConfig: {
    dApp: {
      disablePopups: false,
      friendlyDapps: [],
    },
    snap: {
      acceptedTerms: true,
    },
  },
};

export const getDefaultSnapState = (): IdentitySnapState => {
  defaultSnapState.accountState[address].publicKey = publicKey;
  return cloneDeep(defaultSnapState);
};

export const snapConfirmParams: SnapConfirmParams = {
  prompt: 'Test prompt',
  description: 'Test description',
  textAreaContent: 'Test text area content',
};
