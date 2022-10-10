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
      chatRooms: {
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          buyer: true,
          messages: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
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
  if (req.method === "GET") {
    const filter = product?.title.split(" ").map((word) => ({
      title: {
        contains: word,
      },
    }));
    console.log(product?.title?.split(" "));
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
    console.log(relatedProducts);
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
  if (req.method === "DELETE") {
    await client.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "DELETE"], handler })
);
