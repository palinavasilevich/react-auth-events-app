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
  AuthenticationPage,
} from "../pages";

import { loader as eventDetailsLoader } from "../pages/EventDetails/loaders/eventDetailsLoader";
import { loader as eventsLoader } from "../pages/Events/loaders/eventsLoader";

import { action as eventAction } from "../components/EventForm/actions/eventAction";
import { action as newsletterAction } from "../pages/Newsletter/actions/newsletterAction";
import { action as deleteEventAction } from "../pages/EventDetails/actions/deleteEventAction";
import { authAction } from "../pages/Authentication/actions/authAction";
import { logoutAction } from "../components/Logout/logoutAction";
import { checkAuthLoader, tokenLoader } from "../utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
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
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: eventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "logout", action: logoutAction },
    ],
  },
]);

export default router;
