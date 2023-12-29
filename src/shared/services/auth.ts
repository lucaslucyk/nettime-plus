const BASE_URL: string = 'http://127.0.0.1:8000';
const LOGIN_URL: string = `${BASE_URL}/auth/login/`;

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;

  detail?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

// const handleError = async function (err: Response) {
//   console.warn(err);
//   return new Response(JSON.stringify({
//       code: err.status,
//       message: await err.text()
//   }));
// };

export const login = async ({ username, password }: LoginCredentials): Promise<string> => {
  const res = await fetch(LOGIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: username,
      password: password,
      grant_type: 'password',
    }),
  });

  const data: LoginResponse = await res.json();
  if (!res.ok) {
    // throw new Error();
    const { detail } = data;
    return Promise.reject(detail);
  }
  //   const { access_token, token_type, expires_in } = data;
  const { access_token } = data;
  return access_token;
};
