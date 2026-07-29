import React, { useState, useEffect } from "react";
import {
  getProjects,
  getProjectTasks,
  createProject,
  createTask,
  getProjectById,
} from "../api";
import ProjectCard from "../components/ProjectCard";
import TaskCard from "../components/TaskCard";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [error, setError] = useState("");

  // Project form state
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({ name: "", description: "" });
  const [projectFormLoading, setProjectFormLoading] = useState(false);
  const [projectFormError, setProjectFormError] = useState("");

  // Task form state
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    assignee: "",
  });
  const [taskFormLoading, setTaskFormLoading] = useState(false);
  const [taskFormError, setTaskFormError] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await getProjects();
      const data = response.data?.data || response.data || [];
      const projectList = Array.isArray(data) ? data : data.projects || [];
      setProjects(projectList);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      setTasksLoading(true);
      const response = await getProjectTasks(projectId);
      const data = response.data?.data || response.data || [];
      const taskList = Array.isArray(data) ? data : data.tasks || [];
      setTasks(taskList);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setTasksLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      setTasks([]);
      setProjectMembers([]);
      return;
    }
    fetchTasks(selectedProject);
    // Fetch project details for members + owner
    const fetchMembers = async () => {
      try {
        const response = await getProjectById(selectedProject);
        const project = response.data?.data || response.data;
        const members = project?.members || [];
        const owner = project?.owner;

        // Combine owner + members, deduplicate by ID
        const allPeople = [];
        const seenIds = new Set();

        if (owner) {
          const ownerId =
            typeof owner === "object" ? owner._id || owner.id : owner;
          seenIds.add(String(ownerId));
          allPeople.push(
            typeof owner === "object"
              ? { ...owner, _roleLabel: "Owner" }
              : { _id: owner, _roleLabel: "Owner" },
          );
        }

        members.forEach((m) => {
          const mId = typeof m === "object" ? m._id || m.id : m;
          if (!seenIds.has(String(mId))) {
            seenIds.add(String(mId));
            allPeople.push(m);
          }
        });

        setProjectMembers(allPeople);
      } catch (err) {
        setProjectMembers([]);
      }
    };
    fetchMembers();
  }, [selectedProject]);

  const handleProjectClick = (projectId) => {
    const id =
      typeof projectId === "object" && projectId !== null
        ? projectId._id || projectId.id
        : projectId;

    if (selectedProject === id) {
      setSelectedProject(null);
      setTasks([]);
    } else {
      setSelectedProject(id);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!projectForm.name.trim()) {
      setProjectFormError("Project name is required");
      return;
    }
    setProjectFormError("");
    setProjectFormLoading(true);
    try {
      await createProject(projectForm);
      setProjectForm({ name: "", description: "" });
      setShowProjectForm(false);
      await fetchProjects();
    } catch (err) {
      setProjectFormError(
        err.response?.data?.message || "Failed to create project",
      );
    } finally {
      setProjectFormLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) {
      setTaskFormError("Task title is required");
      return;
    }
    if (!taskForm.dueDate) {
      setTaskFormError("Due date is required");
      return;
    }
    if (!taskForm.assignee) {
      setTaskFormError("Assignee is required");
      return;
    }
    setTaskFormError("");
    setTaskFormLoading(true);
    try {
      // Build payload, stripping empty optional fields
      const payload = {
        title: taskForm.title.trim(),
        dueDate: taskForm.dueDate,
        assignee: taskForm.assignee,
      };
      if (taskForm.description.trim())
        payload.description = taskForm.description.trim();
      if (taskForm.priority) payload.priority = taskForm.priority;

      await createTask(selectedProject, payload);
      setTaskForm({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        assignee: "",
      });
      setShowTaskForm(false);
      await fetchTasks(selectedProject);
    } catch (err) {
      setTaskFormError(err.response?.data?.message || "Failed to create task");
    } finally {
      setTaskFormLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>My Projects</h1>
        <button
          className="btn btn-primary"
          onClick={() => setShowProjectForm(!showProjectForm)}
        >
          {showProjectForm ? "Cancel" : "+ New Project"}
        </button>
      </div>

      {showProjectForm && (
        <div className="inline-form">
          <form onSubmit={handleCreateProject}>
            {projectFormError && (
              <div className="alert alert-error">{projectFormError}</div>
            )}
            <div className="inline-form-row">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter project name"
                  value={projectForm.name}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter description"
                  value={projectForm.description}
                  onChange={(e) =>
                    setProjectForm({
                      ...projectForm,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={projectFormLoading}
              >
                {projectFormLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <>
          {error && <div className="alert alert-error">{error}</div>}
          {projects.length === 0 && !showProjectForm ? (
            <p className="empty-state">
              No projects yet. Click "+ New Project" to create one.
            </p>
          ) : (
            <div className="projects-grid">
              {projects.map((p) => (
                <ProjectCard
                  key={p._id || p.id}
                  project={p}
                  isSelected={selectedProject === (p._id || p.id)}
                  onClick={handleProjectClick}
                />
              ))}
            </div>
          )}
          {selectedProject && (
            <div className="tasks-section">
              <div className="tasks-header">
                <h2>Tasks</h2>
                <button
                  className="btn btn-primary"
                  onClick={() => setShowTaskForm(!showTaskForm)}
                >
                  {showTaskForm ? "Cancel" : "+ New Task"}
                </button>
              </div>

              {showTaskForm && (
                <div className="inline-form">
                  <form onSubmit={handleCreateTask}>
                    {taskFormError && (
                      <div className="alert alert-error">{taskFormError}</div>
                    )}
                    <div className="inline-form-row">
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Task title"
                          value={taskForm.title}
                          onChange={(e) =>
                            setTaskForm({ ...taskForm, title: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Description (optional)</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="Description"
                          value={taskForm.description}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Priority</label>
                        <select
                          className="form-input"
                          value={taskForm.priority}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              priority: e.target.value,
                            })
                          }
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Due Date</label>
                        <input
                          type="date"
                          className="form-input"
                          value={taskForm.dueDate}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              dueDate: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label>Assignee</label>
                        <select
                          className="form-input"
                          value={taskForm.assignee}
                          onChange={(e) =>
                            setTaskForm({
                              ...taskForm,
                              assignee: e.target.value,
                            })
                          }
                        >
                          <option value="">Select assignee</option>
                          {projectMembers.map((m) => {
                            const id =
                              typeof m === "object" ? m._id || m.id : m;
                            const name =
                              typeof m === "object"
                                ? m.userName || m.email || id
                                : id;
                            const label = m._roleLabel
                              ? `${name} (${m._roleLabel})`
                              : name;
                            return (
                              <option key={id} value={id}>
                                {label}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={taskFormLoading}
                      >
                        {taskFormLoading ? "Creating..." : "Create"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {tasksLoading ? (
                <p>Loading tasks...</p>
              ) : tasks.length === 0 && !showTaskForm ? (
                <p className="empty-state">
                  No tasks in this project. Click "+ New Task" to add one.
                </p>
              ) : (
                <div className="tasks-grid">
                  {tasks.map((t) => (
                    <TaskCard key={t._id || t.id} task={t} />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
