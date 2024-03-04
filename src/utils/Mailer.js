import { createTransport } from "nodemailer";
import { NODEMAILER_PASS, NODEMAILER_USER } from "../config/index.js";
import Mailgen from "mailgen";

let config = {
  service: "gmail",
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
};

const transporter = createTransport(config);

const MailGenerator = new Mailgen({
  theme: "cerberus",
  product: {
    name: "Raahi-Experience Sharing Platform",
    link: "https://www.google.com",
  },
});

const sendMail = async (to, subject, body) => {
  const emailBody = {
    body: {
      name: body.name,
      intro: body.intro,
      outro: body.outro,
    },
  };

  const mail = MailGenerator.generate(emailBody);

  let message = {
    from: NODEMAILER_USER,
    to: to,
    subject: subject,
    html: mail,
  };

  try {
    await transporter.sendMail(message);
    return true;
  } catch (error) {
    console.error("Failed to send mail", error);
    return false;
  }
};

export { sendMail };