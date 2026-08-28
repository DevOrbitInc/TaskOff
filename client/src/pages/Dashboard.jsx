import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks.js";
import { getUsers } from "../api/users.js";
import useAuth from "@/hooks/useAuth.js";
import AppShell from "@/components/AppShell.jsx";
import Model from "@/components/ui/Model.jsx";
import { Outlet } from "react-router-dom";

// Statuts alignés sur l'enum du schéma Mongoose (Task.status)
const COLUMNS = [
  { key: "Todo", label: "To do", dot: "bg-muted" },
  { key: "In Progress", label: "In progress", dot: "bg-amber" },
  { key: "In Review", label: "In review", dot: "bg-signal" },
  { key: "Done", label: "Done", dot: "bg-green" },
];

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

export default function Dashboard() {
  const { user, token, loading: authLoading } = useAuth();
  const currentUserId = user?.id || user?._id || "";

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
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
    if (authLoading || !token || !user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, [authLoading, token, user, loadTasks]);

  useEffect(() => {
    if (authLoading || !token || !user) return;

    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(Array.isArray(data) ? data : data.users || []);
      } catch (err) {
        setError(err.message || "Failed to load users");
      }
    }

    loadUsers();
  }, [authLoading, token, user]);

  const assigneeOptions = users.map((assignee) => ({
    id: assigneeId(assignee),
    name: assignee.fullName,
  }));

  if (
    currentUserId &&
    user?.fullName &&
    !assigneeOptions.some((assignee) => assignee.id === currentUserId)
  ) {
    assigneeOptions.unshift({ id: currentUserId, name: user.fullName });
  }

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
    <>
      <AppShell
        user={user}
        tasksLength={tasks.length}
        error={error}
        onCreate={openCreateModal}
      >
        {/* This is the slot where all the view modes will render */}
        {/* passing the props down through the context of outlet available for dashboard sub paths */}
        <Outlet
          context={{
            tasks,
            columns: COLUMNS,
            isLoading: loading,
            onEdit: openEditModal,
            onCreate: openCreateModal,
          }}
        />
      </AppShell>

      {/* MODAL */}
      {modalOpen && (
        <Model
          props={{
            mode,
            form,
            columns: COLUMNS,
            assigneeOptions,
            isSaving: saving,
            onClose: closeModal,
            onSubmit: handleSubmit,
            onDelete: handleDelete,
            onFieldUpdate: updateField,
          }}
        />
      )}
    </>
  );
}
