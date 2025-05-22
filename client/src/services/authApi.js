import { URL_API } from "../utils/constants";

// mutation
export async function login({ email, password }) {
  const res = await fetch(`${URL_API}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(
      data.error?.message ||
        "Something went wrong. Could not login current user."
    );
    error.response = { status: res.status, data };
    throw error;
  }

  return data?.user;
}

// mutation
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
  if (!res.ok)
    throw new Error(
      data.error.message ||
        "Something went wrong. Could not register current user."
    );

  return data?.user;
}

// mutation
export async function logout() {
  const res = await fetch(`${URL_API}/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok)
    throw new Error(
      data.error.message ||
        "Something went wrong. Could not logout current user."
    );

  return null;
}

// query
export async function checkSession() {
  const res = await fetch(`${URL_API}/user/check-session`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Cache-Control": "no-cache",
    },
  });

  // unauthorized users
  if (res.status === 401) {
    throw new Error("Unauthorized: Please log in again.");
  }

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.error?.message || "Session invalid");
    error.response = { status: res.status, data };
    throw error;
  }

  return data.user;
}
