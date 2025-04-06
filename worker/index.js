import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// ⚠️ ESSA LINHA É ESSENCIAL!
precacheAndRoute(self.__WB_MANIFEST);

// Exemplo de rota cacheada
registerRoute(
  ({ request }) => request.destination === 'document',
  new StaleWhileRevalidate()
);

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-tasks") {
    event.waitUntil(
      getTasksFromIndexedDB().then(tasks => {
        // Envia mensagem para a página principal para lidar com o Firebase
        return self.clients.matchAll().then(clients => {
          return Promise.all(clients.map(client => {
            return client.postMessage({
              type: 'SYNC_TASKS',
              tasks: tasks
            });
          }));
        });
      })
    );
  }
});

// Funções auxiliares
function getTasksFromIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("my-tasks-db", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const tx = db.transaction(["tasks"], "readonly");
      const store = tx.objectStore("tasks");
      const getAll = store.getAll();
      getAll.onsuccess = () => resolve(getAll.result);
      getAll.onerror = () => reject("Erro ao obter tasks");
    };

    request.onerror = () => reject("Erro ao abrir IndexedDB");
  });
}

async function addTaskToFirestore(task) {
  const firebase = await import("firebase/firestore");
  const firestore = firebase.getFirestore();
  const docRef = firebase.doc(firestore, "tasks", String(task.id));
  await firebase.setDoc(docRef, task);
}