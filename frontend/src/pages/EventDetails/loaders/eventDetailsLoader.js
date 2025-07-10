async function loadEvent(eventId) {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: `Could not fetch details for selected event.`,
      }),
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ params }) {
  const eventId = params.eventId;

  return {
    event: await loadEvent(eventId),
    events: loadEvents(),
  };
}
