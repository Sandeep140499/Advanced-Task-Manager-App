import React, { useState, useMemo, useCallback } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskList = () => {
  const { tasks, dispatch } = useTasks();
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      const reordered = Array.from(tasks);
      const [removed] = reordered.splice(result.source.index, 1);
      reordered.splice(result.destination.index, 0, removed);
      dispatch({ type: 'REORDER', payload: reordered });
    },
    [tasks, dispatch]
  );

  return (
    <div>
      <div className="filter-btns">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="task-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {filteredTasks.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                filteredTasks.map((task, idx) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`task-draggable${snapshot.isDragging ? ' dragging' : ''}`}
                      >
                        <TaskItem task={task} />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default React.memo(TaskList);
