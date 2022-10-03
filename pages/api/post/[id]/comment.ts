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
  if (req.method === "POST") {
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
  if (req.method === "DELETE") {
    const { body: commentId } = req;
    await client.comment.delete({
      where: {
        id: Number(commentId),
      },
    });
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "DELETE"], handler })
);
