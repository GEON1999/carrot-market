import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const purchases = await client.purchase.findMany({
    where: {
      userId: Number(id),
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              fav: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    purchases,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
