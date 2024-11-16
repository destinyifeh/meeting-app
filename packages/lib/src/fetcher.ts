export interface FetchError extends Error {
  status: number;
}
export async function fetchJson<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    let error = await res.text();
    if (res.status === 401) {
      error = res.statusText;
    }

    const err = new Error(error) as FetchError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}
