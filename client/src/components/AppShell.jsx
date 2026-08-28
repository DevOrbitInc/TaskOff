import { initialsOf } from "@/utils/getUserAbbr";
import Button from "./ui/Button";
import { Check, PlusIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import { NavLink, useLocation } from "react-router-dom";

// sidebar tabs with there names & paths
const TABS = [
  { label: "Board", to: "/dashboard/board" },
  { label: "List view", to: "/dashboard/list-view" },
  { label: "My tasks", to: "/dashboard/my-tasks" },
];

function AppShell({ children, user = {}, tasksLength, onCreate, error }) {
  const location = useLocation();

  // function to get header title based on the current page url path
  function getHeaderTitle() {
    if (location.pathname.includes("list-view")) return "List View";
    if (location.pathname.includes("my-tasks")) return "My Tasks";
    return "Board";
  }

  return (
    <div className="flex w-full min-h-dvh h-dvh bg-section">
      {/* SIDEBAR */}
      <aside className="flex-col justify-between hidden w-64 p-5 md:flex shrink-0 bg-paper">
        <div>
          <div className="mb-8 flex items-center gap-2.5">
            <div className="flex items-center justify-center text-sm font-bold text-white rounded-lg h-7 w-7 bg-signal">
              <Check className="size-4" strokeWidth={3} />
            </div>
            <span className="text-xl font-bold tracking-tight text-ink">
              TaskOff
            </span>
          </div>

          <p className="px-3 mb-2 text-xs font-semibold tracking-wider uppercase text-muted">
            Workspace
          </p>

          <nav className="space-y-1">
            {TABS.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg w-full transition-colors",
                    isActive
                      ? "bg-signal/10 text-signal"
                      : "text-muted hover:bg-section",
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-section">
          <div className="flex items-center justify-center text-xs font-semibold rounded-full h-9 w-9 bg-signal/10 text-signal">
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
      <main className="flex flex-col flex-1 min-w-0">
        <header className="flex items-center justify-between h-20 px-8 shrink-0 sticky top-0">
          <div>
            <h1 className="text-xl font-bold text-ink">{getHeaderTitle()}</h1>
            <p className="text-sm text-muted">
              TaskOff · MVP v1 · {tasksLength} open
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            className="gap-1"
            onClick={onCreate}
          >
            <PlusIcon className="size-4" strokeWidth={3} />
            <span>New task</span>
          </Button>
        </header>

        {error && (
          <div className="px-4 py-2 mx-8 mb-4 text-sm rounded-lg bg-danger-soft text-danger">
            {error}
          </div>
        )}

        {children}
      </main>
    </div>
  );
}

export default AppShell;
