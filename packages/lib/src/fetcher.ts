interface FetchError extends Error {
  status: number;
}
export async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = await res.text();
    const err = new Error(error) as FetchError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}
