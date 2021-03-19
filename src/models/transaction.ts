export interface MessageBlock {
  account: string
  amount: string
  hash: string
  block: TransactionBlock
}

export interface TransactionBlock {
  type: string
  account: string
  previous: string
  representative: string
  balance: string
  link: string
  link_as_account: string
  signature: string
  work: string
  subtype: string
}

export class TransactionInfo {
  constructor(
    public account: string,
    public price: string, // price in RAW
  ) {}
}