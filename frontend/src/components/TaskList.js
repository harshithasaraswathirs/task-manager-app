import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onToggle }) {
  
  if (tasks.length === 0) {
    return <p className="text-muted text-center">No tasks yet! Add one above.</p>;
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TaskList;