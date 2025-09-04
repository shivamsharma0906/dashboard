"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface StudentRequest {
  id: string
  name: string
  rollNo: string
  department: string
  year: string
  requestDate: string
  status: "pending" | "approved" | "declined"
}

// Mock data for student approval requests
const mockRequests: StudentRequest[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    rollNo: "CS2021001",
    department: "Computer Science",
    year: "3rd Year",
    requestDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "2",
    name: "Priya Patel",
    rollNo: "EC2022045",
    department: "Electronics",
    year: "2nd Year",
    requestDate: "2024-01-14",
    status: "pending",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    rollNo: "ME2021078",
    department: "Mechanical",
    year: "3rd Year",
    requestDate: "2024-01-13",
    status: "pending",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    rollNo: "CS2023012",
    department: "Computer Science",
    year: "1st Year",
    requestDate: "2024-01-12",
    status: "pending",
  },
  {
    id: "5",
    name: "Vikram Singh",
    rollNo: "EE2022033",
    department: "Electrical",
    year: "2nd Year",
    requestDate: "2024-01-11",
    status: "pending",
  },
]

export function ApprovalsPage() {
  const [requests, setRequests] = useState<StudentRequest[]>(mockRequests)
  const [processingId, setProcessingId] = useState<string | null>(null)

  const handleApproval = async (id: string, action: "approved" | "declined") => {
    setProcessingId(id)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setRequests((prev) => prev.map((request) => (request.id === id ? { ...request, status: action } : request)))

    setProcessingId(null)
  }

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const processedRequests = requests.filter((req) => req.status !== "pending")

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Pending Approvals of Students</h2>
        <p className="text-muted-foreground">Review and take action on join requests.</p>
      </div>

      <div className="space-y-6">
        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Pending Requests ({pendingRequests.length})</h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{request.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {request.rollNo}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">{request.department}</span> · {request.year}
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Requested: {new Date(request.requestDate).toLocaleDateString("en-IN")}
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(request.id, "approved")}
                          disabled={processingId === request.id}
                          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          {processingId === request.id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept
                            </>
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleApproval(request.id, "declined")}
                          disabled={processingId === request.id}
                          className="flex-1"
                        >
                          {processingId === request.id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 mr-1" />
                              Decline
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recently Processed Section */}
        {processedRequests.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Recently Processed ({processedRequests.length})
            </h3>

            <div className="grid gap-3">
              {processedRequests.slice(0, 5).map((request) => (
                <Card key={request.id} className="bg-muted/30">
                  <CardContent className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium text-foreground">{request.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">({request.rollNo})</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {request.department} · {request.year}
                        </div>
                      </div>

                      <Badge
                        variant={request.status === "approved" ? "default" : "destructive"}
                        className={cn(
                          "text-xs",
                          request.status === "approved"
                            ? "bg-primary text-primary-foreground"
                            : "bg-destructive text-destructive-foreground",
                        )}
                      >
                        {request.status === "approved" ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Approved
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 mr-1" />
                            Declined
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {pendingRequests.length === 0 && processedRequests.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No pending approvals</h3>
            <p className="text-muted-foreground">All student requests have been processed.</p>
          </div>
        )}
      </div>
    </div>
  )
}
