import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      image: "",
      name,
      price: +price,
      description,
      user: {
        connect: { id: user?.id },
      },
    },
  });
  res.json({ ok: true, id: product.id });
}

export default withApiSession(withHandler({ method: "POST", handler }));
