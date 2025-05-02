"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import Header from "./Header"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { Textarea } from "./components/ui/textarea"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSearch, faExclamationCircle, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons';

// Get severity badge Tailwind class
const getSeverityClass = (severity) => {
  switch (severity) {
    case "low":
      return "bg-blue-200 text-blue-800";
    case "medium":
      return "bg-yellow-200 text-yellow-800";
    case "high":
      return "bg-orange-200 text-orange-800";
    case "critical":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Get status badge Tailwind class
const getStatusClass = (status) => {
  switch (status) {
    case "open":
      return "bg-gray-100 text-gray-800";
    case "investigating":
      return "bg-purple-200 text-purple-800";
    case "resolved":
      return "bg-green-200 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [incidents, setIncidents] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "medium",
    status: "open",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Dropdown and delete dialog state
  const [dropdownOpenId, setDropdownOpenId] = useState(null)
  const [deleteIncident, setDeleteIncident] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMsg, setToastMsg] = useState("")

  // Fetch incidents from the backend
  const fetchIncidents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/incidents/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch incidents");
      }
      const data = await response.json();
      // Convert timestamp strings to Date objects
      const incidentsWithDates = data.map(incident => ({
        ...incident,
        timestamp: new Date(incident.timestamp),
      }));
      setIncidents(incidentsWithDates);
    } catch (err) {
      setError(err.message || "Failed to fetch incidents");
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    } else {
      fetchIncidents(); // Fetch incidents on mount
    }
  }, [navigate])

  // Filter incidents based on search query
  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateIncident = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/incidents/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newIncident.title,
          description: newIncident.description,
          severity: newIncident.severity,
          status: newIncident.status,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to create incident");
      }
      // After creating, re-fetch incidents from the DB
      await fetchIncidents();
      setIsDialogOpen(false);
      setNewIncident({
        title: "",
        description: "",
        severity: "medium",
        status: "open",
      });
    } catch (err) {
      setError(err.message || "Failed to create incident");
    } finally {
      setLoading(false);
    }
  }

  // Handle delete
  const handleDeleteClick = (incident) => {
    setDeleteIncident(incident)
    setDropdownOpenId(null)
  }
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/incidents/${deleteIncident.id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete incident");
      }
      setIncidents(incidents.filter((inc) => inc.id !== deleteIncident.id));
      setDeleteIncident(null);
      setToastMsg("Incident deleted successfully.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } catch (err) {
      setDeleteIncident(null);
      setToastMsg("Failed to delete incident. Please try again.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  }
  const cancelDelete = () => setDeleteIncident(null)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-500">Manage and monitor incidents</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Incident</button>
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
                      className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder:text-gray-400"
                      placeholder="Brief title of the incident"
                      value={newIncident.title}
                      onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="block text-sm font-medium">Description</label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the incident"
                      rows={4}
                      value={newIncident.description}
                      onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <label htmlFor="severity" className="block text-sm font-medium">Severity</label>
                      <Select
                        value={newIncident.severity}
                        onValueChange={(value) => setNewIncident({ ...newIncident, severity: value })}
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
                        onValueChange={(value) => setNewIncident({ ...newIncident, status: value })}
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
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleCreateIncident}
                    disabled={!newIncident.title || !newIncident.description || loading}
                  >
                    {loading ? "Creating..." : "Create Incident"}
                  </button>
                </DialogFooter>
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Recent Incidents</CardTitle>
                  <div className="relative w-full md:w-64">
                    <input
                      type="search"
                      placeholder="Search incidents..."
                      className="pl-8 pr-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute left-2.5 top-2.5 text-gray-400">
                      <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  {filteredIncidents.length > 0 ? (
                    <div className="divide-y">
                      {filteredIncidents.map((incident) => (
                        <div key={incident.id} className="p-4 hover:bg-gray-50 relative">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{incident.title}</h3>
                                <Badge className={getSeverityClass(incident.severity)}>
                                  {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                                </Badge>
                                <Badge className={getStatusClass(incident.status)}>
                                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{incident.description}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center text-xs text-gray-400 whitespace-nowrap">
                                <FontAwesomeIcon icon={faClock} className="mr-1 h-3 w-3" />
                                {incident.timestamp.toLocaleString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </div>
                              {/* 3-dots dropdown */}
                              <div className="relative">
                                <button
                                  className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                  onClick={() => setDropdownOpenId(dropdownOpenId === incident.id ? null : incident.id)}
                                >
                                  <FontAwesomeIcon icon={faEllipsisV} className="h-5 w-5 text-gray-500" />
                                </button>
                                {dropdownOpenId === incident.id && (
                                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                                    <button
                                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                      onClick={() => handleDeleteClick(incident)}
                                    >
                                      <FontAwesomeIcon icon={faTrash} className="mr-2 h-4 w-4" /> Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <FontAwesomeIcon icon={faExclamationCircle} className="h-10 w-10 text-gray-300 mb-3" />
                      <h3 className="font-medium">No incidents found</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {searchQuery ? "Try adjusting your search query" : "Create your first incident to get started"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Delete Confirmation Dialog */}
        {deleteIncident && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-2">Delete Incident</h2>
              <p className="mb-4 text-gray-600">Are you sure you want to delete <span className="font-bold">{deleteIncident.title}</span>? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out">
            {toastMsg}
          </div>
        )}
      </main>
    </div>
  )
}
