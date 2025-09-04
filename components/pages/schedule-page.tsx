"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClassSession {
  id: string
  subject: string
  class: string
  room: string
  time: string
  duration: number // in minutes
  students: number
  type: "lecture" | "lab" | "tutorial"
}

interface DaySchedule {
  day: string
  date: string
  classes: ClassSession[]
}

// Mock schedule data
const mockSchedule: DaySchedule[] = [
  {
    day: "Monday",
    date: "2024-01-15",
    classes: [
      {
        id: "1",
        subject: "Data Structures",
        class: "CS-3A",
        room: "Room 301",
        time: "09:00",
        duration: 60,
        students: 45,
        type: "lecture",
      },
      {
        id: "2",
        subject: "Database Systems",
        class: "CS-3B",
        room: "Lab 201",
        time: "11:00",
        duration: 120,
        students: 30,
        type: "lab",
      },
      {
        id: "3",
        subject: "Software Engineering",
        class: "CS-4A",
        room: "Room 205",
        time: "14:00",
        duration: 60,
        students: 38,
        type: "lecture",
      },
    ],
  },
  {
    day: "Tuesday",
    date: "2024-01-16",
    classes: [
      {
        id: "4",
        subject: "Computer Networks",
        class: "CS-3A",
        room: "Room 302",
        time: "10:00",
        duration: 60,
        students: 45,
        type: "lecture",
      },
      {
        id: "5",
        subject: "Web Development",
        class: "CS-2B",
        room: "Lab 101",
        time: "13:00",
        duration: 90,
        students: 25,
        type: "tutorial",
      },
    ],
  },
  {
    day: "Wednesday",
    date: "2024-01-17",
    classes: [
      {
        id: "6",
        subject: "Machine Learning",
        class: "CS-4B",
        room: "Room 401",
        time: "09:30",
        duration: 90,
        students: 32,
        type: "lecture",
      },
      {
        id: "7",
        subject: "Data Structures Lab",
        class: "CS-3A",
        room: "Lab 301",
        time: "11:30",
        duration: 120,
        students: 22,
        type: "lab",
      },
    ],
  },
  {
    day: "Thursday",
    date: "2024-01-18",
    classes: [
      {
        id: "8",
        subject: "Operating Systems",
        class: "CS-3B",
        room: "Room 203",
        time: "10:30",
        duration: 60,
        students: 40,
        type: "lecture",
      },
      {
        id: "9",
        subject: "Project Work",
        class: "CS-4A",
        room: "Lab 401",
        time: "14:30",
        duration: 120,
        students: 15,
        type: "tutorial",
      },
    ],
  },
  {
    day: "Friday",
    date: "2024-01-19",
    classes: [
      {
        id: "10",
        subject: "Algorithms",
        class: "CS-3A",
        room: "Room 301",
        time: "09:00",
        duration: 60,
        students: 45,
        type: "lecture",
      },
      {
        id: "11",
        subject: "System Design",
        class: "CS-4B",
        room: "Room 402",
        time: "11:00",
        duration: 90,
        students: 28,
        type: "lecture",
      },
    ],
  },
]

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

export function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(0)

  const getTypeColor = (type: ClassSession["type"]) => {
    switch (type) {
      case "lecture":
        return "bg-primary text-primary-foreground"
      case "lab":
        return "bg-accent text-accent-foreground"
      case "tutorial":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const formatTime = (time: string, duration: number) => {
    const [hours, minutes] = time.split(":").map(Number)
    const startTime = new Date()
    startTime.setHours(hours, minutes, 0, 0)

    const endTime = new Date(startTime.getTime() + duration * 60000)

    return `${time} - ${endTime.toTimeString().slice(0, 5)}`
  }

  const getCurrentWeekDates = () => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7)

    return mockSchedule.map((day, index) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + index)
      return {
        ...day,
        date: date.toISOString().split("T")[0],
      }
    })
  }

  const weekDates = getCurrentWeekDates()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Class Schedule</h2>
        <p className="text-muted-foreground">Weekly class timetable view.</p>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setCurrentWeek((prev) => prev - 1)}>
            <ChevronLeft className="h-4 w-4" />
            Previous Week
          </Button>

          <div className="text-sm font-medium text-foreground">
            Week of{" "}
            {new Date(weekDates[0].date).toLocaleDateString("en-IN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <Button variant="outline" size="sm" onClick={() => setCurrentWeek((prev) => prev + 1)}>
            Next Week
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="secondary" size="sm" onClick={() => setCurrentWeek(0)}>
          Current Week
        </Button>
      </div>

      {/* Schedule Grid */}
      <div className="grid gap-4 lg:grid-cols-5">
        {weekDates.map((daySchedule) => (
          <Card key={daySchedule.day} className="h-fit">
            <CardHeader className="pb-3">
              <div className="text-center">
                <h3 className="font-semibold text-foreground">{daySchedule.day}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(daySchedule.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                {daySchedule.classes.length > 0 ? (
                  daySchedule.classes.map((classSession) => (
                    <Card key={classSession.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm text-foreground leading-tight">
                              {classSession.subject}
                            </h4>
                            <Badge variant="secondary" className={cn("text-xs", getTypeColor(classSession.type))}>
                              {classSession.type}
                            </Badge>
                          </div>

                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(classSession.time, classSession.duration)}
                            </div>

                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {classSession.room}
                            </div>

                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {classSession.class} ({classSession.students} students)
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No classes scheduled</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Classes</p>
                <p className="text-xl font-bold text-foreground">
                  {weekDates.reduce((total, day) => total + day.classes.length, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-xl font-bold text-foreground">
                  {weekDates.reduce(
                    (total, day) => total + day.classes.reduce((dayTotal, cls) => dayTotal + cls.students, 0),
                    0,
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <MapPin className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Rooms</p>
                <p className="text-xl font-bold text-foreground">
                  {new Set(weekDates.flatMap((day) => day.classes.map((cls) => cls.room))).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
