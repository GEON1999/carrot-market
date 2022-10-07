import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

// iron session에 sesstion type 정의
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions: IronSessionOptions = {
  cookieName: "CarotSession",
  password: process.env.SESSION_PASSWORD as string,
};

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
