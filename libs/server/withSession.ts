import { withIronSessionApiRoute } from "iron-session/next";

// iron session에 sesstion type 정의
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "CarotSession",
  password: process.env.SESSION_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
