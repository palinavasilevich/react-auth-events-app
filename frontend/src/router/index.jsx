import { createBrowserRouter } from "react-router-dom";

import {
  RootLayout,
  ErrorPage,
  HomePage,
  EventsPage,
  EventDetailsPage,
  NewEventPage,
  EditEventPage,
  EventsLayout,
  NewsletterPage,
} from "../pages";

import { loader as eventDetailsLoader } from "../pages/EventDetails/loaders/eventDetailsLoader";
import { loader as eventsLoader } from "../pages/Events/loaders/eventsLoader";

import { action as eventAction } from "../components/EventForm/actions/eventAction";
import { action as newsletterAction } from "../pages/Newsletter/actions/newsletterAction";
import { action as deleteEventAction } from "../pages/EventDetails/actions/deleteEventAction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-details",
            loader: eventDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetailsPage />,
                action: deleteEventAction,
              },
              { path: "edit", element: <EditEventPage />, action: eventAction },
            ],
          },

          { path: "new", element: <NewEventPage />, action: eventAction },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

export default router;
