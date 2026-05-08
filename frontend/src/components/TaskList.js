import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎯</div>
        <p className="empty-title">No tasks yet</p>
        <p>Add your first task above and get things done!</p>
      </div>
    );
  }

  const pending   = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t =>  t.completed);

  return (
    <div>
      {pending.length > 0 && (
        <>
          <div className="section-header">
            <span className="section-title">Pending · {pending.length}</span>
          </div>
          {pending.map(task => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
          ))}
        </>
      )}

      {completed.length > 0 && (
        <>
          <div className="section-header" style={{ marginTop: 20 }}>
            <span className="section-title">Completed · {completed.length}</span>
          </div>
          {completed.map(task => (
            <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} />
          ))}
        </>
      )}
    </div>
  );
}

export default TaskList;
