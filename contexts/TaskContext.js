"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { addTask, getTasks } from "../public/utils/indexedDb";
import {
  auth,
  getTasksFromFirestore,
  addTaskToFirestore,
} from "../public/utils/firebase";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [att, setAtt] = useState(0);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  async function syncTasks(tasksFromDB, tasksFromFirestore) {
    try {
      if (tasksFromFirestore) {
        const tasksMap = new Map();
        tasksFromDB.forEach((task) => tasksMap.set(task.id, task));
        tasksFromFirestore.forEach((task) => tasksMap.set(task.id, task));
        const mergedTasks = Array.from(tasksMap.values());
        await Promise.all(
          mergedTasks.map(async (task) => {
            try {
              await addTask(task);
              await addTaskToFirestore(task);
            } catch (error) {
              console.error(
                "Erro ao adicionar tarefa durante a sincronização: ",
                error
              );
            }
          })
        );
        setTasks(mergedTasks);
      } else {
        setTasks(tasksFromDB);
      }
    } catch (error) {
      console.error("Erro ao consultar Firestore ou IndexedDB", error);
    }
  }

  const loadTasks = async () => {
    try {
      const tasksFromDB = await getTasks();

      if (navigator.onLine) {
        try {
          const tasksFromFirestore = await getTasksFromFirestore();
          if (tasksFromFirestore) {
            syncTasks(tasksFromDB, tasksFromFirestore);
          } else {
            syncTasks(tasksFromDB);
          }
        } catch (error) {
          console.log("Erro ao recuperar as tasks do Firestore", error);
        }
      } else {
        setTasks(tasksFromDB);
      }
    } catch (error) {
      console.error("Erro ao carregar e mesclar tarefas:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadTasks();
    }
  }, [att, currentUser]);

  return (
    <TaskContext.Provider value={{ tasks, setAtt }}>
      {children}
    </TaskContext.Provider>
  );
};
