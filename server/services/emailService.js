import nodemailer from "nodemailer";

function hasMailConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.ADMIN_EMAIL
  );
}

function getTransporter() {
  if (!hasMailConfig()) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendNewContactNotification(contact) {
  const transporter = getTransporter();

  if (!transporter) {
    return { sent: false, reason: "Email settings are not configured." };
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New portfolio contact from ${contact.name}`,
    text: [
      `Name: ${contact.name}`,
      `Email: ${contact.email}`,
      "",
      "Message:",
      contact.message,
    ].join("\n"),
  });

  return { sent: true };
}

export async function sendReplyEmail(contact, replyMessage) {
  const transporter = getTransporter();

  if (!transporter) {
    throw new Error("SMTP email settings are not configured.");
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: contact.email,
    replyTo: process.env.ADMIN_EMAIL,
    subject: `Reply from ${process.env.PORTFOLIO_OWNER_NAME || "Tejaswini K Mahajan"}`,
    text: replyMessage,
  });
}
