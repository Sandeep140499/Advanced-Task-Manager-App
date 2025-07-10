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
    <div className={`task-item${task.completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleTask}
        aria-label={task.completed ? 'Mark as pending' : 'Mark as completed'}
      />
      <span className="task-text">{task.text}</span>
      <button className="delete-btn" onClick={deleteTask} aria-label="Delete task">🗑️</button>
    </div>
  );
};

export default React.memo(TaskItem);
