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

  function filterTasks(tasksFromDB) {
    const timeToMilliseconds = (taskTime) => {
      const [hours, minutes] = taskTime.split(":").map(Number);
      return hours * 60 * 60 * 1000 + minutes * 60 * 1000; // Converter horas e minutos para ms
    };

    const now = new Date();
    const nowInMilliseconds =
      now.getHours() * 60 * 60 * 1000 + now.getMinutes() * 60 * 1000;

    tasksFromDB.sort((a, b) => {
      const diffA = Math.abs(
        timeToMilliseconds(a.taskTime) - nowInMilliseconds
      );
      const diffB = Math.abs(
        timeToMilliseconds(b.taskTime) - nowInMilliseconds
      );
      return diffA - diffB;
    });
  }

  async function syncTasks(tasksFromDB, tasksFromFirestore) {
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
            "Erro ao adicionar tarefa durante a sincronização:",
            error
          );
        }
      })
    );
    filterTasks(mergedTasks);
    setTasks(mergedTasks);
  }

  const loadTasks = async () => {
    try {
      const tasksFromDB = await getTasks();

      if (navigator.onLine) {
        const tasksFromFirestore = await getTasksFromFirestore();
        syncTasks(tasksFromDB, tasksFromFirestore);
      } else {
        filterTasks(tasksFromDB);
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
