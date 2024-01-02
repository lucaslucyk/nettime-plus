const BASE_URL: string = 'http://127.0.0.1:8000';
// TODO: change this to .../me/apps on backend
const USER_APPS_URL: string = `${BASE_URL}/me/apps/`;

interface SftpParams {
  accessToken: string;
  appId: string;
  path: string;
}

interface ErrorResponse {
  detail: string;
}

export const listDir = async ({ accessToken, appId, path = '/' }: SftpParams): Promise<string[]> => {
  const params = new URLSearchParams({ path: path });
  const url = `${USER_APPS_URL}${appId}/listdir?${params.toString()}`;
  // console.log(url);
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data: string[] | ErrorResponse = await res.json();

  if (!res.ok) {
    if ('detail' in data) {
      const { detail } = data;
      return Promise.reject(detail);
    }
    return Promise.reject('Unknown error');
  }
  if (Array.isArray(data)) {
    return data;
  } else {
    return Promise.reject('Response error');
  }
};

export const getBlob = async (reader: ReadableStreamDefaultReader) => {
  const chunks: Uint8Array[] = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      // console.log('read done');
      break;
    }
    // console.log('value', value);
    chunks.push(value);
  }

  const blob = new Blob(chunks);
  return blob;
};

export const getFileReader = async ({
  accessToken,
  appId,
  path = '/',
}: SftpParams): Promise<ReadableStreamDefaultReader | void> => {
  const params = new URLSearchParams({ filepath: path });
  const url = `${USER_APPS_URL}${appId}/getfile?${params.toString()}`;
  // console.log(url);
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream',
    },
  });
  if (!res.ok) {
    return Promise.reject('Error getting file');
  }
  if (!res?.body) return;
  const reader = res.body.getReader();
  return reader;
};

export const removeObject = async ({ accessToken, appId, path = '/' }: SftpParams): Promise<void> => {
  const params = new URLSearchParams({ path: path });
  const url = `${USER_APPS_URL}${appId}/remove?${params.toString()}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return Promise.reject('Error removing file');
  }
};
