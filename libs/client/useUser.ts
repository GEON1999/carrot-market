import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser() {
  const { data, error } = useSWR("/api/users/me");
  console.log(data);
  const router = useRouter();
  useEffect(() => {
    if (
      data &&
      !data.ok &&
      router.pathname !== `/enter` &&
      router.pathname !== `/enter/profile`
    ) {
      router.replace("/enter");
    }
    if (data && data.ok && router.pathname === "/enter") {
      router.replace("/");
    }
  }, [data, router]);

  return { user: data?.profile, isLoading: !data && !error };
}
