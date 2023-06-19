import { extractStringFromEnd, getAccessToken } from './generic';

const NO_AUTH_HEADER_ROUTES = ['signup', 'login'];

export async function fetchCall(url, opts = {}) {
  console.log('fetch call', { url, ...opts });
  const headers = {
    'Content-Type': 'application/json',
    ...(opts.method !== 'GET' &&
      !NO_AUTH_HEADER_ROUTES.includes(extractStringFromEnd(url)) && {
        Authorization: `Bearer ${getAccessToken()}`,
      }),
  };
  const body = { body: JSON.stringify(opts.data) };

  const OPTIONS = {
    method: opts.method || 'GET',
    headers,
    ...(opts.method !== 'GET' && body),
    // ...opts,
  };

  console.log({ url, OPTIONS });

  try {
    const res = await fetch(url, OPTIONS);

    // if (!res.ok) {
    //   throw new Error('Fetch Api Request failed!');
    // }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    // return error;
  }
}
