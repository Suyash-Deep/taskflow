import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

function ProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Load project tasks
  const loadTasks = async () => {
    try {
      const res = await api.get(`/tasks/${projectId}`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Load project info
  const loadProject = async () => {
    try {
      const res = await api.get("/projects");
      const found = res.data.find((p) => p._id === projectId);
      setProject(found);
    } catch (err) {
      console.error("Error fetching project:", err);
    }
  };

  useEffect(() => {
    loadProject();
    loadTasks();
  }, []);

  // Create new task
  const createTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", {
        title,
        description,
        projectId,
      });

      setTitle("");
      setDescription("");
      loadTasks(); // refresh tasks
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
        await api.patch(`/tasks/${taskId}`, { status: newStatus });
        loadTasks(); // refresh UI
    } catch (err) {
        console.error("Error updating status:", err);
    }
  };


  return (
    <div style={{ padding: 20 }}>
      {project ? (
        <h2>{project.name}</h2>
      ) : (
        <h2>Loading project...</h2>
      )}

      <p>{project?.description}</p>

      {/* Create Task Form */}
      <div style={{ marginTop: 20 }}>
        <h3>Create Task</h3>
        <form onSubmit={createTask}>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
            required
          />
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%", padding: 8, marginBottom: 10 }}
          />
          <button>Add Task</button>
        </form>
      </div>

      {/* Task List */}
      <div style={{ marginTop: 30 }}>
        <h3>Tasks</h3>

        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          <ul>
            {tasks.map((t) => (
                <li
                    key={t._id}
                    style={{
                        border: "1px solid #bbb",
                        padding: 10,
                        marginBottom: 10,
                        borderRadius: 6,
                    }}
                    >
                    <strong>{t.title}</strong>
                    <br />
                    <small>{t.description}</small>
                    <br /><br />

                    {/* Status Dropdown */}
                    <label>Status: </label>
                    <select
                        value={t.status}
                        onChange={(e) => updateStatus(t._id, e.target.value)}
                    >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
