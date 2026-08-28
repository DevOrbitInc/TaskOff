import Button from "./Button";
import { Field, FieldLabel } from "./Field";
import { Input } from "./Input";
import { TextArea } from "./TextArea";

export default function Model({ props }) {
  const {
    mode,
    onClose,
    onSubmit,
    form,
    onFieldUpdate,
    columns,
    assigneeOptions,
    onDelete,
    isSaving,
  } = props;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-ink/40">
      <div className="w-full max-w-lg p-6 shadow-2xl rounded-xl bg-paper">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-ink">
            {mode === "edit" ? "Edit task" : "New task"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              required
              placeholder="e.g. Build create/edit task modal"
              value={form.title}
              onChange={(e) => onFieldUpdate("title", e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <TextArea
              id="description"
              rows={3}
              placeholder="Optional details..."
              value={form.description}
              onChange={(e) => onFieldUpdate("description", e.target.value)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <select
                id="status"
                value={form.status}
                onChange={(e) => onFieldUpdate("status", e.target.value)}
                className="px-4 py-2 border rounded-xl border-muted/30 bg-section text-muted focus:outline-none"
              >
                {columns.map((col) => (
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
                onChange={(e) => onFieldUpdate("assignee", e.target.value)}
                className="px-4 py-2 border rounded-xl border-muted/30 bg-section text-muted focus:outline-none"
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
              onChange={(e) => onFieldUpdate("tag", e.target.value)}
            />
          </Field>

          <div className="flex items-center justify-between pt-4 mt-6 border-t border-section">
            {mode === "edit" ? (
              <button
                type="button"
                onClick={onDelete}
                disabled={isSaving}
                className="flex items-center gap-1 text-sm font-semibold text-danger hover:text-danger/80"
              >
                Delete task
              </button>
            ) : (
              <span />
            )}

            <div className="flex gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold rounded-lg text-muted hover:bg-section"
              >
                Cancel
              </button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={isSaving}
              >
                {isSaving
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
  );
}
