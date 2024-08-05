import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
//import twilio from "twilio";
import { withApiSession } from "@libs/server/withSession";

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone, payload, kakaoName, kakaoId } = req.body;
  if (kakaoName) {
    const alreadyUser = await client.user.findUnique({
      where: {
        kakaoId: kakaoId,
      },
    });

    if (alreadyUser) {
      req.session.user = {
        id: alreadyUser?.id,
      };
      await req.session.save();

      return res.json({
        ok: true,
      });
    } else {
      const user = await client.user.create({
        data: {
          name: kakaoName,
          kakaoId: kakaoId,
        },
      });

      req.session.user = {
        id: user?.id,
      };
      await req.session.save();

      return res.json({
        ok: true,
        user,
      });
    }

  }
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) {
    return res.status(400).json({ ok: false });
  }

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

  setTimeout(
    async () =>
      await client.token.deleteMany({
        where: {
          id: token?.id,
        },
      }),
    600000
  );

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
