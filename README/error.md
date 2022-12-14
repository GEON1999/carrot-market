## 1. Prisma & Planetscale π’

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

enter form μ email κΈ°μ μ μ μμ μΌλ‘ βuserβ μ΄ μμ±λμμ§λ§, phone κΈ°μ μ μμ±λμ§ μμλ€.

μλμ κ°μ μ€λ₯ λ©μμ§μ ν¨κ».

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

email μ λμ§λ§ phone μ λμ§ μκ³  phone μλ ₯ μ email is missing μ΄λΌλ error λ¬Έκ΅¬λ‘ email μ΄ required λκ³  μλ€λ κ²μ μ μ μμλ€.

λ¬Έμ λ, μ΄λμλ email μ΄ required λκ³  μμ§ μμλ€. form λ΄ register required μ‘°μ°¨ false λ‘ μ€μ  ν΄λ³΄μμ§λ§ μμλλ‘ μ€λ₯λ κ³ μ³μ§μ§ μμλ€.

κ°μ₯ μμ¬μ΄ λμλ κ±΄ schema.prisma μμ λ§λ€μ΄λ¨λ user μ model μ΄μλ€.

μ΄μ λ prisma studio μμλ phone κΈ°μ μ μμ±μ΄ λμ§ μμκΈ° λλ¬Έμ΄λ€.

νμ§λ§ μ¬κΈ°μλ μλμ κ°μ΄ email μ required μνκ° μλμλ€.

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

κ·Έλμ planetscale μμ db model μ΄ μ΄λ»κ² μ μ₯λμ΄μλμ§ νμΈμ νλλ°, planetscale μμλ email μ΄ required μνμλ€.

μ΅μ΄ model μμ± μμ email μ required μνλ‘ ν΄λ νμ΄μλ€. ν΄μ, `npx prisma db push` μ½λλ₯Ό ν΅ν΄ error μ ν΄κ²° ν  μ μλ€..

ν΄λΉ error μμΈμ μ°Ύκ³  μμ νλλ° 4μκ° μ λ μμλμλ€.

</br>

## 2. λ‘κ·ΈμΈ λΆκ°λ₯ν νμ.

withHandler function λ΄ μλ μ½λκ° λ¬Έμ μλ€.

```jsx
if (isPrivate && !req.session.user) {
  return res.status(401).json({ ok: false, error: "log in first" });
}
```

λ‘κ·ΈμΈ μ μ μκ² κ³΅κ°λλ μ£Όμλ μ€μ§ κ°μ νλ©΄ λΏμ΄λ€. μ΄λ©μΌ νΉμ λ²νΈλ₯Ό μλ ₯ ν confirm νμ΄μ§λ‘ λμ΄κ°μΌ νλλ°, μ΄λλ μμ§ token μμ± μ μ΄κΈ°μ β401β error λ₯Ό λ°ννκ³  confirm νμ΄μ§λ‘ λμ΄κ°λ κ²μ΄ λΆκ°λ₯νλ€.

β ν΄μ confirm api μμλ isPrivate λ₯Ό false λ‘ μ€μ νμ¬ ν΄κ²° νλ€.

</br>

## 3. fetch method κ° POST μΌ λμ custom function μ΄ μ μμ μΌλ‘ μλλμ§ μλ νμ

νμ¬ useMutation μ΄λΌλ custom function μ λ§λ€μ΄μ post μ μ¬μ©μ€μ΄λ€.

ν΄λΉ function μ μ­ν μ fetch μ νμλ‘ν url μ λ°κ³ , fetch (post) νμ response λ₯Ό json λ°μ΄ν°λ‘ λ°ννλ κ²μ΄λ€. μΆκ°λ‘ error λ°μ μ, λ‘λ© μ μ λν λ°μ΄ν°λ μ κ³΅ν΄μ€λ€.

νμ¬ ν΄λΉ function μμ 404 error κ° λ°μνκ³  μλ€.

useForm ν΅ν΄ handleSubmit μ input μ μλ ₯λ λ°μ΄ν°λ₯Ό λ°μ, useMutation ν¨μμ μΈμλ‘ μ λ¬μ νλλ°, μ΄ μΈμλ₯Ό μΈμ§νμ§ λͺ»νλ κ²μΈμ§, νΉμ λ λ€λ₯Έ μΈμμΈ urlμ fetch κ° μ μμ μΌλ‘ λμ§ μλ κ²μΈμ§, μ μκ° μλ€.

β

