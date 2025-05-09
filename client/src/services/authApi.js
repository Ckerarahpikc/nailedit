import { URL_API } from "../utils/constants";

export async function login({ email, password }) {
  const res = await fetch(`${URL_API}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data?.user;
}

export async function register({ name, email, password, confirmPassword }) {
  const res = await fetch(`${URL_API}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword,
    }),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return data?.user;
}

export async function logout() {
  const res = await fetch(`${URL_API}/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error);

  return null;
}

export async function checkSession() {
  const res = await fetch(`${URL_API}/user/check-session`, {
    credentials: "include",
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error.message || "Session check failed");
  }

  return data.user;
}
