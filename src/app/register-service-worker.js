"use client";

import { useEffect } from "react";

const RegisterServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
          return navigator.serviceWorker.ready;
        })
        .then((registration) => {
          return registration.sync.register("sync-tasks");
        })
        .then(() => {
          console.log("✔️ sync-tasks registrado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao registrar sync-tasks:", error);
        });
    }
  }, []);

  return null;
};

export default RegisterServiceWorker;