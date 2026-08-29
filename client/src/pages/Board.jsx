import { initialsOf } from "@/utils/getUserAbbr";
import { PlusIcon } from "lucide-react";
import { useOutletContext } from "react-router-dom";

// assignee vient du backend comme un objet User ({ _id, fullName }) ou null
function assigneeName(assignee) {
  if (!assignee) return "Unassigned";
  return assignee.fullName || "Unassigned";
}

const AVATAR_COLORS = [
  "bg-signal/10 text-signal",
  "bg-green-soft text-green-600",
  "bg-amber-soft text-amber-600",
  "bg-purple-100 text-purple-600",
  "bg-pink-100 text-pink-600",
];

function colorFor(name = "") {
  const index = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

export default function Board() {
  const { isLoading, columns, tasks, onEdit, onCreate } = useOutletContext();

  return (
    <div className="flex-1 px-8 pb-8 overflow-x-auto">
      {isLoading ? (
        <p className="text-sm text-muted">Loading tasks…</p>
      ) : (
        <div className="grid min-w-[900px] grid-cols-4 gap-6 pt-8">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.key);
            return (
              <div key={col.key} className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-1 text-sm font-semibold text-muted">
                  <span className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                    {col.label}
                  </span>
                  <span className="text-xs text-muted">{colTasks.length}</span>
                </div>

                <div className="flex flex-col gap-3">
                  {colTasks.map((task) => {
                    const name = assigneeName(task.assignee);
                    return (
                      <button
                        key={task._id || task.id}
                        onClick={() => onEdit(task)}
                        className="flex flex-col gap-3 p-4 text-left transition shadow-sm rounded-xl bg-paper hover:shadow-md"
                      >
                        <div>
                          <p className="mb-1 text-xs text-muted">
                            #{String(task.taskNumber ?? "").padStart(3, "0")}
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
                            className={`flex h-6 w-6 items-center justify-center rounded-lg text-[11px] font-semibold leading-none ${colorFor(
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
                    onClick={onCreate}
                    className="rounded-xl border border-dashed border-muted/30 py-2.5 text-sm font-medium text-muted hover:bg-paper gap-2 flex items-center justify-center"
                  >
                    <PlusIcon className="size-3" strokeWidth={3} />
                    <span>Add task</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
