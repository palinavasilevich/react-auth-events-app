import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";

import { EventItem, EventsList, Loader } from "../../components";

function EventDetailsPage() {
  const { event, events } = useRouteLoaderData("event-details");

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailsPage;
