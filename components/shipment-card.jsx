"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StatusBadge from "@/components/ui/status-badge"
import ProgressBar from "@/components/ui/progress-bar"
import ShipmentInfo from "@/components/shipment/shipment-info"
import ShipmentDates from "@/components/shipment/shipment-dates"
import StatusUpdateDropdown from "@/components/status-update-dropdown"
import { useShipments } from "@/contexts/shipment-context"

export default function ShipmentCard({ shipment: initialShipment }) {
  const { getShipmentById } = useShipments()

  
  const shipment = getShipmentById(initialShipment.id) || initialShipment

  return (
    <Card className="hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border-gray-700 hover:border-blue-500/50 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Link href={`/shipment/${shipment.id}`}>
            <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors cursor-pointer">
              {shipment.id}
            </CardTitle>
          </Link>
          <div className="flex items-center gap-2">
            <StatusBadge status={shipment.status} />
            <StatusUpdateDropdown shipmentId={shipment.id} currentStatus={shipment.status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Link href={`/shipment/${shipment.id}`} className="block">
          <ShipmentInfo shipment={shipment} />
          <ShipmentDates shipment={shipment} />
          <ProgressBar status={shipment.status} className="mt-3" />
        </Link>
      </CardContent>
    </Card>
  )
}
