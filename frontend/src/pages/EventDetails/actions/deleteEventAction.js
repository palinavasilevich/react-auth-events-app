import { redirect } from "react-router-dom";

export async function action({ request, params }) {
  const response = await fetch(
    `http://localhost:8080/events/${params.eventId}`,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to delete event." }), {
      status: 500,
    });
  }

  return redirect("/events");
}
