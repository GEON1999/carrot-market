import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { createDeflate } from "zlib";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { title, price, description, subTitle, photoId, phone, address },
    session: { user },
  } = req;

  const product = await client.product.create({
    data: {
      image: photoId,
      title,
      price: +price,
      description,
      subTitle,
      user: {
        connect: { id: user?.id },
      },
    },
  });

  const ad = await client.aD.create({
    data: {
      user: {
        connect: { id: user?.id },
      },
      product: {
        connect: {
          id: product.id,
        },
      },
      phone: Number(phone),
      address,
    },
  });
  res.json({ ok: true, id: product.id });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
