import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { comment },
    session: { user },
    query: { id },
  } = req;
  const newComment = await client.comment.create({
    data: {
      comment,
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
  res.json({
    ok: true,
    comment: newComment,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
