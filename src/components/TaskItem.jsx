import React, { useCallback } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { dispatch } = useTasks();

  const toggleTask = useCallback(() => {
    dispatch({ type: 'TOGGLE', payload: task.id });
  }, [dispatch, task.id]);

  const deleteTask = useCallback(() => {
    dispatch({ type: 'DELETE', payload: task.id });
  }, [dispatch, task.id]);

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleTask}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={deleteTask}>🗑️</button>
    </div>
  );
};

export default React.memo(TaskItem);
