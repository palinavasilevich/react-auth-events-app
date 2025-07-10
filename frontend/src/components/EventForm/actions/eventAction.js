import { redirect } from "react-router-dom";

export async function action({ request, params }) {
  const method = request.method;
  const formData = await request.formData();

  // const eventData = {
  //   title: formData.get("title"),
  //   image: formData.get("image"),
  //   date: formData.get("date"),
  //   description: formData.get("description"),
  // };

  const eventData = Object.fromEntries(formData.entries());

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = `http://localhost:8080/events/${eventId}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
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
