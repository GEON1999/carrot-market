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
    await client.comment.delete({
      where: {},
    });
  }
  //comment delete 를 위한 container 를 만들어야함
}

export default withApiSession(
  withHandler({ methods: ["POST", "DELETE"], handler })
);
