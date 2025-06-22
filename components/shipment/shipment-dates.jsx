export default function ShipmentDates({ shipment }) {
  return (
    <div className="pt-3 border-t border-gray-700">
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Shipped</span>
        <span className="font-medium text-white">{new Date(shipment.shipmentDate).toLocaleDateString()}</span>
      </div>
      {shipment.estimatedDelivery && (
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="text-gray-400">Est. Delivery</span>
          <span className="font-medium text-blue-400">{new Date(shipment.estimatedDelivery).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  )
}
