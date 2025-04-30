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

// Sample incidents data
const sampleIncidents = [
  {
    id: "inc-001",
    title: "Database Connection Failure",
    description: "Users unable to access customer records due to database connectivity issues",
    timestamp: new Date(2023, 3, 15, 14, 30),
    severity: "high",
    status: "resolved",
  },
  {
    id: "inc-002",
    title: "API Gateway Timeout",
    description: "External API requests timing out, affecting payment processing",
    timestamp: new Date(2023, 3, 18, 9, 15),
    severity: "critical",
    status: "investigating",
  },
  {
    id: "inc-003",
    title: "Website Performance Degradation",
    description: "Slow page load times reported across multiple regions",
    timestamp: new Date(2023, 3, 20, 11, 45),
    severity: "medium",
    status: "open",
  },
  {
    id: "inc-004",
    title: "Authentication Service Disruption",
    description: "Users experiencing intermittent login failures",
    timestamp: new Date(2023, 3, 22, 16, 20),
    severity: "high",
    status: "investigating",
  },
  {
    id: "inc-005",
    title: "Storage System at 95% Capacity",
    description: "Main storage cluster approaching capacity limits",
    timestamp: new Date(2023, 3, 25, 8, 10),
    severity: "medium",
    status: "open",
  },
  {
    id: "inc-006",
    title: "CDN Cache Invalidation Failure",
    description: "Content updates not propagating to edge locations",
    timestamp: new Date(2023, 3, 27, 13, 50),
    severity: "low",
    status: "resolved",
  },
  {
    id: "inc-007",
    title: "SSL Certificate Expiration Warning",
    description: "Production certificates expiring in 7 days",
    timestamp: new Date(2023, 3, 28, 10, 30),
    severity: "medium",
    status: "open",
  },
  {
    id: "inc-008",
    title: "Network Packet Loss Detected",
    description: "Intermittent connectivity issues between data centers",
    timestamp: new Date(2023, 3, 29, 15, 45),
    severity: "high",
    status: "investigating",
  },
  {
    id: "inc-009",
    title: "Backup Job Failure",
    description: "Nightly backup process failed to complete",
    timestamp: new Date(2023, 3, 30, 5, 15),
    severity: "medium",
    status: "resolved",
  },
  {
    id: "inc-010",
    title: "Memory Leak in Production Service",
    description: "Gradual performance degradation observed in main application service",
    timestamp: new Date(2023, 4, 1, 12, 0),
    severity: "critical",
    status: "open",
  },
]

// Get severity badge color
const getSeverityColor = (severity) => {
  switch (severity) {
    case "low":
      return "secondary"
    case "medium":
      return "default"
    case "high":
      return "destructive"
    case "critical":
      return "destructive"
    default:
      return "default"
  }
}

// Get status badge color
const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "secondary"
    case "investigating":
      return "default"
    case "resolved":
      return "default"
    default:
      return "default"
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [incidents, setIncidents] = useState(sampleIncidents)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newIncident, setNewIncident] = useState({
    title: "",
    description: "",
    severity: "medium",
    status: "open",
  })

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
    }
  }, [navigate])

  // Filter incidents based on search query
  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateIncident = () => {
    const newIncidentWithId = {
      id: `inc-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      timestamp: new Date(),
      ...newIncident,
    }
    setIncidents([newIncidentWithId, ...incidents])
    setIsDialogOpen(false)
    setNewIncident({
      title: "",
      description: "",
      severity: "medium",
      status: "open",
    })
  }

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
                      className="w-full px-3 py-2 border rounded"
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
                <DialogFooter>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleCreateIncident}
                    disabled={!newIncident.title || !newIncident.description}
                  >
                    Create Incident
                  </button>
                </DialogFooter>
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
                      className="pl-8 pr-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute left-2.5 top-2.5 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4-4m0 0A7 7 0 104 4a7 7 0 0013 13z" /></svg>
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-t">
                  {filteredIncidents.length > 0 ? (
                    <div className="divide-y">
                      {filteredIncidents.map((incident) => (
                        <div key={incident.id} className="p-4 hover:bg-gray-50">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{incident.title}</h3>
                                <Badge variant={getSeverityColor(incident.severity)}>
                                  {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                                </Badge>
                                <Badge variant={getStatusColor(incident.status)}>
                                  {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{incident.description}</p>
                            </div>
                            <div className="flex items-center text-xs text-gray-400 whitespace-nowrap">
                              <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              {format(incident.timestamp, "MMM d, yyyy 'at' h:mm a")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
      </main>
    </div>
  )
}
