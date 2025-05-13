import { URL_API } from "../utils/constants";

export async function getSettings() {
  const res = await fetch(`${URL_API}/settings/getSettings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error.message || "Something went wrong. Could not fetch settings."
    );
  }

  return data.settings;
}

export async function updateSettings(body) {
  console.log("body;", body);
  const res = await fetch(`${URL_API}/settings/updateSettings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.error.message || "Something went wrong. Could not update settings."
    );
  }

  return data.updated;
}
