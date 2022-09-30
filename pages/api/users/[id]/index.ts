import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { createDeflate } from "zlib";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const user = await client.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  const products = await client.product.findMany({
    where: {
      user: {
        id: Number(id),
      },
    },
    include: {
      reviews: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          fav: true,
          chatRooms: true,
        },
      },
    },
  });
  const post = await client.post.findMany({
    where: {
      user: {
        id: Number(id),
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          interest: true,
          comments: true,
        },
      },
    },
  });
  res.json({ ok: true, products, post, user });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
