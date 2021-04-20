import { Item } from "@/models/item";
import { MessageBlock } from "@/models/transaction";
import { block } from "nanocurrency-web";
import { SignedBlock } from "nanocurrency-web/dist/lib/block-signer";
import { http, powClient, rpcClient } from "./http";

const generateWork = async (hash: string) => {
  const difficulty = await powClient.post(`/`, { action: "active_difficulty" });

  const generateWorkReq = {
    action: "work_generate",
    hash: hash,
    difficulty: difficulty.data.network_current
  };
  const res = await powClient.post(`/`, generateWorkReq);

  return res.data.work;
};

const getAccountKey = async (account: string) => {
  const accountInfo = {
    action: "account_key",
    account: account
  };
  const res = await rpcClient.post(`/`, accountInfo);
  return res.data.key;
};

const getWalletInfo = async (account: string) => {
  const accountInfo = {
    action: "account_info",
    account: account
  };
  const res = await rpcClient.post(`/`, accountInfo)
  if (res.data.error) {
    return {
      frontier: "0".repeat(64),
      balance: "0"
    };
  }

  return {
    frontier: res.data.frontier,
    balance: res.data.balance,
  };
};

const createBlockReceive = async (message: MessageBlock, privateKey: string, toAddress: string) => {
  const walletInfo = await getWalletInfo(message.block.link_as_account);
  let hash;
  if (walletInfo.frontier === "0".repeat(64)) {
    hash = await getAccountKey(toAddress);
  } else {
    hash = walletInfo.frontier;
  }
  const work = await generateWork(hash);
  return block.receive({
    walletBalanceRaw: walletInfo.balance,
    amountRaw: message.amount,
    toAddress,
    representativeAddress: toAddress,
    transactionHash: message.hash,
    work: work,
    frontier: walletInfo.frontier
  }, privateKey);
};

const createBlockSend = async (amountRaw: string, privateKey: string, fromAddress: string, toAddress: string) => {
  const walletInfo = await getWalletInfo(fromAddress);
  const hash = walletInfo.frontier;
  const work = await generateWork(hash);
  return block.send({
    walletBalanceRaw: walletInfo.balance,
    amountRaw,
    fromAddress,
    toAddress,
    representativeAddress: fromAddress,
    work,
    frontier: walletInfo.frontier
  }, privateKey);
};

const processBlock = async (block: SignedBlock, send: boolean) => {
  const processQuery = {
    action: "process",
    "json_block": "true",
    block: block,
    subtype: send ? "send" : "receive"
  };

  const res = await rpcClient.post(`/`, processQuery);
  return res.data.hash;
};

export const Nano = {
  createBlockReceive,
  createBlockSend,
  processBlock
};