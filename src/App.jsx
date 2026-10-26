
import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(e) {
    e.preventDefault();

    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      name: task,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((item) => item.id !== id));
  }

  const pendingTasks = tasks.filter(
    (item) => !item.completed
  ).length;

  return (
    <div style={styles.container}>
      <h1>Student Task Tracker</h1>
      <p>Organize your daily college tasks</p>

      <form onSubmit={addTask} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Add Task
        </button>
      </form>

      <h3>Pending Tasks: {pendingTasks}</h3>

      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <ul style={styles.list}>
          {tasks.map((item) => (
            <li key={item.id} style={styles.task}>
              <span
                onClick={() => toggleTask(item.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: item.completed
                    ? "line-through"
                    : "none",
                  color: item.completed ? "gray" : "black"
                }}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                />
                {" "}{item.name}
              </span>

              <button
                onClick={() => deleteTask(item.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "25px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f5f7fb",
    borderRadius: "12px"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginTop: "25px"
  },
  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  },
  addButton: {
    padding: "12px 18px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  task: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "white",
    borderRadius: "6px"
  },
  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default App;
