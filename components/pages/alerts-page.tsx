"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, AlertCircle, Mail, Phone, User, Calendar, TrendingDown, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

interface AttendanceAlert {
  id: string
  studentName: string
  rollNo: string
  department: string
  year: string
  currentAttendance: number
  requiredAttendance: number
  classesAttended: number
  totalClasses: number
  lastAttended: string
  alertLevel: "critical" | "warning" | "moderate"
  email: string
  phone: string
  parentContact?: string
}

// Mock attendance alert data
const mockAlerts: AttendanceAlert[] = [
  {
    id: "1",
    studentName: "Ravi Mehta",
    rollNo: "ME2022056",
    department: "Mechanical",
    year: "2nd Year",
    currentAttendance: 45,
    requiredAttendance: 75,
    classesAttended: 18,
    totalClasses: 40,
    lastAttended: "2024-01-10",
    alertLevel: "critical",
    email: "ravi.mehta@college.edu",
    phone: "+91 32109 87654",
    parentContact: "+91 98765 43210",
  },
  {
    id: "2",
    studentName: "Amit Sharma",
    rollNo: "CS2021089",
    department: "Computer Science",
    year: "3rd Year",
    currentAttendance: 58,
    requiredAttendance: 75,
    classesAttended: 23,
    totalClasses: 40,
    lastAttended: "2024-01-12",
    alertLevel: "critical",
    email: "amit.sharma@college.edu",
    phone: "+91 87654 32109",
  },
  {
    id: "3",
    studentName: "Neha Patel",
    rollNo: "EC2022034",
    department: "Electronics",
    year: "2nd Year",
    currentAttendance: 68,
    requiredAttendance: 75,
    classesAttended: 27,
    totalClasses: 40,
    lastAttended: "2024-01-13",
    alertLevel: "warning",
    email: "neha.patel@college.edu",
    phone: "+91 76543 21098",
  },
  {
    id: "4",
    studentName: "Karan Singh",
    rollNo: "EE2023012",
    department: "Electrical",
    year: "1st Year",
    currentAttendance: 72,
    requiredAttendance: 75,
    classesAttended: 29,
    totalClasses: 40,
    lastAttended: "2024-01-14",
    alertLevel: "moderate",
    email: "karan.singh@college.edu",
    phone: "+91 65432 10987",
  },
  {
    id: "5",
    studentName: "Pooja Gupta",
    rollNo: "CS2022067",
    department: "Computer Science",
    year: "2nd Year",
    currentAttendance: 62,
    requiredAttendance: 75,
    classesAttended: 25,
    totalClasses: 40,
    lastAttended: "2024-01-11",
    alertLevel: "warning",
    email: "pooja.gupta@college.edu",
    phone: "+91 54321 09876",
    parentContact: "+91 87654 32109",
  },
]

const alertLevels = ["All Levels", "critical", "warning", "moderate"]
const departments = ["All Departments", "Computer Science", "Electronics", "Mechanical", "Electrical"]

export function AlertsPage() {
  const [selectedLevel, setSelectedLevel] = useState("All Levels")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [alerts, setAlerts] = useState<AttendanceAlert[]>(mockAlerts)

  const filteredAlerts = alerts.filter((alert) => {
    const matchesLevel = selectedLevel === "All Levels" || alert.alertLevel === selectedLevel
    const matchesDepartment = selectedDepartment === "All Departments" || alert.department === selectedDepartment
    return matchesLevel && matchesDepartment
  })

  const getAlertConfig = (level: AttendanceAlert["alertLevel"]) => {
    switch (level) {
      case "critical":
        return {
          color: "border-l-destructive bg-destructive/5",
          badgeColor: "bg-destructive text-destructive-foreground",
          icon: AlertTriangle,
          iconColor: "text-destructive",
          label: "Critical",
        }
      case "warning":
        return {
          color: "border-l-accent bg-accent/5",
          badgeColor: "bg-accent text-accent-foreground",
          icon: AlertCircle,
          iconColor: "text-accent",
          label: "Warning",
        }
      case "moderate":
        return {
          color: "border-l-secondary bg-secondary/5",
          badgeColor: "bg-secondary text-secondary-foreground",
          icon: Bell,
          iconColor: "text-secondary",
          label: "Moderate",
        }
    }
  }

  const handleSendReminder = (alertId: string, type: "student" | "parent") => {
    // Simulate sending reminder
    console.log(`Sending ${type} reminder for alert ${alertId}`)
  }

  const criticalCount = filteredAlerts.filter((a) => a.alertLevel === "critical").length
  const warningCount = filteredAlerts.filter((a) => a.alertLevel === "warning").length
  const moderateCount = filteredAlerts.filter((a) => a.alertLevel === "moderate").length

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Attendance Alerts</h2>
        <p className="text-muted-foreground">Monitor students with attendance concerns.</p>
      </div>

      {/* Alert Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold text-destructive">{criticalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <AlertCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Warning Alerts</p>
                <p className="text-2xl font-bold text-accent">{warningCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Bell className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Moderate Alerts</p>
                <p className="text-2xl font-bold text-secondary">{moderateCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <h3 className="font-medium text-foreground">Filter Alerts</h3>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Alert Level" />
              </SelectTrigger>
              <SelectContent>
                {alertLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const config = getAlertConfig(alert.alertLevel)
          const Icon = config.icon
          const classesNeeded = Math.ceil((alert.requiredAttendance * alert.totalClasses) / 100 - alert.classesAttended)

          return (
            <Card key={alert.id} className={cn("border-l-4", config.color)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-5 w-5", config.iconColor)} />
                    <div>
                      <h3 className="font-medium text-foreground">{alert.studentName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {alert.rollNo} • {alert.department} • {alert.year}
                      </p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs", config.badgeColor)}>{config.label}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Attendance Stats */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Attendance Details</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Current:</span>
                        <span className={cn("font-medium", config.iconColor)}>{alert.currentAttendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Required:</span>
                        <span className="font-medium text-foreground">{alert.requiredAttendance}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Classes:</span>
                        <span className="font-medium text-foreground">
                          {alert.classesAttended}/{alert.totalClasses}
                        </span>
                      </div>
                      {classesNeeded > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Need to attend:</span>
                          <span className="font-medium text-primary">{classesNeeded} more</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Activity */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Last Activity</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Last attended: {new Date(alert.lastAttended).toLocaleDateString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <TrendingDown className="h-4 w-4" />
                      <span>
                        {Math.floor((Date.now() - new Date(alert.lastAttended).getTime()) / (1000 * 60 * 60 * 24))} days
                        ago
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Actions</h4>
                    <div className="space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full justify-start bg-transparent"
                        onClick={() => handleSendReminder(alert.id, "student")}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email Student
                      </Button>

                      {alert.parentContact && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full justify-start bg-transparent"
                          onClick={() => handleSendReminder(alert.id, "parent")}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call Parent
                        </Button>
                      )}

                      <Button size="sm" variant="secondary" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No attendance alerts</h3>
              <p className="text-muted-foreground">
                All students are meeting attendance requirements or no alerts match your filters.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
