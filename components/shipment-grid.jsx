"use client"

import { Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ShipmentCard from "./shipment-card"

export default function ShipmentGrid({ shipments }) {
  if (shipments.length === 0) {
    return (
      <Card className="text-center py-16 bg-gray-900/50 backdrop-blur-sm border-gray-800">
        <CardContent>
          <Package className="w-20 h-20 text-gray-600 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-3">No shipments found</h3>
          <p className="text-gray-400 text-lg">Try adjusting your search or filter criteria</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {shipments.map((shipment) => (
        <ShipmentCard key={shipment.id} shipment={shipment} />
      ))}
    </div>
  )
}
