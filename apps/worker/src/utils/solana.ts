import {
  Keypair,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Transaction,
  PublicKey,
  sendAndConfirmTransaction,
  Connection,
} from "@solana/web3.js";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../../../apps/worker/.env");
dotenv.config({ path: envPath });

const connection = new Connection(
  process.env.SOL_RPC_URL as string,
  "finalized",
);

export async function sendSol(to: string, amount: string) {
  const base58 = await import("bs58");
  const keypair = Keypair.fromSecretKey(
    base58.default.decode(process.env.SOL_PRIVATE_KEY ?? ""),
  );
  console.log(keypair.publicKey);
  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: new PublicKey(to),
      lamports: parseFloat(amount) * LAMPORTS_PER_SOL, // 0.1 => 10 ^ 8
    }),
  );

  await sendAndConfirmTransaction(connection, transferTransaction, [keypair]);
  console.log("sol Sent!");
}
