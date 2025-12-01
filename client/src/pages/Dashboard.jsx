import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch projects
  const loadProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Create project
  const createProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        name,
        description,
      });

      setName("");
      setDescription("");
      loadProjects(); // refresh list
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h2>TaskFlow - Dashboard</h2>

      {/* Create Project Form */}
      <div style={{ marginTop: 20 }}>
        <h3>Create Project</h3>
        <form onSubmit={createProject}>
          <div>
            <input
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </div>
          <button>Create Project</button>
        </form>
      </div>

      {/* Project List */}
      <div style={{ marginTop: 30 }}>
        <h3>Your Projects</h3>

        {projects.length === 0 ? (
          <p>No projects yet.</p>
        ) : (
          <ul>
            {projects.map((p) => (
                <li
                    key={p._id}
                    style={{
                    padding: 10,
                    border: "1px solid #ddd",
                    marginBottom: 10,
                    borderRadius: 6,
                    }}
                >
                    <strong>{p.name}</strong>
                    <br />
                    <small>{p.description}</small>
                    <br /><br />
                    <a href={`/project/${p._id}`}>View</a>
                </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
