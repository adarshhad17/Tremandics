"use client"

import { useState } from "react"
import { MoreVertical, Edit3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import StatusSelector from "./status-selector"

export default function QuickStatusUpdate({ shipment, onStatusUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false)
  const { toast } = useToast()

  const handleQuickUpdate = async (newStatus) => {
    setIsUpdating(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      onStatusUpdate(shipment.id, newStatus)

      toast({
        title: "Status Updated",
        description: `${shipment.id} is now ${newStatus}`,
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
        <DropdownMenuLabel className="text-gray-300">Quick Actions</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem className="text-white hover:bg-gray-700">
          <Edit3 className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <div className="p-2">
          <StatusSelector
            currentStatus={shipment.status}
            onStatusChange={handleQuickUpdate}
            isUpdating={isUpdating}
            shipmentId={shipment.id}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
