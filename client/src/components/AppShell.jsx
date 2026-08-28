import { initialsOf } from "@/utils/getUserAbbr";
import Button from "./ui/Button";
import { Check, LogOut, PlusIcon } from "lucide-react";
import { cn } from "@/utils/utils";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

// sidebar tabs with there names & paths
const TABS = [
  { label: "Board", to: "/dashboard/board" },
  { label: "List view", to: "/dashboard/list-view" },
  { label: "My tasks", to: "/dashboard/my-tasks" },
];

function AppShell({ children, tasksLength, onCreate, error }) {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useOutsideClick(() => setShowPopup(false));

  const location = useLocation();
  const {
    user: { user: currentUser },
    logout,
  } = useAuth();

  // function to get header title based on the current page url path
  function getHeaderTitle() {
    if (location.pathname.includes("list-view")) return "List View";
    if (location.pathname.includes("my-tasks")) return "My Tasks";
    return "Board";
  }

  return (
    <div className="flex w-full min-h-dvh h-dvh bg-paper">
      {/* SIDEBAR */}
      <aside className="flex-col justify-between hidden w-64 p-5 md:flex shrink-0 bg-section max-h-dvh">
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
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg w-full transition-colors last:pointer-events-none last:opacity-50",
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

        <div className="relative border-t-2 border-section">
          <button
            ref={popupRef}
            onClick={() => setShowPopup((prev) => !prev)}
            className="flex items-center gap-3 pt-4 text-left"
          >
            <div className="flex items-center justify-center font-semibold rounded-xl size-9 shrink-0 bg-signal">
              <span className="leading-none tracking-wider text-section text-sm">
                {initialsOf(currentUser?.fullName || "U")}
              </span>
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight text-ink capitalize">
                {currentUser?.fullName || "User"}
              </div>
              <div className="text-xs text-muted">
                {currentUser?.email || ""}
              </div>
            </div>
          </button>

          <div
            data-show={showPopup}
            className="absolute right-0 bottom-full size-fit bg-signal-soft flex flex-col items-end justify-stretch rounded-lg mb-2 data-[show=true]:opacity-100 data-[show=true]:visible data-[show=true]:scale-100 opacity-0 invisible transition-[opacity,transform] ease-out scale-50 origin-bottom-right"
          >
            <button
              type="button"
              onClick={logout}
              className="flex items-center justify-center gap-2 px-4 py-2"
            >
              <span className="text-sm">Logout</span>
              <LogOut className="stroke-[3] size-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex flex-col flex-1 min-w-0 h-dvh">
        <header className="flex items-center justify-between h-20 px-8 shrink-0 sticky top-0 bg-paper z-50 border-b border-muted/10">
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
        <div className="flex-1 overflow-hidden">{children}</div>
      </main>
    </div>
  );
}

export default AppShell;
