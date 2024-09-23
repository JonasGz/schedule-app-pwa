"use client";
import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [att, setAtt] = useState([]);

  const loadTasks = async () => {
    try {
      const tasksFromDB = await getTasks();

      if (navigator.onLine) {
        const tasksFromFirestore = await getTasksFromFirestore();

        const tasksMap = new Map();
        tasksFromDB.forEach((task) => tasksMap.set(task.id, task));
        tasksFromFirestore.forEach((task) => tasksMap.set(task.id, task));

        const mergedTasks = Array.from(tasksMap.values());

        await Promise.all(
          mergedTasks.map(async (task) => {
            try {
              await addTask(task);
            } catch (error) {
              console.error(
                "Erro ao adicionar tarefa durante a sincronização:",
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
      console.error("Erro ao carregar e mesclar tarefas:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [att]);

  return (
    <TaskContext.Provider value={{ loadTasks, tasks, att, setAtt }}>
      {children}
    </TaskContext.Provider>
  );
};
