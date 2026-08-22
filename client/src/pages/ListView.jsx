import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import TaskCard from "../components/TaskCard";

function ListView() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadTasks = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const taskData = await getTasks();
      setTasks(taskData);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;

    const fetchTasks = async () => {
      try {
        const taskData = await getTasks();
        if (isActive) setTasks(taskData);
      } catch {
        if (isActive) setHasError(true);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    fetchTasks();

    return () => {
      isActive = false;
    };
  }, []);

  if (isLoading) return <LoadingState />;
  if (hasError) return <ErrorState onRetry={loadTasks} />;
  if (tasks.length === 0) return <EmptyState />;

  return (
    <section className="overflow-x-auto bg-white">
      <div className="min-w-[700px]">
        <div className="grid grid-cols-[minmax(260px,1fr)_132px_94px_72px] items-center gap-3 border-b border-gray-100 px-5 py-3 text-[10px] font-medium uppercase tracking-wide text-muted">
          <span>Task</span>
          <span>Status</span>
          <span>Tag</span>
          <span>Assignee</span>
        </div>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            id={`#${task.taskNumber}`}
            title={task.title}
            status={task.status}
            tag={task.tag}
            assignee={task.assignee?.fullName?.slice(0, 2).toUpperCase() || "-"}
          />
        ))}
      </div>
    </section>
  );
}

export default ListView;
