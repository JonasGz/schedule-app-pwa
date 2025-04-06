"use client";
import { useEffect } from "react";

const RegisterServiceWorker = () => {
  useEffect(() => {
    const register = async () => {
      if (!('serviceWorker' in navigator)) return;

      try {
        // 1. Registra o Service Worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('SW registrado:', registration);

        // 2. Aguarda o SW estar completamente ativo
        await new Promise((resolve, reject) => {
          if (registration.active) {
            return resolve();
          }
          
          const timer = setTimeout(() => {
            reject(new Error('Timeout ativando Service Worker'));
          }, 10000);

          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                clearTimeout(timer);
                resolve();
              }
            });
          });
        });

        console.log('SW ativo e pronto');

        // 3. Só então registra o sync
        if ('SyncManager' in window) {
          try {
            await registration.sync.register('sync-tasks');
            console.log('Background Sync registrado com sucesso');
          } catch (syncError) {
            console.warn('Erro ao registrar sync:', syncError);
          }
        }

        // 4. Configura o listener para mensagens
        navigator.serviceWorker.addEventListener('message', handleSWMessage);

      } catch (error) {
        console.error('Falha no registro do SW:', error);
      }
    };

    const handleSWMessage = (event) => {
      if (event.data?.type === 'TRIGGER_SYNC') {
        handleSync();
      }
    };

    const handleSync = async () => {
      try {
        const tasks = await getTasksFromIndexedDB();
        await syncWithFirebase(tasks);
        console.log('Sincronização concluída');
      } catch (error) {
        console.error('Erro na sincronização:', error);
      }
    };

    const getTasksFromIndexedDB = () => {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open('my-tasks-db');
        request.onsuccess = (e) => {
          const db = e.target.result;
          const tx = db.transaction('tasks', 'readonly');
          const store = tx.objectStore('tasks');
          store.getAll().onsuccess = (e) => resolve(e.target.result);
        };
        request.onerror = () => reject('Erro ao abrir IndexedDB');
      });
    };

    const syncWithFirebase = async (tasks) => {
      const { getFirestore, doc, setDoc, collection } = await import('firebase/firestore');
      const db = getFirestore();
      
      await Promise.all(tasks.map(async (task) => {
        const userRef = doc(db, 'users', task.userId);
        const tasksRef = collection(userRef, 'tasks');
        await setDoc(doc(tasksRef, task.id), task);
      }));
    };

    register();

    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleSWMessage);
    };
  }, []);

  return null;
};

export default RegisterServiceWorker;