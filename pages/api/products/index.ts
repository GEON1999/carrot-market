import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const products = await client.product.findMany({});
    res.json({ ok: true, products });
  }

  if (req.method === "POST") {
    const {
      body: { title, price, description, subTitle },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        image: "",
        title,
        price: +price,
        description,
        subTitle,
        user: {
          connect: { id: user?.id },
        },
      },
    });
    res.json({ ok: true, id: product.id });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
