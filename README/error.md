## 1. Prisma & Planetscale 💢

```
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body;
  let user;

  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });
    if (user) console.log("found it.");
    if (!user) {
      console.log("Did not find. Will create.");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  }
}

export default withHandler("POST", handler);
```

enter form 에 email 기입 시 정상적으로 ‘user’ 이 생성되었지만, phone 기입 시 생성되지 않았다.

아래와 같은 오류 메시지와 함께.

```jsx
PrismaClientValidationError:
Invalid `prisma.user.create()` invocation:

{
  data: {
    name: 'Anonymous',
    phone: 123,
+   email: String,
?   avatar?: String | null,
?   createdAt?: DateTime,
?   updatedAt?: DateTime
  }
}

Argument email for data.email is missing.

Note: Lines with + are required, lines with ? are optional.
```

email 은 되지만 phone 은 되지 않고 phone 입력 시 email is missing 이라는 error 문구로 email 이 required 되고 있다는 것을 알 수 있었다.

문제는, 어디에도 email 이 required 되고 있지 않았다. form 내 register required 조차 false 로 설정 해보았지만 예상대로 오류는 고쳐지지 않았다.

가장 의심이 되었던 건 schema.prisma 에서 만들어놨던 user 의 model 이였다.

이유는 prisma studio 에서도 phone 기입 시 생성이 되지 않았기 때문이다.

하지만 여기서도 아래와 같이 email 은 required 상태가 아니였다.