useMutation μ μ λ¬λλ data λ console μμμ μ μΆλ ₯μ΄ λκ³  μλ€. κ·Έλ λ€λ©΄ data μΈμλ μΈμμ΄ λκ³  μλ κ²μΈλ°, fetch μμ λ¬Έμ κ° μμ κ°λ₯μ±μ΄ λλ€.

fetch μ λ¬Έμ λΌλ©΄ μ‘°κΈ λ³΅μ‘νλ€.

μ΅μ΄μ fetch μ res λ₯Ό λ°μμ€λ κ²μ useMutation function μ μ­ν μ΄μ§λ§, fetch λ₯Ό νλ κ²½λ‘μ μ½λλ μλμ κ°λ€.

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

post λ₯Ό μλ‘ μμ±νλ handler μ withHandler μ΄ κ°μΈκ³ , κ°μΌ function λ withApiSession μΌλ‘ κ°μΌλ€.

κ°μμ μ­ν μ μλμ κ°λ€.

**withHandler** : handler μμμ method κ° req μ method κ° μΌμΉνμ§, λ‘κ·ΈμΈ λμ΄μμ§ μμ μ μ κ° μ κ·Όμ€μ΄μ§ μλμ§, λ λ€λ₯Έ error κ° λ°μνκ³  μμ§ μμμ§ λ± μ¬μ΄νΈ λ³΄νΈλ₯Ό μν function μ΄λ€.

**withApiSession** : iron session μ ν΅ν΄ μ¬μ΄νΈμμ μ μ μ μΏ ν€ μ session μ μ μ  μ λ³΄λ₯Ό μ μ₯νλ€. κ·Έλ¦¬κ³  μ μ₯ν μΈμμ ν΅ν΄ μ μ κ° λ‘κ·ΈμΈμ νλμ§ μ¬λΆμ μ μ μ μ λ³΄λ€μ κ²ν νκ³  μ μ μ κΆνλ€μ μ€μ νλ€.

β μ withHandler μ withApiSession μμλ error κ° λ°μν λ§ν μ½λκ° μλ€. μ μ΄μ withHandler λ μ¬μ΄νΈλ₯Ό λ³΄νΈνλ μ­ν μμΌλ‘ μμ΄μ Έλ μκ΄μ΄ μλ€. (μ€μ λ‘ μ½λλ₯Ό μ§μ°κ³  post ν΄λ³΄μμ§λ§ λμΌν error λ°μ)

withApiSession λν user μ μΈμ μ λ³΄μμ μνΈμμ©μ΄ μμλΏ, post μ λ°μνλ 404 error μλ λ¬΄κ΄ν λ― νλ€.

### β useMutation μ url μΈμλ₯Ό μ λ κ²½λ‘λ‘ μ€μ νμ¬ λ°μν μ€λ₯μλ€.

```
const [post, { data, loading }] = useMutation<WriteResponse>(`api/post`); // -> /api/post
```

</br>

### useEffect π¦

react λ html μ pre render νλ€.

ν΄μ λ°±μλμμμ useEffect λ₯Ό ν΅ν return κ°μ μ΅μ΄μ λ°μμ¬ μ μκ³  return κ°μ΄ λ€λ₯Έ ν¨μμ μΈμκ° λλ κ²½μ° null κ°μ΄ μ λ¬λκΈ°μ μ€λ₯λ₯Ό μΌκΈ°ν  μ μλ€.

β μ΄λ λκ°μ§ ν΄κ²°λ°©λ²μ΄ μλ€.

1. useEffect λ₯Ό ν΅ν΄ μ»λ return κ°μ μ΅μ΄κ°μ μ€μ ν΄μ£Όλ©΄ λλ€. κ·Έλ λ€λ©΄ null νΉμ undefined κ° λ°νλμ§ μκ³  μ΅μ΄ κ°μ μ λ¬νμ¬ errorλ λ°μνμ§ μλλ€(μ λ¬ νλ €λ κ°μ λ°μ΄ν° νμκ³Ό λμΌνκΈ° λλ¬Έ)
2. if λ¬Έμ ν΅ν΄ μΈμμ κ°μ΄ μ μμ μΌλ‘ λ°νλμλμ§ νμΈνκ³  μμ§ pre render μνλΌ μ μμ μΈ κ°μ λ°νλ°μ§ λͺ»νλ€λ©΄, ν¨μλ₯Ό μ€ννμ§ μλλ€.

</br>

## 4. π₯λΉλ‘κ·ΈμΈ μ μ λ‘λΆν°μ νμ΄μ§ λ³΄νΈκ° μ μ μλνμ§ μμ νμπ₯

