import { useState } from "react";

interface useMutationState {
  loading: boolean;
  data: undefined | any;
  error: undefined | any;
}

type useMutationResult = [(data?: any) => void, useMutationState];
// 아무것도 return 하지 않는다는 것을 명시적으로 표기 하는 void.

export default function useMutation(url: string): useMutationResult {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  async function mutation(data: any) {
    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        response.json().catch(() => {});
      })
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  return [mutation, { loading, data, error }];
}
