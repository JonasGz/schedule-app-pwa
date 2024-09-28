"use client";

import { useEffect } from "react";

const RegisterServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          return navigator.serviceWorker.ready;
        })
        .then((registration) => {
          return registration.sync.register("sync-tasks");
        })
        .then(() => {
          console.log("sync event registered!");
        })
        .catch((error) => console.log("Error:", error));
    }
  }, []);

  return null;
};

export default RegisterServiceWorker;