`μ΄λ―Έμ§ λ§ν¬κ° νΈνλμ§ μμ, λΉμ μ»€λ°λ git history λ‘ λμ²΄`
[git history](https://www.notion.so/089bada574b940079159e30703da1097#6b07cb55f24949dfbf4bc132cc055d9b)

</br>

λ‘κ·ΈμΈ νμ§ μλ μ μ λ‘λΆν° μ¬μ΄νΈλ₯Ό λ³΄νΈνλ €κ³  νλλ°, μ΄ κ³Όμ μμ μ€λ₯κ° λ°μν©λλ€.

μΈμμ μ μ  μ λ³΄κ° μλ μνμμ λ€λ₯Έ νμ΄μ§λ‘ μ΄λν  κ²½μ° `/enter` κ²½λ‘λ‘ `replace` λμ§ μμ΅λλ€.

1. μ²« λ²μ§Έ μ΄λ―Έμ§ μ μ½λμμ μλ μ½λ μ€ `data && data.ok` μ μλ―Έλ `data` κ° μ‘΄μ¬νλ©΄μ `data.ok` κ° `true`(μλ¬΅μ  λ³ν) κ° μλ κ²½μ° `/enter` λ‘ `replace` μν¨λ€. λΌλ μλ―ΈμΈ κ² κ°μ΅λλ€. (/enter μ μ μΈ)

```jsx
useEffect(() => {
  if (data && !data.ok && router.pathname !== `/enter`) {
    router.replace("/enter");
  }
}, [data, router]);
```

2. λ λ²μ§Έ μ΄λ―Έμ§ `withHandler` ν¨μλ μλ μ½λ μ²λΌ `public` νμ§ μμ νμ΄μ§ μ΄λ©΄μ μΈμμ μ μ  μ λ³΄κ° μλ€λ©΄ ok: false λ₯Ό λ°ννλλ‘ νμ΅λλ€.

```jsx
if (isPrivate && !req.session.user) {
  return res.status(401).json({ ok: false, error: "log in first" });
}
```

3. 1λ²μ μ½λμ²λΌ `data` κ° μ‘΄μ¬νλ©΄μ `data.ok` κ° `false` μΈ κ²½μ° `/enter` κ²½λ‘λ‘ λ°νν΄μΌν©λλ€.

μ΄λ₯Ό μν΄ μ°μ  μΈμμ μ μ  μ λ³΄κ° μλλΌλ `data` κ° μμ΄μΌ ν©λλ€.

κ·Έλ¬κΈ°μν΄ 2λ² μμμ²λΌ `ok:false` λ₯Ό λ°ννλ κ²μ΄κ΅¬μ.

κ·Έλ°λ° \_app.tsx νμΌμμ μ μ­μΌλ‘ useUser() ν¨μλ₯Ό νΈμΆνκ³  useUser ν¨μμμ data λ₯Ό console.log ν΄λ³΄μμ§λ§, μΈμμ μ μ  μ λ³΄κ° μλ μλ dataκ° undefined μλλ€.λ¬Όλ‘  app.tsx κ° μλλΌ page/index μ κ°μ νμΌμμ μ§μ μ μΌλ‘ useUser() μ νΈμΆνλ©΄ dataλ₯Ό κ°μ Έμ΅λλ€λ§, μΈμμ μ μ  μ λ³΄κ° μλ κ²½μ° /enter κ²½λ‘λ‘ replace νλ κ²μ΄ μλ μ€λ₯κ° λ°μν©λλ€.

β

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

`swrCoing` λ₯Ό ν΅ν΄ `SWR hook` μ λν μ μ­ μ€μ μ΄ κ°λ₯νλ€.

μ μ΄λ―Έμ§λ₯Ό λ³΄λ©΄ μλμ κ°μ μ½λκ° μλ€.

```jsx
<SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
```

ν΄λΉ μ½λλ `swr hook` μ λν μ μ­ μ€μ μ΄λ€. `useUser` μ `useSwr` μ ν΅ν΄ `data` λ₯Ό μ»λλ€. μ¦, μ μ½λλ₯Ό μ¬μ©ν΄μ `data` λ₯Ό μ»λλ€. κ·Έλ°λ° `useUser` μ `SWRCoing` μΈλΆμμ μ€ννμΌλ, ν΄λΉ `hook` μ΄ μ μ©λμ§ μμ κ²μ΄κ³  μ μμ μΈ `data` λ₯Ό μ»μ§ λͺ»ν κ²μ΄λ€.
μ΄λ₯Ό ν΄κ²°νκΈ° μν΄ `ValidateUser` ν¨μλ₯Ό μ μΈνκ³  `SWRCoifig` λ΄λΆμμ νΈμΆνλλ‘ νμλ€.

</br>

# 5. vercel λ°°ν¬

λ°°ν¬μ planet scale κ³Όμ μ°κ²°μ μ±κ³΅μ μΌλ‘ λμμΌλ©°, data κ° μ μμ μΌλ‘ λΈμΆ λμλ€.
get method μ fetch λν(SWR) μ μμ μΌλ‘ μλνλ€.
κ·Έλ¬λ post method μ fetch λ₯Ό ν΄μ£Όλ mutation function μ΄ μ μ μλνμ§ μμλ€.
iron session μ issue μΈμ§ post method μ issue μΈμ§ λͺνν νμΈμ΄ νμνλ€.

μ΄λ₯Ό μν΄ iron sessionμ΄ νμλ‘νμ§ μμ page μμ post fetch λ₯Ό ν΄λ³΄μμΌλ λμΌν error κ° λΈμΆλλ κ²μΌλ‘
λ³΄μ post memthod μ fetch λ₯Ό ν΄μ£Όλ mutation function μ λ¬Έμ μΌλ― νλ€.

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
- error μ μμΈμ vercel λ΄ Environment Variables μ κ°λ€μ΄ ""λ‘ κ°μΈμ§ ννμκ³ , vercel μ΄ μ μμ μΌλ‘ κ°μ μΈμνμ§ λͺ»νλ€.
  - μ΄λ‘ μΈν΄ cloudflare, nodemailerm planetScale λ± μΈλΆ apiλ₯Ό μ¬μ©νκ±°λ μ°κ²°μ΄ νμλ‘ν κΈ°λ₯λ€μ΄ μ μμλνμ§ μμλ€.
- Environment Variables μ κ°μμ ""λ₯Ό μ κ±°νκ³  λͺ¨λ μ μ μλνλ€.


<br/>

# 6. Hydration Error
react λ κΈ°λ³Έμ μΌλ‘ root λΌλ id λ₯Ό κ°μ§ div μ κ°μΈμ Έμλ€.    
μ΄λ₯Ό λ§κ°νκ³  nextPage μμ body νκ·Έλ₯Ό μ¬μ© νμλλ°, hydration error κ° λ°μνλ€.

<br/>

# 7. nodemailer error
- vercel μμ smtp λ₯Ό μ°¨λ¨ν μ΄μ λ‘ nodemailer κ° μ μ μλνμ§ μμ
- μμΈμ μΌλ‘ nodemailer μ smtp λ₯Ό νμ© νλ€κ³  νμ§λ§, κ²μμ λμΌν νμμ κ²©λ μ μ  λ€μ
- emailJs λ‘ λ³κ²½νμ¬ 

## 8. Hydration error2

- μ΄μνκ² νΉμ  `page` μμλ§ hydration error κ° μ§μλλ€.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7d205a52-36e9-4cac-9da4-55c8c01a3839/Untitled.png)

