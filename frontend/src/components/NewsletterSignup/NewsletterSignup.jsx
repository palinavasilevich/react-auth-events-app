import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

import classes from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const formRef = useRef();
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }

    if (state === "idle" && data && data.ok) {
      formRef.current?.reset();
    }
  }, [data, state]);

  return (
    <fetcher.Form
      ref={formRef}
      method="post"
      action="/newsletter"
      className={classes.newsletter}
    >
      <div className={classes.container}>
        <input
          type="email"
          name="email"
          placeholder="Sign up for newsletter..."
          aria-label="Sign up for newsletter"
        />

        <button>Sign up</button>
      </div>
      {data?.error && <p className={classes.errorText}>{data.error}</p>}
    </fetcher.Form>
  );
}

export default NewsletterSignup;
