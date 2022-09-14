import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { createDeflate } from "zlib";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const {
      query: { page },
    } = req;
    const products = await client.product.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        _count: {
          select: {
            fav: true,
          },
        },
      },
      take: 15,
      skip: (Number(page) - 1) * 15,
    });
    res.json({ ok: true, products });
  }

  if (req.method === "POST") {
    const {
      body: { title, price, description, subTitle, photoId },
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
    res.json({ ok: true, id: product.id });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
