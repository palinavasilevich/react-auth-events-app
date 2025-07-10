import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { EventsList, Loader } from "../../components";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;
