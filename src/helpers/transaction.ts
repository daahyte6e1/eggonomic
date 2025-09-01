import {SendTransactionRequest, TonConnectUI} from '@tonconnect/ui-react';
import {beginCell} from '@ton/core';
import {SendTransactionResponse} from '@tonconnect/sdk'

async function createTransaction(tonConnectUI: TonConnectUI, amount: number, memo: string): Promise<SendTransactionResponse> {
  try {
    const cell = beginCell()
      .storeUint(0, 32)
      .storeStringTail(memo)
      .endCell();

    const boc = cell.toBoc({idx: false});
    const payload = btoa(String.fromCharCode(...boc));

    const transaction: SendTransactionRequest = {
      validUntil: Math.floor(Date.now() / 1000) + 60,
      messages: [
        {
          address: 'UQAc2HeqsF1fQaoMPueedr5aIByh2PUCMbtrH3nbctOBFtXk',
          amount: Math.round(amount * 1e9).toString(),
          payload: payload
        }
      ]
    };

    const result = await tonConnectUI.sendTransaction(transaction);
    return result
  } catch (e) {
    throw e
  }
}

export {
  createTransaction
}