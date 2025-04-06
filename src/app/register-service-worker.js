"use client";

import { useEffect } from "react";

const RegisterServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js")
        .then(registration => {
          console.log("Service Worker registrado com sucesso");
          
          // Adiciona listener para mensagens do Service Worker
          navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'SYNC_TASKS') {
              // Aqui você chama o Firebase
              syncWithFirebase(event.data.tasks);
            }
          });
          
          // Registra sync somente quando necessário
          if ("SyncManager" in window) {
            return registration.sync.register("sync-tasks")
              .then(() => console.log("Sync registrado"));
          }
        })
        .catch(error => {
          console.error("Erro no Service Worker:", error);
        });
    }
  }, []);

  async function syncWithFirebase(tasks) {
    const { getFirestore, doc, setDoc, collection } = await import("firebase/firestore");
    const firestore = getFirestore();
    
    for (const task of tasks) {
      try {
        const taskId = String(task.id)
        const userDocRef = doc(firestore, 'users', task.userId);
        const collectionTasksRef = collection(userDocRef, 'tasks');
        const taskDocRef = doc(collectionTasksRef, taskId);
        await setDoc(taskDocRef, task);
      } catch (error) {
        console.error("Erro ao sincronizar tarefa:", error);
      }
    }
  }

  return null;
};

export default RegisterServiceWorker;