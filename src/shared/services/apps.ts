const BASE_URL: string = 'http://127.0.0.1:8000';
// TODO: change this to .../me/apps on backend
const USER_APPS_URL: string = `${BASE_URL}/users/me/apps/`;

interface GetUserAppsParams {
  accessToken: string;
}

interface UserApp {
  name: string;
  kind: string;
  id: string;
}

interface ErrorResponse {
  detail: string;
}

export const getUserApps = async ({ accessToken }: GetUserAppsParams): Promise<UserApp[]> => {
  // console.log(accessToken);
  const res = await fetch(USER_APPS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data: UserApp[] | ErrorResponse = await res.json();
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
