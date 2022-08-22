import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
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
    console.log(message);
  }
  console.log(token);
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
