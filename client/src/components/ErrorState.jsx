function ErrorState({ onRetry }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-xl text-danger">!</div>
        <h2 className="text-sm font-semibold text-ink">Couldn't load tasks</h2>
        <p className="mt-2 text-xs text-muted">The server didn't respond. Check your connection and try again.</p>
        <button type="button" onClick={onRetry} className="mt-4 rounded-full border border-gray-200 px-4 py-2 text-xs font-medium hover:bg-section">
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorState;
