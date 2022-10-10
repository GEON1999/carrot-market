import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import twilio from "twilio";
import smtpTransport from "@libs/server/email";
import { withApiSession } from "@libs/server/withSession";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) {
    return res.status(400).json({ ok: false });
  }
  const payload = Math.floor(100000 + Math.random() * 9000000) + "";

  const token = await client.token.create({
    data: {
      token: payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Unknown",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `your token is ${payload}`,
    });
  } else if (email) {
    const mailOptions = {
      from: `${process.env.MAIL_ID}`,
      to: email,
      subject: "당근마켓 인증 코드 입니다.",
      text: `인증 코드 : ${payload}`,
    };
    await new Promise((resolve, reject) => {
      smtpTransport.sendMail(mailOptions, (error) => {
        if (error) {
          console.log(error);
          return null;
        }
      });
      smtpTransport.close();
    });
  }
  return res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
