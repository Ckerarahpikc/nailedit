import { URL_API } from "../utils/constants";

export async function updateProfilePicture(formData) {
  try {
    const res = await fetch(`${URL_API}/upload/uploadPicture`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    return err;
  }
}

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
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    return err;
  }
}
