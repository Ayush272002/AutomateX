import prisma from "@repo/db/client";
import { Kafka, logLevel } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const TOPIC_NAME = "zap-events";

const kafkaUri = process.env.KAFKA_URI;
if (!kafkaUri) {
  throw new Error("KAFKA_URI environment variable is not defined");
}

const kafka = new Kafka({
  brokers: [kafkaUri],
  ssl: {
    rejectUnauthorized: false,
  },
  sasl: {
    mechanism: "scram-sha-256",
    username: process.env.KAFKA_USERNAME as string,
    password: process.env.KAFKA_PASSWORD as string,
  },
  logLevel: logLevel.ERROR,
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (1) {
    const pendingRows = await prisma.zapRunOutbox.findMany({
      where: {},
      take: 10,
    });

    producer.send({
      topic: TOPIC_NAME,
      messages: pendingRows.map((r) => ({
        value: r.zapRunId,
      })),
    });

    await prisma.zapRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map((x) => x.id),
        },
      },
    });
  }
}

main();
