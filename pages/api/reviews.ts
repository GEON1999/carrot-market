import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { page },
  } = req;
  const { user } = req.session;
  const reviews = await client.review.findMany({
    where: {
      leaveForId: user?.id,
    },
    include: {
      leavedBy: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    take: 15,
    skip: (Number(page) - 1) * 15,
  });
  res.json({
    ok: true,
    reviews,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
