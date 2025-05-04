import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";

export default function CreateIncidentDialog({
  open,
  onOpenChange,
  newIncident,
  onChange,
  onCreate,
  loading,
  error,
  triggerButton,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Incident</DialogTitle>
          <DialogDescription>Fill in the details to create a new incident report.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="block text-sm font-medium">Title</label>
            <input
              id="title"
              name="title"
              className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder:text-gray-400"
              placeholder="Brief title of the incident"
              value={newIncident.title}
              onChange={onChange}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Detailed description of the incident"
              rows={4}
              value={newIncident.description}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="severity" className="block text-sm font-medium">Severity</label>
              <Select
                value={newIncident.severity}
                onValueChange={value => onChange({ target: { name: "severity", value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="status" className="block text-sm font-medium">Status</label>
              <Select
                value={newIncident.status}
                onValueChange={value => onChange({ target: { name: "status", value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 md:flex-row md:gap-4">
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => onOpenChange(false)}>
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onCreate}
            disabled={!newIncident.title || !newIncident.description || loading}
          >
            {loading ? "Creating..." : "Create Incident"}
          </button>
        </DialogFooter>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
      </DialogContent>
    </Dialog>
  );
} 