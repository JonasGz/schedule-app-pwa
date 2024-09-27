"use client";

import { useEffect } from "react";

const RegisterServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service worker registered: ", registration);
        })
        .catch((error) => console.log("Error:", error));

      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register("sync-tasks");
      });
    }
  }, []);

  return null;
};

export default RegisterServiceWorker;
