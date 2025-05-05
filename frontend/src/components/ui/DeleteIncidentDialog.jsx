export default function DeleteIncidentDialog({ deleteIncident, onCancel, onConfirm }) {
  if (!deleteIncident) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Delete Incident</h2>
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete <span className="font-bold">{deleteIncident.title}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 