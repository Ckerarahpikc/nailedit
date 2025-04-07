import { URL_API } from "../utils/constants";

export async function login({ email, password }) {
  console.log("email pass:", email, password);
  const res = await fetch(`${URL_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw data.error;

  return data?.user;
}

export async function register({ name, email, password, confirmPassword }) {
  const res = await fetch(`${URL_API}/register`, {
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
  });

  const data = await res.json();
  if (!res.ok) throw data.error;

  return data?.user;
}
