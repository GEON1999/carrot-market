import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      body: { chatRoomId },
    } = req;
    const newNotification = await client.notification.create({
      data: {
        chatRoom: {
          connect: {
            id: Number(chatRoomId),
          },
        },
      },
    });
    res.json({ ok: true, newNotification });
  }
  if (req.method === "DELETE") {
    const {
      body: { chatRoomId },
    } = req;
    await client.notification.deleteMany({
      where: {
        chatRoomId: Number(chatRoomId),
      },
    });
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "DELETE"], handler })
);
