import { URL_API } from "../utils/constants";

export async function updateCurrentUser(body) {
  try {
    const res = await fetch(`${URL_API}/user/updateMe`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(
        data.error.message ||
          "Something went wrong. Could not update current user."
      );

    return data;
  } catch (err) {
    return err;
  }
}
