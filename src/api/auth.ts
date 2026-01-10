import axios from "axios";

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: "bearer";
  scope: string;
}

export async function login(username: string, password: string) {
  const res = await axios.post<LoginResponse>(
    process.env.REACT_APP_KITSU_OAUTH_URL!,
    {
      grant_type: "password",
      username,
      password,
      client_id: process.env.REACT_APP_KITSU_CLIENT_ID!,
      client_secret: process.env.REACT_APP_KITSU_CLIENT_SECRET!,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}
