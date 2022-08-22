import { useState } from "react";

interface useMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type useMutationResult<T> = [(data?: any) => void, useMutationState<T>];
// 아무것도 return 하지 않는다는 것을 명시적으로 표기 하는 void.

export default function useMutation<T>(url: string): useMutationResult<T> {
  const [state, setState] = useState<useMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  return [mutation, { ...state }];
}
