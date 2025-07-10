import { redirect } from "react-router-dom";
import { API_URL, AUTH_MODE } from "../../../constants";
import { setAuthToken } from "../../../utils/auth";

export async function authAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== AUTH_MODE.login && mode !== AUTH_MODE.signup) {
    throw new Response(JSON.stringify({ message: "Unsupported mode." }), {
      status: 422,
    });
  }

  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(`${API_URL}/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not authenticate user." }),
      {
        status: 500,
      }
    );
  }

  const resData = await response.json();
  const token = resData.token;

  setAuthToken(token);

  return redirect("/");
}
