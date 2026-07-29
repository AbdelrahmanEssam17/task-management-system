import React from 'react';

const TaskCard = ({ task }) => {
  if (!task) return null;

  const priorityClass = task.priority ? `badge-${task.priority.toLowerCase()}` : '';
  const statusClass = task.status ? `badge-${task.status.toLowerCase().replace(/ /g, '-')}` : '';

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h4 className="task-card-title">{task.title}</h4>
        <span className={`badge ${priorityClass}`}>{task.priority}</span>
      </div>
      <p className="task-card-desc">{task.description || 'No description'}</p>
      <div className="task-card-footer">
        <span className={`badge badge-status ${statusClass}`}>{task.status}</span>
        {task.dueDate && (
          <span className="task-card-date">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        {task.assignee && (
          <span className="task-card-assignee">
            {task.assignee.userName || 'Unassigned'}
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
