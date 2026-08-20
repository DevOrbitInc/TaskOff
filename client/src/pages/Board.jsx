import { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks.js";
import AuthContext from "../context/AuthContext.jsx";
import Button from "../components/ui/Button";
import { Field, FieldLabel } from "../components/ui/Field";
import { Input } from "../components/ui/Input";
import { TextArea } from "../components/ui/TextArea";

// Statuts alignés sur l'enum du schéma Mongoose (Task.status)
const COLUMNS = [
  { key: "Todo", label: "To do", dot: "bg-muted" },
  { key: "In Progress", label: "In progress", dot: "bg-amber" },
  { key: "In Review", label: "In review", dot: "bg-signal" },
  { key: "Done", label: "Done", dot: "bg-green" },
];

const AVATAR_COLORS = [
  "bg-signal/10 text-signal",
  "bg-green-soft text-green-600",
  "bg-amber-soft text-amber-600",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
];

function initialsOf(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function colorFor(name = "") {
  const index = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

// assignee vient du backend comme un objet User ({ _id, fullName }) ou null
function assigneeName(assignee) {
  if (!assignee) return "Unassigned";
  return assignee.fullName || "Unassigned";
}

function assigneeId(assignee) {
  if (!assignee) return "";
  return assignee._id || assignee.id || "";
}

const emptyForm = {
  title: "",
  description: "",
  status: "Todo",
  assignee: "",
  tag: "",
};

export default function Board() {
  const { user } = useContext(AuthContext) || {};
  const currentUserId = user?.id || user?._id || "";

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("create"); // 'create' | 'edit'
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : data.tasks || []);
    } catch (err) {
      setError(err.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const assigneeOptions = [];
  const assigneeIds = new Set();

  if (currentUserId && user?.fullName) {
    assigneeOptions.push({ id: currentUserId, name: user.fullName });
    assigneeIds.add(currentUserId);
  }

  tasks.forEach((task) => {
    const id = assigneeId(task.assignee);
    const name = assigneeName(task.assignee);

    if (id && name !== "Unassigned" && !assigneeIds.has(id)) {
      assigneeOptions.push({ id, name });
      assigneeIds.add(id);
    }
  });

  function openCreateModal() {
    setMode("create");
    setForm({ ...emptyForm, assignee: currentUserId });
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditModal(task) {
    setMode("edit");
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
      assignee: assigneeId(task.assignee),
      tag: task.tag || "",
    });
    setEditingId(task._id || task.id);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    // On n'envoie assignee que s'il est réellement renseigné.
    // Une string vide '' fait souvent échouer la validation ObjectId côté API,
    // donc on omet complètement la clé plutôt que d'envoyer '' ou null.
    const payload = { ...form };
    if (payload.assignee && payload.assignee.trim()) {
      payload.assignee = payload.assignee.trim();
    } else {
      delete payload.assignee;
    }

    try {
      if (mode === "edit") {
        await updateTask(editingId, payload);
      } else {
        await createTask(payload);
      }
      await loadTasks();
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save task");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!editingId) return;
    setSaving(true);
    setError("");

    try {
      await deleteTask(editingId);
      await loadTasks();
      closeModal();
    } catch (err) {
      setError(err.message || "Failed to delete task");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-section">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col justify-between bg-paper p-5">
        <div>
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal text-sm font-bold text-white">
              ✓
            </div>
            <span className="text-xl font-bold tracking-tight text-ink">
              TaskOff
            </span>
          </div>

          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted">
            Workspace
          </p>

          <nav className="space-y-1">
            <Link
              to="/board"
              className="flex items-center gap-3 rounded-lg bg-signal/10 px-3 py-2 text-sm font-medium text-signal"
            >
              Board
            </Link>
            <Link
              to="/list"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-section"
            >
              List view
            </Link>
            <Link
              to="/my-tasks"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-section"
            >
              My tasks
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3 border-t border-section pt-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal/10 text-xs font-semibold text-signal">
            {initialsOf(user?.fullName || "U")}
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight text-ink">
              {user?.fullName || "User"}
            </div>
            <div className="text-xs text-muted">{user?.email || ""}</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-20 shrink-0 items-center justify-between px-8">
          <div>
            <h1 className="text-xl font-bold text-ink">Board</h1>
            <p className="text-sm text-muted">
              TaskOff · MVP v1 · {tasks.length} open
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={openCreateModal}>
            + New task
          </Button>
        </header>

        {error && (
          <div className="mx-8 mb-4 rounded-lg bg-danger-soft px-4 py-2 text-sm text-danger">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-x-auto px-8 pb-8">
          {loading ? (
            <p className="text-sm text-muted">Loading tasks…</p>
          ) : (
            <div className="grid min-w-[900px] grid-cols-4 gap-6">
              {COLUMNS.map((col) => {
                const colTasks = tasks.filter((t) => t.status === col.key);
                return (
                  <div key={col.key} className="flex flex-col gap-3">
                    <div className="mb-1 flex items-center justify-between text-sm font-semibold text-muted">
                      <span className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                        {col.label}
                      </span>
                      <span className="text-xs text-muted">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {colTasks.map((task) => {
                        const name = assigneeName(task.assignee);
                        return (
                          <button
                            key={task._id || task.id}
                            onClick={() => openEditModal(task)}
                            className="flex flex-col gap-3 rounded-xl bg-paper p-4 text-left shadow-sm transition hover:shadow-md"
                          >
                            <div>
                              <p className="mb-1 text-xs text-muted">
                                #
                                {String(task.taskNumber ?? "").padStart(3, "0")}
                              </p>
                              <h3 className="text-sm font-semibold text-ink">
                                {task.title}
                              </h3>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="rounded bg-section px-2 py-0.5 font-medium text-muted">
                                {task.tag || "general"}
                              </span>
                              <span
                                className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${colorFor(
                                  name,
                                )}`}
                              >
                                {name === "Unassigned" ? "—" : initialsOf(name)}
                              </span>
                            </div>
                          </button>
                        );
                      })}

                      <button
                        onClick={openCreateModal}
                        className="rounded-xl border border-dashed border-section py-2.5 text-sm font-medium text-muted hover:bg-paper"
                      >
                        + Add task
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
          <div className="w-full max-w-lg rounded-xl bg-paper p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">
                {mode === "edit" ? "Edit task" : "New task"}
              </h2>
              <button
                onClick={closeModal}
                className="text-muted hover:text-ink"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  required
                  placeholder="e.g. Build create/edit task modal"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <TextArea
                  id="description"
                  rows={3}
                  placeholder="Optional details..."
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <select
                    id="status"
                    value={form.status}
                    onChange={(e) => updateField("status", e.target.value)}
                    className="rounded-xl border border-muted/30 bg-section px-4 py-2 text-muted focus:outline-none"
                  >
                    {COLUMNS.map((col) => (
                      <option key={col.key} value={col.key}>
                        {col.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="assignee">Assignee</FieldLabel>
                  <select
                    id="assignee"
                    value={form.assignee}
                    onChange={(e) => updateField("assignee", e.target.value)}
                    className="rounded-xl border border-muted/30 bg-section px-4 py-2 text-muted focus:outline-none"
                  >
                    <option value="">Unassigned</option>
                    {assigneeOptions.map((assignee) => (
                      <option key={assignee.id} value={assignee.id}>
                        {assignee.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="tag">Tag</FieldLabel>
                <Input
                  id="tag"
                  placeholder="e.g. frontend, backend"
                  value={form.tag}
                  onChange={(e) => updateField("tag", e.target.value)}
                />
              </Field>

              <div className="mt-6 flex items-center justify-between border-t border-section pt-4">
                {mode === "edit" ? (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={saving}
                    className="flex items-center gap-1 text-sm font-semibold text-danger hover:text-danger/80"
                  >
                    Delete task
                  </button>
                ) : (
                  <span />
                )}

                <div className="ml-auto flex gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-muted hover:bg-section"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : mode === "edit"
                        ? "Save changes"
                        : "Create task"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
