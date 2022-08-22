import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
  console.log("token : ", foundToken);
  if (!foundToken) return res.status(404).end();
  req.session.user = {
    id: foundToken?.userId,
  };

  await req.session.save();

  res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "CarotSession",
  password: "dfq003gj24gegdjfehsiynb4nybotyohbyiusgheibteyirtkuhskuiez5ig",
});
