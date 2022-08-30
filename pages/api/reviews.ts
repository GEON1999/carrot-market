import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
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
  });
  res.json({
    ok: true,
    reviews,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
