import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

async function main() {
  await prismaClient.availableTrigger.upsert({
    where: { id: "webhook" },
    update: {
      name: "Webhook",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
    },
    create: {
      id: "webhook",
      name: "Webhook",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIovxkR9l-OlwpjTXV1B4YNh0W_s618ijxAQ&s",
    },
  });

  await prismaClient.availableAction.upsert({
    where: { id: "send-sol" },
    update: {
      name: "Send Solana",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s",
    },
    create: {
      id: "send-sol",
      name: "Send Solana",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10458YI0Lf1-Zx4fGwhWxI_x4oPCD034xaw&s",
    },
  });

  await prismaClient.availableAction.upsert({
    where: { id: "email" },
    update: {
      name: "Send Email",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
    },
    create: {
      id: "email",
      name: "Send Email",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nd82eFk5SaBPRIeCpmwL7A4YSokA-kXSmw&s",
    },
  });
}

main();
