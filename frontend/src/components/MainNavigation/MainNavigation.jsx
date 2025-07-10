import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>

        <div className={classes.auth}>
          {!token && (
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          )}

          {token && (
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          )}
        </div>
      </nav>
    </header>
  );
}

export default MainNavigation;
