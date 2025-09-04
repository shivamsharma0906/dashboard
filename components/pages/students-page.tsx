"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Download, User, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface Student {
  id: string
  name: string
  rollNo: string
  email: string
  phone: string
  department: string
  year: string
  status: "active" | "inactive" | "graduated"
  attendance: number
  joiningDate: string
}

// Mock student data
const mockStudents: Student[] = [
  {
    id: "1",
    name: "Arjun Sharma",
    rollNo: "CS2021001",
    email: "arjun.sharma@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science",
    year: "3rd Year",
    status: "active",
    attendance: 92,
    joiningDate: "2021-08-15",
  },
  {
    id: "2",
    name: "Priya Patel",
    rollNo: "EC2022045",
    email: "priya.patel@college.edu",
    phone: "+91 87654 32109",
    department: "Electronics",
    year: "2nd Year",
    status: "active",
    attendance: 88,
    joiningDate: "2022-08-20",
  },
  {
    id: "3",
    name: "Rahul Kumar",
    rollNo: "ME2021078",
    email: "rahul.kumar@college.edu",
    phone: "+91 76543 21098",
    department: "Mechanical",
    year: "3rd Year",
    status: "active",
    attendance: 76,
    joiningDate: "2021-08-18",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    rollNo: "CS2023012",
    email: "sneha.gupta@college.edu",
    phone: "+91 65432 10987",
    department: "Computer Science",
    year: "1st Year",
    status: "active",
    attendance: 95,
    joiningDate: "2023-08-25",
  },
  {
    id: "5",
    name: "Vikram Singh",
    rollNo: "EE2022033",
    email: "vikram.singh@college.edu",
    phone: "+91 54321 09876",
    department: "Electrical",
    year: "2nd Year",
    status: "active",
    attendance: 82,
    joiningDate: "2022-08-22",
  },
  {
    id: "6",
    name: "Anita Desai",
    rollNo: "CS2020089",
    email: "anita.desai@college.edu",
    phone: "+91 43210 98765",
    department: "Computer Science",
    year: "4th Year",
    status: "graduated",
    attendance: 89,
    joiningDate: "2020-08-10",
  },
  {
    id: "7",
    name: "Ravi Mehta",
    rollNo: "ME2022056",
    email: "ravi.mehta@college.edu",
    phone: "+91 32109 87654",
    department: "Mechanical",
    year: "2nd Year",
    status: "inactive",
    attendance: 45,
    joiningDate: "2022-08-15",
  },
  {
    id: "8",
    name: "Kavya Nair",
    rollNo: "EC2021067",
    email: "kavya.nair@college.edu",
    phone: "+91 21098 76543",
    department: "Electronics",
    year: "3rd Year",
    status: "active",
    attendance: 91,
    joiningDate: "2021-08-12",
  },
]

const departments = ["All Departments", "Computer Science", "Electronics", "Mechanical", "Electrical"]
const years = ["All Years", "1st Year", "2nd Year", "3rd Year", "4th Year"]
const statuses = ["All Status", "active", "inactive", "graduated"]

export function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedYear, setSelectedYear] = useState("All Years")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [viewMode, setViewMode] = useState<"table" | "cards">("table")

  const filteredStudents = useMemo(() => {
    return mockStudents.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment = selectedDepartment === "All Departments" || student.department === selectedDepartment
      const matchesYear = selectedYear === "All Years" || student.year === selectedYear
      const matchesStatus = selectedStatus === "All Status" || student.status === selectedStatus

      return matchesSearch && matchesDepartment && matchesYear && matchesStatus
    })
  }, [searchTerm, selectedDepartment, selectedYear, selectedStatus])

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground"
      case "inactive":
        return "bg-destructive text-destructive-foreground"
      case "graduated":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-primary"
    if (attendance >= 75) return "text-accent"
    return "text-destructive"
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Student List</h2>
        <p className="text-muted-foreground">Manage student information and records.</p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium text-foreground">Filters</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                Table View
              </Button>
              <Button
                variant={viewMode === "cards" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("cards")}
              >
                Card View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

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

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          Showing {filteredStudents.length} of {mockStudents.length} students
        </p>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Table View */}
      {viewMode === "table" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-full">
                          <User className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{student.rollNo}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <span className={cn("font-medium", getAttendanceColor(student.attendance))}>
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn("text-xs", getStatusColor(student.status))}>{student.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Card View */}
      {viewMode === "cards" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{student.name}</h3>
                      <p className="text-sm text-muted-foreground font-mono">{student.rollNo}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-xs", getStatusColor(student.status))}>{student.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Department</p>
                      <p className="font-medium text-foreground">{student.department}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Year</p>
                      <p className="font-medium text-foreground">{student.year}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">Attendance</p>
                    <p className={cn("font-bold text-lg", getAttendanceColor(student.attendance))}>
                      {student.attendance}%
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Mail className="h-3 w-3" />
                      {student.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {student.phone}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
