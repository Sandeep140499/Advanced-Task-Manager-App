import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <div className="app">
          <h1>Task Manager</h1>
          <ThemeToggle />
          <TaskInput />
          <TaskList />
        </div>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;
