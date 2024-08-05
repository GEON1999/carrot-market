import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.json({
      ok: true,
      profile,
    });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name, avatarId },
    } = req;

    /*if (email && email !== currentUser?.email) {
      const alreadyExist = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });
      if (alreadyExist) {
        return res.json({
          ok: false,
          error: "This email already exists",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      res.json({
        ok: true,
      });
    }
    if (phone && phone !== currentUser?.phone) {
      const alreadyExist = await client.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      });
      if (alreadyExist) {
        return res.json({
          ok: false,
          error: "This phone already exists",
        });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      res.json({
        ok: true,
      });
    }*/
    if (name && avatarId !== undefined) {
      await client.user.update({
        where: { id: user?.id },
        data: { avatar: avatarId, name:name },
      });
      res.json({ ok: true });
    } else if(name){
        await client.user.update({
            where: { id: user?.id },
            data: { name },
        });
      res.json({ ok: true });
    }


  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