- `<a>` νκ·Έ λ΄ μμ `validateDOMNesting` μ μ¬μ©ν  μ μλ€λ error μλ€.

```jsx
<Link href="/">
	<a>
		<Profile/>
	</a>
</Link>
```

- μμ κ°μ κ΅¬μ‘°μ μ½λλ€μμ λ°μνλ error μλλ° `Profile` component μμ μ¬μ©ν μΌν­μ°μ°μ λλ¬Έμ λ°μνλ error μλ€.

```jsx
<button onClick={()=>router.push("/")}>
	<Profile/>
</button>
```

- μμ κ°μ΄ λ³κ²½ ν error κ° ν΄κ²° λμλ€.


## 9. grid μ null λ°μ΄ν°λ₯Ό κ³΅λ°±μΌλ‘ λ¨κΈ°λ νμ
- κ΄κ³  μνλ€μ `data.map` μΌλ‘ λμ΄μ κ΄κ³ κ° μλ μνμ μΌν­ μ°μ°μλ‘ null μ²λ¦¬λ₯Ό νλ€.
- μ΄λ null μ²λ¦¬λ μνλ€μ κ³΅κ°μ΄ μκ²¨λ¬λ€.

</br>

> μμΈ & ν΄κ²°
- κ³΅κ°μ΄ μκ²¨λ μ΄μ λ div μμ key κ°μ μ€¬μκ³ , κ·Έ μμμ μΌν­μ°μ°μλ‘ null μ²λ¦¬λ₯Ό νκΈ° λλ¬Έμ λΉ div κ° λ°μ νμμ
- μ΄λ₯Ό ν΄κ²°νκ³ μ μΌν­μ°μ°μλ‘ μ°μ  νν°λ₯Ό κ±ΈμΉ ν key κ°μ λΆμ¬ν¨μΌλ‘μ 
