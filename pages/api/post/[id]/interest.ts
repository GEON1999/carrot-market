import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  const isInterested = await client.interest.findFirst({
    where: {
      postId: Number(id),
      userId: user?.id,
    },
  });
  if (isInterested) {
    await client.interest.delete({
      where: {
        id: Number(isInterested.id),
      },
    });
  } else if (!isInterested) {
    await client.interest.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
