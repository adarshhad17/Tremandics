"use client";

import { useState } from "react";
import {
  MoreVertical,
  Clock,
  Truck,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useShipments } from "@/contexts/shipment-context";

const statusOptions = [
  {
    value: "Pending",
    label: "Pending",
    icon: <Clock className="w-4 h-4" />,
    color: "text-yellow-400",
    description: "Order is being processed",
  },
  {
    value: "In Transit",
    label: "In Transit",
    icon: <Truck className="w-4 h-4" />,
    color: "text-blue-400",
    description: "Package is on its way",
  },
  {
    value: "Delivered",
    label: "Delivered",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-400",
    description: "Package has been delivered",
  },
  {
    value: "Delayed",
    label: "Delayed",
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "text-red-400",
    description: "Shipment has been delayed",
  },
];

export default function StatusUpdateDropdown({ shipmentId, currentStatus }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const { updateShipmentStatus } = useShipments();

  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === currentStatus) {
      toast({
        title: "No Change",
        description: `Shipment is already ${currentStatus}`,
      });
      return;
    }

    setIsUpdating(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Update the shipment status in context
      updateShipmentStatus(shipmentId, newStatus);

      toast({
        title: "✅ Status Updated Successfully",
        description: `${shipmentId} is now ${newStatus}`,
      });

      console.log(`Updated ${shipmentId} to ${newStatus}`);
    } catch (error) {
      toast({
        title: "❌ Update Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
          disabled={isUpdating}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {isUpdating ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <MoreVertical className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64 bg-gray-800/95 backdrop-blur-sm border-gray-700"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <DropdownMenuLabel className="text-gray-300 font-semibold">
          Update Status
          <div className="text-xs text-gray-500 font-normal mt-1">
            {shipmentId}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700" />

        {statusOptions.map((status) => {
          const isCurrentStatus = currentStatus === status.value;

          return (
            <DropdownMenuItem
              key={status.value}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isCurrentStatus && !isUpdating) {
                  handleStatusUpdate(status.value);
                }
              }}
              className={`
                flex items-center gap-3 px-3 py-3 cursor-pointer transition-all
                ${
                  isCurrentStatus
                    ? "bg-gray-700/50 cursor-not-allowed opacity-70"
                    : "hover:bg-gray-700 text-white focus:bg-gray-700"
                }
              `}
              disabled={isCurrentStatus || isUpdating}
            >
              <span className={status.color}>{status.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{status.label}</span>
                  {isCurrentStatus && (
                    <span className="text-xs text-green-400 font-medium">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {status.description}
                </p>
              </div>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator className="bg-gray-700 my-2" />
        <div className="px-3 py-2 bg-gray-900/50">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            <span>Status updates are logged automatically</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
