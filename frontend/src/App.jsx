import { useState, useEffect } from "react";

const API = "";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch(`${API}/todos`)
      .then((r) => r.json())
      .then((data) => { setTodos(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const res = await fetch(`${API}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input }),
    });
    const todo = await res.json();
    setTodos([todo, ...todos]);
    setInput("");
  };

  const toggleTodo = async (id) => {
    const res = await fetch(`${API}/todos/${id}`, { method: "PATCH" });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "done") return t.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <span className="logo">✦</span>
          <h1>Todo<span>List</span></h1>
          <p className="subtitle">Projet DevOps — OVH Cloud</p>
        </div>
      </header>

      <main>
        <form onSubmit={addTodo} className="add-form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ajouter une tâche..."
            autoFocus
          />
          <button type="submit">Ajouter</button>
        </form>

        <div className="filters">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "Tout" : f === "active" ? "En cours" : "Terminées"}
            </button>
          ))}
          <span className="count">{remaining} restante{remaining > 1 ? "s" : ""}</span>
        </div>

        {loading ? (
          <div className="empty">Chargement...</div>
        ) : filtered.length === 0 ? (
          <div className="empty">Aucune tâche ici.</div>
        ) : (
          <ul className="todo-list">
            {filtered.map((todo) => (
              <li key={todo.id} className={todo.completed ? "done" : ""}>
                <button className="check" onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? "✓" : ""}
                </button>
                <span className="title">{todo.title}</span>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>×</button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
