import React from 'react';

function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/* Checkbox */}
      <div
        className="task-check"
        onClick={() => onToggle(task.id)}
        role="checkbox"
        aria-checked={task.completed}
        tabIndex={0}
        onKeyDown={e => e.key === ' ' && onToggle(task.id)}
      >
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1" stroke="#001a14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Priority dot */}
      <div className="task-dot" />

      {/* Title */}
      <span className="task-title">{task.title}</span>

      {/* Actions */}
      <div className="task-actions">
        <button
          className="btn-task btn-toggle"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? '↩ Undo' : '✓ Done'}
        </button>
        <button
          className="btn-task btn-delete"
          onClick={() => onDelete(task.id)}
        >
          🗑
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
