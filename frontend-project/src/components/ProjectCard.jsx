import React from 'react';

const ProjectCard = ({ project, isSelected, onClick }) => {
  if (!project) return null;

  return (
    <div
      className={`project-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick && onClick(project._id)}
    >
      <h3 className="project-card-title">{project.name}</h3>
      <p className="project-card-desc">{project.description || 'No description'}</p>
      <div className="project-card-meta">
        <span>{project.members?.length || 0} members</span>
      </div>
    </div>
  );
};

export default ProjectCard;
