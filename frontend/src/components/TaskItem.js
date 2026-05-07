import React from 'react';

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className={`card mb-2 ${task.completed ? 'border-success' : 'border-warning'}`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </span>

        <div>
          <button
            className="btn btn-sm btn-success me-2"
            onClick={() => onToggle(task.id)}
          >
            {task.completed ? 'Undo' : 'Done'}
          </button>

          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}

export default TaskItem;