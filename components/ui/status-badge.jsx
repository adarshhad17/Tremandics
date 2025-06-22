import { Truck, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const statusConfig = {
  "In Transit": {
    icon: <Truck className="w-4 h-4" />,
    className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  Delivered: {
    icon: <CheckCircle className="w-4 h-4" />,
    className: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  Delayed: {
    icon: <AlertTriangle className="w-4 h-4" />,
    className: "bg-red-500/20 text-red-400 border-red-500/30",
  },
  Pending: {
    icon: <Clock className="w-4 h-4" />,
    className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },
}

export default function StatusBadge({ status, className = "" }) {
  const config = statusConfig[status] || statusConfig["Pending"]

  return (
    <Badge variant="outline" className={`flex items-center gap-1 px-3 py-1 ${config.className} ${className}`}>
      {config.icon}
      {status}
    </Badge>
  )
}
