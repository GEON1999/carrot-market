# SWR

```tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useUser() {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/me")
      .then((respone) => respone.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
        }
        setUser(data.profile);
      });
  }, [router]);
  return user;
}
```

VS

```tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
```

- 로그인 되어 있지 않는 유저로 부터 보호하기 위한 설정을 했다.
- SWR 사용 이전엔 페이지 이동 시 매번 req, res 을 반복해서 session 내 user 정보를 확인 했다.
- SWR 사용 시 페이지에서 Session 정보를 받고 추후 다시 해당 페이지로 돌아오면 loading 하지  않고 기존 Session 정보를 활용해 data 를 보여주고, 보이지 않는 곳에서 바뀐 정보가 있는지 확인 후 업데이트 했다.

## SWRConfig

```tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
```

fetcher 은 `const { data, error } = useSWR("/api/users/me", fetcher);` 코드에 매번 들어가야하며, 해당 코드가 있는 곳에선 항상 fetcher 이 선언되어 있어야한다.

이와 같은 수고를 덜기 위해 fetcher 을 전역에 선언 해놓을 수 있다.

### useSWRConfig 을 이용해 url 상에 있는 데이터를 수정할 수 있다.

ex)

```jsx

  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false); // api/user/me 에 있는 ok 데이터를 기존의 반대로 변경함. 여기서 url 은 url 임과 동시에 key value 임
    toggleFav({});
  };
```
