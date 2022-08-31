import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";
import Id from "pages/api/post/[id]";

// iron session에 sesstion type 정의
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

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
      body: { email, phone, name },
    } = req;
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (email && email !== currentUser?.email) {
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
    }
    if (name && name !== currentUser?.name) {
      await client.user.update({
        where: { id: user?.id },
        data: { name },
      });
      res.json({ ok: true });
    }
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler })
);
