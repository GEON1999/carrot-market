import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token, kakaoName, kakaoId } = req.body;
  if (token) {
    const foundToken = await client.token.findUnique({
      where: {
        token,
      },
      include: {
        user: true,
      },
    });
    if (!foundToken) return res.status(404).end();
    req.session.user = {
      id: foundToken?.userId,
    };
    await req.session.save();
    await client.token.deleteMany({
      where: {
        userId: foundToken?.userId,
      },
    });
    res.json({ ok: true });
  }

  if (kakaoName) {
    const kakaoUser = await client.user.findFirst({
      where: {
        kakaoId: kakaoId,
      },
    });
    if (!kakaoUser) return res.status(404).end();
    req.session.user = {
      id: kakaoUser?.id,
    };
    await req.session.save();
    res.json({ ok: true });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
