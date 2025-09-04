"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { ApprovalsPage } from "@/components/pages/approvals-page"
import { SchedulePage } from "@/components/pages/schedule-page"
import { StudentsPage } from "@/components/pages/students-page"
import { AlertsPage } from "@/components/pages/alerts-page"

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("approvals")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (activeSection) {
      case "approvals":
        return <ApprovalsPage />
      case "schedule":
        return <SchedulePage />
      case "students":
        return <StudentsPage />
      case "alerts":
        return <AlertsPage />
      default:
        return <ApprovalsPage />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="lg:ml-64 pt-16">
        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  )
}
