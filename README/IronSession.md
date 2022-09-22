## Cookie VS Token

- cookie 는 브라우저에서 사용 가능하지만 mobile app 에서는 사용이 불가능함
- mobile app 에서는 이를 위해 token 을 사용할 수 있음

## Session

> ssr 에서는 유저가 로그인을 하더라도 모든 api는 독립적으로 존재하기 때문에(연결x) 페이지 이동 시 로그인 상태가 유지되지 않음
> 
- 유저가 로그인 시 로그인 정보(user id) 를 session 에 저장하고, respone 에 쿠키로 담아서 줌.
- 유저는 로그인 정보가 담긴 session 을 cookie 로 받게되고, 독립적인 페이지를 이동할 때 마다 session 을 담고 있는 cookie 를 서버에 전달함.

## IronSession

위에서 설명한 session 을 저장하는 tool 임

```jsx
create : user id -> encrypt -> send encrypted cookie ***
req : *** -> decrypt -> user id // 서버에 요청 시 암호화된 쿠키를 해석하고 user 와 동일한지 확인 함
```

사용방법

```jsx
// pages/api/login.ts

import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // get user from database then:
    req.session.user = {
      id: 230,
      admin: true,
    };
    await req.session.save();
    res.send({ ok: true });
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);
```

- 실행하고자 하는 함수를 withIronSession function 으로 감싸주면 됨
