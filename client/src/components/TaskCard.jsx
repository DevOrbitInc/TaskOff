function TaskCard({ id, title, status, tag, assignee }) {
  const statusStyles = {
    Todo: "bg-section text-muted",
    // "In progress": "bg-amber-soft text-amber",
    "In Progress": "bg-amber-soft text-amber",
    // "In review": "bg-signal-soft text-signal",
    "In Review": "bg-signal-soft text-signal",
    Done: "bg-green-soft text-green",
  };

  return (
    <article className="grid min-h-[44px] grid-cols-[minmax(260px,1fr)_132px_94px_72px] items-center gap-3 px-5 py-2 last:border-b-0">
      <div>
        <p className="font-mono text-[9px] text-muted">{id}</p>
        <h2 className="text-xs font-semibold text-ink">{title}</h2>
      </div>
      <span
        className={`w-fit rounded-full px-2 py-0.5 text-[9px] font-medium ${statusStyles[status] || statusStyles.Todo}`}
      >
        <span className="mr-1">{"\u2022"}</span>
        {status}
      </span>
      <span
        className={
          tag
            ? `w-fit rounded-full bg-section px-2 py-0.5 text-[9px] text-muted ${tag === "auth" ? "bg-signal-soft text-signal" : ""}`
            : ""
        }
      >
        {tag}
      </span>
      <span className="grid h-6 w-6 place-items-center rounded-md bg-signal text-[9px] font-bold text-white">
        {assignee}
      </span>
    </article>
  );
}

export default TaskCard;
