import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const filter = product?.title.split(" ").map((word) => ({
    title: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: filter,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = await client.fav.findFirst({
    where: {
      productId: Number(id),
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  res.json({ ok: true, product, relatedProducts, isLiked });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
