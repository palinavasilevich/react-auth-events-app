import { Outlet } from "react-router-dom";
import { EventsNavigation } from "../../components";

function EventsLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsLayout;
