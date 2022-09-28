import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    query: { id, userId },
    body: { review },
  } = req;
  console.log(user, id, userId, review);
  await client.review.create({
    data: {
      review: review,

      leavedBy: {
        connect: {
          id: user?.id,
        },
      },
      leaveFor: {
        connect: {
          id: Number(userId),
        },
      },
      product: {
        connect: {
          id: Number(id),
        },
      },
    },
  });
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
