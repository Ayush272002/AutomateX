import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../../../apps/worker/.env");
dotenv.config({ path: envPath });

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(to: string, body: string) {
  await transport.sendMail({
    from: process.env.SMTP_SENDER as string,
    sender: process.env.SMTP_SENDER as string,
    to,
    subject: "Hello from Zapier",
    text: body,
  });
  console.log("Email sent to:", to);
}
