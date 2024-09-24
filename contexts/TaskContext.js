"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { addTask, getTasks } from "../public/utils/indexedDb";
import {
  addTaskToFirestore,
  getTasksFromFirestore,
} from "../public/utils/firebase";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [att, setAtt] = useState(0);

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
      return diffA - diffB; // Ordenar pela menor diferença
    });
  }

  async function syncTasks(tasksFromDB, tasksFromFirestore) {
    // const tasksMap = new Map();
    //   tasksFromDB.forEach((task) => tasksMap.set(task.id, task));
    //   tasksFromFirestore.forEach((task) => tasksMap.set(task.id, task));
    //   const mergedTasks = Array.from(tasksMap.values());
    //   await Promise.all(
    //     mergedTasks.map(async (task) => {
    //       try {
    //         await addTask(task);
    //       } catch (error) {
    //         console.error(
    //           "Erro ao adicionar tarefa durante a sincronização:",
    //           error
    //         );
    //       }
    //     })
    //   );
    //   setTasks(mergedTasks);
  }

  const loadTasks = async () => {
    try {
      const tasksFromDB = await getTasks();
      // const tasksFromFirestore = await getTasksFromFirestore();

      filterTasks(tasksFromDB);

      setTasks(tasksFromDB);

      // if (navigator.onLine) {
      //   syncTasks(tasksFromDB, tasksFromFirestore)
      // } else {
      //   setTasks(tasksFromDB);
      // }
    } catch (error) {
      console.error("Erro ao carregar e mesclar tarefas:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [att]);

  return (
    <TaskContext.Provider value={{ tasks, setAtt }}>
      {children}
    </TaskContext.Provider>
  );
};
