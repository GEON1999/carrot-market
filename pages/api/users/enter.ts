import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import twilio from "twilio";
import smtpTransport from "@libs/server/email";
import { withApiSession } from "@libs/server/withSession";
import emailjs from "@emailjs/browser";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone, payload } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) {
    return res.status(400).json({ ok: false });
  }
  //

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
  /* if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `your token is ${payload}`,
    });
  } else if (email) {
    const templateParams = {
      token: payload,
      email,
    };
    await emailjs
      .send(
        "service_i1nswgp",
        "template_6zriuy5",
        templateParams,
        "j2jfTWumVG_TEDCNH"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
  }*/
  return res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
