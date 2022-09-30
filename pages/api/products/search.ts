import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { title },
  } = req;
  const filter = title.split(" ").map((word: string) => ({
    title: {
      contains: word,
    },
  }));
  const products = await client.product.findMany({
    where: {
      OR: filter,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    include: {
      _count: {
        select: {
          fav: true,
          chatRooms: true,
        },
      },
      reviews: {
        select: {
          review: true,
        },
      },
      ADs: true,
    },
  });

  res.json({ ok: true, products });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
