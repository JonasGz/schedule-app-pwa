"use client";

import { useEffect } from "react";

const RegisterServiceWorker = () => {
  useEffect(() => {
    const registerSWAndSync = async () => {
      if (!("serviceWorker" in navigator)) return;

      try {
        // 1. Registra o Service Worker
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("Service Worker registrado com sucesso");

        // 2. Configura o listener para mensagens ANTES de registrar o sync
        navigator.serviceWorker.addEventListener('message', handleSWMessage);

        // 3. Registra o Background Sync se suportado
        if ("SyncManager" in window) {
          try {
            await registration.sync.register("sync-tasks");
            console.log("Background Sync registrado");
          } catch (syncError) {
            console.warn("Erro ao registrar sync:", syncError);
          }
        }
      } catch (swError) {
        console.error("Falha no registro do Service Worker:", swError);
      }
    };

    const handleSWMessage = async (event) => {
      if (event.data?.type === 'SYNC_TASKS_REQUEST') {
        try {
          // 1. Busca tarefas do IndexedDB
          const tasks = await getTasksFromIndexedDB();
          
          // 2. Sincroniza com Firebase
          await syncWithFirebase(tasks);
          
          // 3. Opcional: Notifica sucesso
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: 'SYNC_COMPLETE',
              success: true
            });
          }
        } catch (error) {
          console.error("Erro na sincronização:", error);
        }
      }
    };

    const getTasksFromIndexedDB = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open("my-tasks-db");
        
        request.onsuccess = (event) => {
          const db = event.target.result;
          const tx = db.transaction("tasks", "readonly");
          const store = tx.objectStore("tasks");
          const request = store.getAll();
          
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject("Erro ao buscar tasks");
        };
        
        request.onerror = () => reject("Erro ao abrir IndexedDB");
      });
    };

    const syncWithFirebase = async (tasks) => {
      const { getFirestore, doc, setDoc, collection } = await import("firebase/firestore");
      const db = getFirestore();
      
      for (const task of tasks) {
        try {
          const userRef = doc(db, 'users', task.userId);
          const tasksRef = collection(userRef, 'tasks');
          const taskRef = doc(tasksRef, String(task.id));
          await setDoc(taskRef, task);
          console.log("Task sincronizada:", task.id);
        } catch (error) {
          console.error("Erro ao sincronizar task:", task.id, error);
          throw error; // Propaga o erro para tentativa posterior
        }
      }
    };

    registerSWAndSync();

    // Cleanup
    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
    };
  }, []);

  return null;
};

export default RegisterServiceWorker;