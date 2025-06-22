export default function ShipmentInfo({ shipment }) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="space-y-1">
        <p className="font-medium text-gray-300">From</p>
        <p className="text-white font-semibold">{shipment.sender.name}</p>
        <p className="text-gray-400 text-xs">{shipment.origin}</p>
      </div>
      <div className="space-y-1">
        <p className="font-medium text-gray-300">To</p>
        <p className="text-white font-semibold">{shipment.receiver.name}</p>
        <p className="text-gray-400 text-xs">{shipment.destination}</p>
      </div>
    </div>
  )
}