```jsx
model User {
  id        Int      @id @default(autoincrement())
  phone     Int?     @unique
  email     String?  @unique
  name      String
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

그래서 planetscale 에서 db model 이 어떻게 저장되어있는지 확인을 했는데, planetscale 에서는 email 이 required 상태였다.

최초 model 생성 시에 email 을 required 상태로 해둔 탓이였다. 해서, `npx prisma db push` 코드를 통해 error 을 해결 할 수 있다..

해당 error 원인을 찾고 수정하는데 4시간 정도 소요되었다.

</br>

## 2. 로그인 불가능한 현상.

withHandler function 내 아래 코드가 문제였다.

```jsx
if (isPrivate && !req.session.user) {
  return res.status(401).json({ ok: false, error: "log in first" });
}
```

로그인 유저에게 공개되는 주소는 오직 가입 화면 뿐이다. 이메일 혹은 번호를 입력 후 confirm 페이지로 넘어가야 하는데, 이때도 아직 token 생성 전이기에 ‘401’ error 를 반환하고 confirm 페이지로 넘어가는 것이 불가능하다.

→ 해서 confirm api 에서는 isPrivate 를 false 로 설정하여 해결 했다.

</br>

## 3. fetch method 가 POST 일 때의 custom function 이 정상적으로 작동되지 않는 현상

현재 useMutation 이라는 custom function 을 만들어서 post 시 사용중이다.

해당 function 의 역할은 fetch 시 필요로한 url 을 받고, fetch (post) 후의 response 를 json 데이터로 반환하는 것이다. 추가로 error 발생 시, 로딩 시 에 대한 데이터도 제공해준다.

현재 해당 function 에서 404 error 가 발생하고 있다.

useForm 통해 handleSubmit 시 input 에 입력된 데이터를 받아, useMutation 함수에 인수로 전달을 하는데, 이 인수를 인지하지 못하는 것인지, 혹은 또 다른 인수인 url의 fetch 가 정상적으로 되지 않는 것인지, 알 수가 없다.

→

useMutation 에 전달되는 data 는 console 상에서 잘 출력이 되고 있다. 그렇다면 data 인수는 인식이 되고 있는 것인데, fetch 에서 문제가 있을 가능성이 높다.

fetch 의 문제라면 조금 복잡하다.

최초의 fetch 와 res 를 받아오는 것은 useMutation function 의 역할이지만, fetch 를 하는 경로의 코드는 아래와 같다.

```jsx
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { question },
    session: { user },
  } = req;

  const post = await client.post.create({
    data: {
      question,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
```

post 를 새로 생성하는 handler 을 withHandler 이 감싸고, 감싼 function 또 withApiSession 으로 감싼다.

각자의 역할은 아래와 같다.

**withHandler** : handler 에서의 method 가 req 의 method 가 일치한지, 로그인 되어있지 않은 유저가 접근중이진 않는지, 또 다른 error 가 발생하고 있지 않은지 등 사이트 보호를 위한 function 이다.

**withApiSession** : iron session 을 통해 사이트에서 유저의 쿠키 속 session 에 유저 정보를 저장한다. 그리고 저장한 세션을 통해 유저가 로그인을 했는지 여부와 유저의 정보들을 검토하고 유저의 권한들을 설정한다.

→ 위 withHandler 와 withApiSession 에서는 error 가 발생할만한 코드가 없다. 애초에 withHandler 는 사이트를 보호하는 역할임으로 없어져도 상관이 없다. (실제로 코드를 지우고 post 해보았지만 동일한 error 발생)

withApiSession 또한 user 와 세션 정보와의 상호작용이 있을뿐, post 시 발생하는 404 error 와는 무관한 듯 하다.

### → useMutation 의 url 인수를 절대 경로로 설정하여 발생한 오류였다.

```
const [post, { data, loading }] = useMutation<WriteResponse>(`api/post`); // -> /api/post
```

</br>

### useEffect 💦

react 는 html 을 pre render 한다.

해서 백엔드에서의 useEffect 를 통한 return 값은 최초에 받아올 수 없고 return 값이 다른 함수의 인수가 되는 경우 null 값이 전달되기에 오류를 야기할 수 있다.

→ 이때 두가지 해결방법이 있다.

1. useEffect 를 통해 얻는 return 값에 최초값을 설정해주면 된다. 그렇다면 null 혹은 undefined 가 반환되지 않고 최초 값을 전달하여 error는 발생하지 않는다(전달 하려는 값의 데이터 타입과 동일하기 때문)
2. if 문을 통해 인수의 값이 정상적으로 반환되었는지 확인하고 아직 pre render 상태라 정상적인 값을 반환받지 못했다면, 함수를 실행하지 않는다.

</br>

## 4. 💥비로그인 유저로부터의 페이지 보호가 정상 작동하지 않은 현상💥

`이미지 링크가 호환되지 않아, 당시 커밋된 git history 로 대체`
[git history](https://www.notion.so/089bada574b940079159e30703da1097#6b07cb55f24949dfbf4bc132cc055d9b)

</br>

로그인 하지 않는 유저로부터 사이트를 보호하려고 하는데, 이 과정에서 오류가 발생합니다.

세션에 유저 정보가 없는 상태에서 다른 페이지로 이동할 경우 `/enter` 경로로 `replace` 되지 않습니다.

1. 첫 번째 이미지 속 코드에서 아래 코드 중 `data && data.ok` 의 의미는 `data` 가 존재하면서 `data.ok` 가 `true`(암묵전 변환) 가 아닌 경우 `/enter` 로 `replace` 시킨다. 라는 의미인 것 같습니다. (/enter 은 제외)

```jsx
useEffect(() => {
  if (data && !data.ok && router.pathname !== `/enter`) {
    router.replace("/enter");
  }
}, [data, router]);
```

2. 두 번째 이미지 `withHandler` 함수는 아래 코드 처럼 `public` 하지 않은 페이지 이면서 세션에 유저 정보가 없다면 ok: false 를 반환하도록 했습니다.

```jsx
if (isPrivate && !req.session.user) {
  return res.status(401).json({ ok: false, error: "log in first" });
}
```

3. 1번의 코드처럼 `data` 가 존재하면서 `data.ok` 가 `false` 인 경우 `/enter` 경로로 반환해야합니다.

이를 위해 우선 세션에 유저 정보가 없더라도 `data` 가 있어야 합니다.

그러기위해 2번 에서처럼 `ok:false` 를 반환하는 것이구요.

그런데 \_app.tsx 파일에서 전역으로 useUser() 함수를 호출하고 useUser 함수에서 data 를 console.log 해보았지만, 세션에 유저 정보가 있던 없던 data가 undefined 입니다.물론 app.tsx 가 아니라 page/index 와 같은 파일에서 직접적으로 useUser() 을 호출하면 data를 가져옵니다만, 세션에 유저 정보가 없는 경우 /enter 경로로 replace 하는 것이 아닌 오류가 발생합니다.

→

```
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";

function ValidateUser() {
  useUser();
  return null;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <ValidateUser />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
```

`swrCoing` 를 통해 `SWR hook` 에 대한 전역 설정이 가능하다.

위 이미지를 보면 아래와 같은 코드가 있다.

```jsx
<SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
```

해당 코드는 `swr hook` 에 대한 전역 설정이다. `useUser` 은 `useSwr` 을 통해 `data` 를 얻는다. 즉, 위 코드를 사용해서 `data` 를 얻는다. 그런데 `useUser` 을 `SWRCoing` 외부에서 실행했으니, 해당 `hook` 이 적용되지 않은 것이고 정상적인 `data` 를 얻지 못한 것이다.
이를 해결하기 위해 `ValidateUser` 함수를 선언하고 `SWRCoifig` 내부에서 호출하도록 하였다.

</br>

# 5. vercel 배포

배포시 planet scale 과의 연결은 성공적으로 되었으며, data 가 정상적으로 노출 되었다.
get method 의 fetch 또한(SWR) 정상적으로 작동했다.
그러나 post method 의 fetch 를 해주는 mutation function 이 정상 작동하지 않았다.
iron session 의 issue 인지 post method 의 issue 인지 명확한 확인이 필요하다.

이를 위해 iron session이 필요로하지 않은 page 에서 post fetch 를 해보았으나 동일한 error 가 노출되는 것으로
보아 post memthod 의 fetch 를 해주는 mutation function 의 문제일듯 하다.

```
import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data?: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setSate((prev) => ({ ...prev, data, loading: false })))
      .catch((error) =>
        setSate((prev) => ({ ...prev, error, loading: false }))
      );
  }
  return [mutation, { ...state }];
}

```

</br>

=>

### Solution
- error 의 원인은 vercel 내 Environment Variables 의 값들이 ""로 감싸진 형태였고, vercel 이 정상적으로 값을 인식하지 못했다.
  - 이로 인해 cloudflare, nodemailerm planetScale 등 외부 api를 사용하거나 연결이 필요로한 기능들이 정상작동하지 않았다.
- Environment Variables 의 값에서 ""를 제거하고 모두 정상 작동했다.

