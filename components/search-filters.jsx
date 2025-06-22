"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}) {
  return (
    <Card className="mb-8 bg-gray-900/50 backdrop-blur-sm border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Filter className="w-5 h-5 text-blue-400" />
          Search & Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by Shipment ID or Receiver Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-700">
                All Statuses
              </SelectItem>
              <SelectItem value="In Transit" className="text-white hover:bg-gray-700">
                In Transit
              </SelectItem>
              <SelectItem value="Delivered" className="text-white hover:bg-gray-700">
                Delivered
              </SelectItem>
              <SelectItem value="Delayed" className="text-white hover:bg-gray-700">
                Delayed
              </SelectItem>
              <SelectItem value="Pending" className="text-white hover:bg-gray-700">
                Pending
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
              <SelectValue placeholder="Filter by Date" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all" className="text-white hover:bg-gray-700">
                All Dates
              </SelectItem>
              <SelectItem value="today" className="text-white hover:bg-gray-700">
                Today
              </SelectItem>
              <SelectItem value="week" className="text-white hover:bg-gray-700">
                Last Week
              </SelectItem>
              <SelectItem value="month" className="text-white hover:bg-gray-700">
                Last Month
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
