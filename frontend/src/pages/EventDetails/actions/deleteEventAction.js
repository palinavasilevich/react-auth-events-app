import { redirect } from "react-router-dom";

import { getAuthToken } from "../../../utils/auth";
import { API_URL } from "../../../constants";

export async function action({ request, params }) {
  const token = getAuthToken();
  const response = await fetch(`${API_URL}/events/${params.eventId}`, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to delete event." }), {
      status: 500,
    });
  }

  return redirect("/events");
}
