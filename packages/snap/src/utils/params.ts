import { VerifiableCredential, VerifiablePresentation } from '@veramo/core';
import { ExampleVCValue, IdentitySnapState, VCQuery } from '../interfaces';

/* eslint-disable */
type HederaAccountParams = {
  privateKey: string;
  accountId: string;
};

export function isValidHederaAccountParams(
  params: unknown
): asserts params is HederaAccountParams {
  if (
    params !== null &&
    typeof params === 'object' &&
    'privateKey' in params &&
    (params as HederaAccountParams).privateKey != null &&
    typeof (params as HederaAccountParams).privateKey === 'string' &&
    'accountId' in params &&
    (params as HederaAccountParams).accountId != null &&
    typeof (params as HederaAccountParams).accountId === 'string'
  )
    return;

  console.error('Invalid Hedera Params passed');
  throw new Error('Invalid Hedera Params passed');
}

export function isHederaAccountImported(state: IdentitySnapState): boolean {
  if (
    state.hederaAccount.privateKey !== '' &&
    state.hederaAccount.publicKey !== '' &&
    state.hederaAccount.accountId !== ''
  ) {
    return true;
  } else {
    return false;
  }
}

type SwitchMethodRequestParams = {
  didMethod: string;
};

export function isValidSwitchMethodRequest(
  params: unknown
): asserts params is SwitchMethodRequestParams {
  if (
    params != null &&
    typeof params === 'object' &&
    'didMethod' in params &&
    (params as SwitchMethodRequestParams).didMethod != null &&
    typeof (params as SwitchMethodRequestParams).didMethod === 'string'
  )
    return;

  console.error('Invalid switchMethod request');
  throw new Error('Invalid switchMethod request');
}

type ResolveDIDRequestParams = { did?: string };

export function isValidResolveDIDRequest(
  params: unknown
): asserts params is ResolveDIDRequestParams {
  if (params != null && typeof params === 'object') return;

  throw new Error('Invalid ResolveDID request');
}

type GetVCsRequestParams = { query?: VCQuery };

export function isValidGetVCsRequest(
  params: unknown
): asserts params is GetVCsRequestParams {
  if (params != null && typeof params === 'object') return;

  throw new Error('Invalid GetVCs request');
}

type SaveVCRequestParams = { verifiableCredential: VerifiableCredential };

export function isValidSaveVCRequest(
  params: unknown
): asserts params is SaveVCRequestParams {
  if (
    params !== null &&
    typeof params === 'object' &&
    'verifiableCredential' in params
  )
    return;

  console.error('Invalid SaveVC request');
  throw new Error('Invalid SaveVC request');
}

type CreateVCRequestParams = { exampleVCData: ExampleVCValue };

export function isValidCreateExampleVCRequest(
  params: unknown
): asserts params is CreateVCRequestParams {
  if (params != null && typeof params === 'object' && 'exampleVCData' in params)
    return;

  throw new Error('Invalid CreateExampleVC request');
}

type VerifyVCRequestParams = { verifiableCredential: VerifiableCredential };

export function isValidVerifyVCRequest(
  params: unknown
): asserts params is VerifyVCRequestParams {
  if (
    params !== null &&
    typeof params === 'object' &&
    'verifiableCredential' in params
  )
    return;

  console.error('Invalid VerifyVC request');
  throw new Error('Invalid VerifyVC request');
}

type GetVPRequestParams = {
  vcId: string;
  domain?: string;
  challenge?: string;
};

export function isValidGetVPRequest(
  params: unknown
): asserts params is GetVPRequestParams {
  if (
    params != null &&
    typeof params === 'object' &&
    'vcId' in params &&
    (params as GetVPRequestParams).vcId != null &&
    typeof (params as GetVPRequestParams).vcId === 'string'
  )
    return;

  throw new Error('Invalid GetVP request');
}

type VerifyVPRequestParams = { verifiablePresentation: VerifiablePresentation };

export function isValidVerifyVPRequest(
  params: unknown
): asserts params is VerifyVPRequestParams {
  if (
    params !== null &&
    typeof params === 'object' &&
    'verifiablePresentation' in params
  )
    return;

  console.error('Invalid VerifyVP request');
  throw new Error('Invalid VerifyVP request');
}
