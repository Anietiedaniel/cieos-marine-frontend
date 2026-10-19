import { useState } from "react"
import complianceData from "../dashboards/ManagerDashboard/tabs/Complaince/complianceData"

export const useCompliance = () => {

  const [documents, setDocuments] = useState(complianceData)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [page, setPage] = useState(1)

  const perPage = 6

  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  )

  const start = (page - 1) * perPage

  const paginatedDocs =
    filteredDocs.slice(start, start + perPage)

  const addDocument = (doc) => {
    setDocuments([...documents, doc])
  }

  return {
    documents,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    perPage,
    filteredDocs,
    paginatedDocs,
    addDocument
  }
}