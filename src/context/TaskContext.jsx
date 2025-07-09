import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'TOGGLE':
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    case 'DELETE':
      return state.filter(task => task.id !== action.payload);
    case 'REORDER':
      return action.payload;
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [state, dispatch] = useReducer(taskReducer, tasks);

  useEffect(() => {
    setTasks(state);
  }, [state, setTasks]);

  return (
    <TaskContext.Provider value={{ tasks: state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
