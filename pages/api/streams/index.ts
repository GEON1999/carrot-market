import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      session: { user },
      body: { stream, product, price, description },
    } = req;
    const streams = await client.stream.create({
      data: {
        streamTitle: stream,
        title: product,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      streams,
    });
  }
  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      include: { user: {} },
    });
    res.json({ ok: true, streams });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
