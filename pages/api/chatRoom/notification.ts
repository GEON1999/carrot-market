import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { contactId, chatRoomId },
  } = req;

  console.log(contactId, chatRoomId);

  await client.notification.create({
    data: {
      user: {
        connect: {
          id: contactId,
        },
      },
      chatRoom: {
        connect: {
          id: Number(chatRoomId),
        },
      },
    },
  });
  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
