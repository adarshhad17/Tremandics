"use client"
import { ChevronDown, Clock, Truck, CheckCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const statusOptions = [
  {
    value: "Pending",
    label: "Pending",
    icon: <Clock className="w-4 h-4" />,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    description: "Shipment is being processed",
  },
  {
    value: "In Transit",
    label: "In Transit",
    icon: <Truck className="w-4 h-4" />,
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    description: "Package is on its way",
  },
  {
    value: "Delivered",
    label: "Delivered",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    description: "Package has been delivered",
  },
  {
    value: "Delayed",
    label: "Delayed",
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    description: "Shipment has been delayed",
  },
]

const statusColors = {
  "In Transit": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  Delayed: "bg-red-500/20 text-red-400 border-red-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

const statusIcons = {
  "In Transit": <Truck className="w-4 h-4" />,
  Delivered: <CheckCircle className="w-4 h-4" />,
  Delayed: <AlertTriangle className="w-4 h-4" />,
  Pending: <Clock className="w-4 h-4" />,
}

export default function StatusSelector({
  currentStatus,
  onStatusChange,
  isUpdating = false,
  disabled = false,
  shipmentId = "",
}) {
  return (
    <div className="flex items-center gap-4">
      {/* Current Status Badge */}
      <Badge variant="outline" className={`flex items-center gap-2 px-4 py-2 text-sm ${statusColors[currentStatus]}`}>
        {statusIcons[currentStatus]}
        {currentStatus}
      </Badge>

      {/* Status Update Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isUpdating || disabled}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 min-w-[140px]"
          >
            {isUpdating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Updating...
              </>
            ) : (
              <>
                Update Status
                <ChevronDown className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-72 bg-gray-800/95 backdrop-blur-sm border-gray-700 shadow-2xl">
          <DropdownMenuLabel className="text-gray-300 font-semibold px-4 py-3 text-base">
            🚚 Select New Status
            {shipmentId && <div className="text-xs text-gray-500 font-normal mt-1">for shipment {shipmentId}</div>}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />

          <div className="p-2 space-y-1">
            {statusOptions.map((status) => {
              const isCurrentStatus = currentStatus === status.value
              const canUpdate = !isCurrentStatus && !isUpdating && !disabled

              return (
                <DropdownMenuItem
                  key={status.value}
                  onClick={() => canUpdate && onStatusChange(status.value)}
                  className={`
                    flex items-center gap-3 px-3 py-4 rounded-lg cursor-pointer transition-all duration-200
                    ${
                      isCurrentStatus
                        ? "bg-gray-700/50 border border-gray-600 cursor-not-allowed opacity-70"
                        : "hover:bg-gray-700/80 hover:scale-[1.01] active:scale-[0.99] border border-transparent hover:border-gray-600"
                    }
                    ${!canUpdate ? "pointer-events-none" : ""}
                  `}
                  disabled={!canUpdate}
                >
                  
                  <div className={`p-2.5 rounded-full ${status.bgColor} transition-all duration-200`}>
                    <span className={status.color}>{status.icon}</span>
                  </div>

                  {/* Status Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">{status.label}</span>
                      {isCurrentStatus && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-xs text-green-400 font-medium">Active</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{status.description}</p>
                  </div>

                  
                  {!isCurrentStatus && (
                    <div className="text-gray-500 group-hover:text-gray-300 transition-colors">
                      <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </div>
                  )}
                </DropdownMenuItem>
              )
            })}
          </div>

          <DropdownMenuSeparator className="bg-gray-700 my-2" />

          <div className="px-4 py-3 bg-gray-900/50">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <span>Status updates are automatically logged in tracking history</span>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
