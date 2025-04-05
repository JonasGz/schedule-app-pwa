"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { addTask, getTasks } from "../public/utils/indexedDb";
import {
  getTasksFromFirestore,
  addTaskToFirestore,
} from "../public/utils/firebase";
import { useAuth } from "./AuthContext";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [att, setAtt] = useState(0);
  const {user} = useAuth();

  async function syncTasks(tasksFromDB, tasksFromFirestore) {
    try {
      if (tasksFromFirestore) {
        const tasksMap = new Map();

        tasksFromDB.forEach((task) => {
          tasksMap.set(task.id, task);
        });

        tasksFromFirestore.forEach((taskFS) => {
          const taskLocal = tasksMap.get(taskFS.id);
          if (
            !taskLocal ||
            new Date(taskFS.updateAt) > new Date(taskLocal.updateAt)
          ) {
            tasksMap.set(taskFS.id, taskFS);
          }
        });
        const mergedTasks = Array.from(tasksMap.values());
        await Promise.all(
          mergedTasks.map(async (task) => {
            try {
              await addTask(task);
              await addTaskToFirestore(task);
            } catch (error) {
              console.error(
                "Erro ao adicionar tarefa na sincronização: ",
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

  useEffect(() => {
    if (user) {
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

      loadTasks()
    }
  }, [att, user]);

  return (
    <TaskContext.Provider value={{ tasks, setAtt }}>
      {children}
    </TaskContext.Provider>
  );
};
