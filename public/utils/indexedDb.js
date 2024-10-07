import { auth } from "./firebase";

export const openIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("my-tasks-db", 2);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("tasks")) {
        const store = db.createObjectStore("tasks", { keyPath: "id" });
        store.createIndex("userId", "userId", { unique: false });
      } else {
        const store = event.target.transaction.objectStore("tasks");
        if (!store.indexNames.contains("userId")) {
          store.createIndex("userId", "userId", { unique: false });
        }
      }
    };

    request.onerror = (event) => {
      reject(`Erro ao abrir o IndexedDB: ${event.target.errorCode}`);
    };
  });
};

export const addTask = async (task) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }
    const userId = user.uid;
    const db = await openIndexedDB();
    const transaction = db.transaction(["tasks"], "readwrite");
    const store = transaction.objectStore("tasks");

    if (!task.id) {
      task.id = Date.now();
    }

    return new Promise((resolve, reject) => {
      const taskWithUserId = { ...task, userId: userId };
      const request = store.put(taskWithUserId);

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
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Usuário não autenticado.");
    }
    const userid = user.uid;
    const db = await openIndexedDB();
    const transaction = db.transaction(["tasks"], "readonly");
    const store = transaction.objectStore("tasks");
    const index = store.index("userId");

    return new Promise((resolve, reject) => {
      const useTasksRequest = index.getAll(userid);

      useTasksRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };

      useTasksRequest.onerror = (event) => {
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

export const concludedTaskIndexedDB = async (key) => {
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
            resolve();
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
            resolve();
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
    return new Promise((resolve, reject) => {
      const request = db
        .transaction(["tasks"], "readwrite")
        .objectStore("tasks")
        .delete(key);

      request.onsuccess = () => {
        console.log("Task deletada com sucesso.");
        resolve();
      };

      request.onerror = (event) => {
        console.error("Erro ao deletar a task:", event.target.errorCode);
        reject(`Erro ao deletar a task: ${event.target.errorCode}`);
      };
    });
  } catch (error) {
    console.error("Erro ao abrir IndexedDB:", error);
  }
};
