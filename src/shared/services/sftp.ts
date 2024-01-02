const BASE_URL: string = 'http://127.0.0.1:8000';
// TODO: change this to .../me/apps on backend
const USER_APPS_URL: string = `${BASE_URL}/users/me/apps/`;

interface SftpParams {
  accessToken: string;
  appId: string;
  path: string;
}

interface ErrorResponse {
  detail: string;
}

export const listDir = async ({ accessToken, appId, path = '/' }: SftpParams): Promise<string[]> => {
  const params = new URLSearchParams({path: path})
  const url = `${USER_APPS_URL}${appId}/listdir?${params.toString()}`
  console.log(url);
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

export const getFile = ({ path }: SftpParams): string => {
  return path;
};
