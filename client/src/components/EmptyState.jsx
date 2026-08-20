function EmptyState() {
  return (
    <div className="flex min-h-[240px] items-center justify-center p-6">
      <div className="text-center">
        <h2 className="text-sm font-semibold text-ink">No tasks yet</h2>
        <p className="mt-1 text-xs text-muted">Tasks will appear here once they are created.</p>
      </div>
    </div>
  );
}

export default EmptyState;
