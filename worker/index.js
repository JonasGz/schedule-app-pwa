import { precacheAndRoute } from 'workbox-precaching';

// Precaching
precacheAndRoute(self.__WB_MANIFEST);

// Background Sync Handler
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-tasks') {
    event.waitUntil(
      (async () => {
        // Envia mensagem para a página principal
        const clients = await self.clients.matchAll();
        return Promise.all(clients.map(client => {
          return client.postMessage({
            type: 'SYNC_TASKS_REQUEST',
            timestamp: Date.now()
          });
        }));
      })()
    );
  }
});

// Mensagem para quando offline
self.addEventListener('message', (event) => {
  if (event.data?.type === 'OFFLINE_TASK_SAVED') {
    // Pode adicionar lógica adicional aqui se necessário
  }
});