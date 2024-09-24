export const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("my-tasks-db", 1);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("tasks")) {
        db.createObjectStore("tasks", { keyPath: "id" });
      }
    };

    request.onerror = (event) => {
      reject(`Erro ao abrir o IndexedDB: ${event.target.errorCode}`);
    };
  });
};

export const addTask = async (task) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");

    if (!task.id) {
      task.id = Date.now();
    }

    return new Promise((resolve, reject) => {
      const request = store.put(task);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        console.error(
          `Erro ao adicionar tarefa ao IndexedDB: ${event.target.errorCode}`
        );
        reject(`Erro ao adicionar tarefa: ${event.target.errorCode}`);
      };
    });
  } catch (error) {
    console.error("Erro no IndexedDB:", error);
    throw new Error(`Erro ao adicionar tarefa no IndexedDB: ${error}`);
  }
};

export const getTasks = async () => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(["tasks"], "readonly");
    const store = transaction.objectStore("tasks");

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = (event) => {
        resolve(event.target.result);
      };

      request.onerror = (event) => {
        reject(
          `Erro ao buscar tarefas do IndexedDB: ${event.target.errorCode}`
        );
      };
    });
  } catch (error) {
    console.error("Erro ao obter tarefas do IndexedDB:", error);
    throw new Error(`Erro ao obter tarefas do IndexedDB: ${error}`);
  }
};

export const concludedTask = async (key) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");

    return new Promise((resolve, reject) => {
      const request = store.get(key);

      request.onsuccess = (event) => {
        const obj = event.target.result;
        if (obj) {
          const newObj = { ...obj, completed: true };
          const updateRequest = store.put(newObj);

          updateRequest.onsuccess = () => {
            resolve(newObj);
          };

          updateRequest.onerror = (event) => {
            reject(
              `Erro ao atualizar a tarefa no IndexedDB: ${event.target.errorCode}`
            );
          };
        } else {
          reject(`Tarefa não encontrada no IndexedDB para a chave: ${key}`);
        }
      };

      request.onerror = (event) => {
        reject(
          `Erro ao buscar tarefas do IndexedDB: ${event.target.errorCode}`
        );
      };
    });
  } catch (error) {
    console.error("Erro ao obter tarefas do IndexedDB:", error);
    throw new Error(`Erro ao obter tarefas do IndexedDB: ${error}`);
  }
};

export const notConcludedTask = async (key) => {
  try {
    const db = await openIndexedDB();
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");

    return new Promise((resolve, reject) => {
      const request = store.get(key);

      request.onsuccess = (event) => {
        const obj = event.target.result;
        if (obj) {
          const newObj = { ...obj, completed: false };
          const updateRequest = store.put(newObj);

          updateRequest.onsuccess = () => {
            resolve(newObj);
          };

          updateRequest.onerror = (event) => {
            reject(
              `Erro ao atualizar a tarefa no IndexedDB: ${event.target.errorCode}`
            );
          };
        } else {
          reject(`Tarefa não encontrada no IndexedDB para a chave: ${key}`);
        }
      };

      request.onerror = (event) => {
        reject(
          `Erro ao buscar tarefas do IndexedDB: ${event.target.errorCode}`
        );
      };
    });
  } catch (error) {
    console.error("Erro ao obter tarefas do IndexedDB:", error);
    throw new Error(`Erro ao obter tarefas do IndexedDB: ${error}`);
  }
};

export const removeTask = async (key) => {
  try {
    const db = await openIndexedDB();
    const request = db
      .transaction(["tasks"], "readwrite")
      .objectStore("tasks")
      .delete(key);

    request.onsuccess = () => {
      console.log("Task deletada com sucesso.");
    };

    request.onerror = (err) => {
      console.error("Erro ao deletar a task:", err);
    };
  } catch (error) {
    console.error("Erro ao abrir IndexedDB:", error);
  }
};
