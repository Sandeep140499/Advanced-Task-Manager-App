import React, { useState, useCallback } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskInput = () => {
  const [input, setInput] = useState('');
  const { dispatch } = useTasks();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    dispatch({ type: 'ADD', payload: { id: Date.now(), text: input, completed: false } });
    setInput('');
  }, [input, dispatch]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
        type="text"
        aria-label="Add a task"
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  );
};

export default React.memo(TaskInput);