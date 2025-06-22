"use client"

import { createContext, useContext, useState } from "react"
import { shipments as initialShipments } from "@/data/mock-shipments"

const ShipmentContext = createContext()

export function ShipmentProvider({ children }) {
  const [shipments, setShipments] = useState(initialShipments)

  const updateShipmentStatus = (shipmentId, newStatus) => {
    setShipments((prev) =>
      prev.map((shipment) => (shipment.id === shipmentId ? { ...shipment, status: newStatus } : shipment)),
    )
  }

  const getShipmentById = (id) => {
    return shipments.find((shipment) => shipment.id === id)
  }

  const value = {
    shipments,
    updateShipmentStatus,
    getShipmentById,
  }

  return <ShipmentContext.Provider value={value}>{children}</ShipmentContext.Provider>
}

export function useShipments() {
  const context = useContext(ShipmentContext)
  if (!context) {
    throw new Error("useShipments must be used within a ShipmentProvider")
  }
  return context
}
