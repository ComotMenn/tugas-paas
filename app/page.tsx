'use client';

import { useState, type FormEvent } from "react";

type Task = {
  id: number;
  title: string;
  done: boolean;
};

const filters = ["Semua", "Aktif", "Selesai"] as const;
type TaskFilter = (typeof filters)[number];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<TaskFilter>("Semua");

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = input.trim();
    if (!title) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), title, done: false },
    ]);
    setInput("");
  }

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function deleteTask(id: number) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Aktif") return !task.done;
    if (filter === "Selesai") return task.done;
    return true;
  });

  const completed = tasks.filter((task) => task.done).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  return (
    <main className="page">
      <div className="container">
        <header className="header">
          <a className="logo" href="#home" aria-label="TaskMate beranda">
            TaskMate<span>.</span>
          </a>
          <span className="header-label">MY PRODUCTIVITY</span>
        </header>

        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="tag">✦ ORGANIZE YOUR DAY</div>
          <h1 id="hero-title">
            Sedikit demi sedikit,
            <br />
            <span>semua jadi.</span>
          </h1>
          <p>
            Catat tugasmu, atur prioritas, dan selesaikan satu per satu. Kamu
            pasti bisa!
          </p>
        </section>

        <section className="stats" aria-label="Ringkasan tugas">
          <div className="stat">
            <span>Total tugas</span>
            <strong>{tasks.length}</strong>
          </div>
          <div className="stat">
            <span>Belum selesai</span>
            <strong>{tasks.length - completed}</strong>
          </div>
          <div className="stat">
            <span>Selesai</span>
            <strong>{completed}</strong>
          </div>
        </section>

        <section className="task-panel" aria-labelledby="tasks-title">
          <h2 id="tasks-title">Daftar Tugas</h2>
          <p className="subtitle">Apa yang ingin kamu selesaikan hari ini?</p>

          <form onSubmit={addTask} className="task-form">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Contoh: Mengerjakan tugas sekolah..."
              aria-label="Nama tugas"
            />
            <button type="submit">+ Tambah</button>
          </form>

          <div className="filters" role="group" aria-label="Filter tugas">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "filter active" : "filter"}
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="task-list" aria-live="polite">
            {filteredTasks.length === 0 ? (
              <div className="empty">
                <div className="empty-icon" aria-hidden="true">
                  ✓
                </div>
                <strong>Belum ada tugas di sini</strong>
                <p>
                  {tasks.length === 0
                    ? "Tambahkan tugas pertamamu di atas."
                    : "Coba pilih filter yang lain."}
                </p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div className="task-item" key={task.id}>
                  <label className="task-label">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span
                      className={task.done ? "task-title done" : "task-title"}
                    >
                      {task.title}
                    </span>
                  </label>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Hapus ${task.title}`}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="progress">
            <div className="progress-info">
              <span>Progress hari ini</span>
              <strong>{progress}%</strong>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Progress tugas hari ini"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </section>

        <footer>Dibuat dengan semangat belajar ✦ TaskMate © 2026</footer>
      </div>
    </main>
  );
}
