import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  const sales = await client.sale.findMany({
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
    sales,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
