import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body,
    session: { user },
  } = req;
  const products = await client.product.findUnique({
    where: {
      id: Number(body),
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });
  const isChatRoom = await client.chatRoom.findFirst({
    where: {
      productId: Number(body),
      sendingId: user?.id,
      receivingId: products?.userId,
    },
  });
  if (isChatRoom) {
    res.json({ isChatRoom });
  } else {
    const chatRoom = await client.chatRoom.create({
      data: {
        product: {
          connect: {
            id: Number(body),
          },
        },
        sending: {
          connect: {
            id: user?.id,
          },
        },
        receiving: {
          connect: {
            id: products?.userId,
          },
        },
      },
    });
    res.json({ ok: true, chatRoom });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
