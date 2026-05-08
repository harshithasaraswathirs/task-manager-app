import React, { useState } from 'react';

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  };

  return (
    <div className="task-form-card">
      <form onSubmit={handleSubmit}>
        <div className="task-input-row">
          <input
            type="text"
            className="task-input"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-add">
            + Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
