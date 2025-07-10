import { redirect } from "react-router-dom";
import { API_URL } from "../../../constants";
import { getAuthToken } from "../../../utils/auth";

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();
  const eventData = Object.fromEntries(formData.entries());

  const token = getAuthToken();

  let url = `${API_URL}/events`;

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = `${API_URL}/events/${eventId}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Failed to create new event." }),
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}
