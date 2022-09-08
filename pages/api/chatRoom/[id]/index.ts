import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const chatRoom = await client.chatRoom.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      buyer: true,
      seller: true,
      messages: {
        select: {
          id: true,
          message: true,
          user: true,
        },
      },
    },
  });
  if (chatRoom?.buyer?.id === user?.id || chatRoom?.seller?.id === user?.id) {
    res.json({
      ok: true,
      chatRoom,
    });
  } else {
    res.json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
