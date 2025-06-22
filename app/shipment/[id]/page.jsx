"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Package, User, MapPin, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useShipments } from "@/contexts/shipment-context";
import StatusSelector from "@/components/status-selector";

export default function ShipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { getShipmentById, updateShipmentStatus } = useShipments();
  const [isUpdating, setIsUpdating] = useState(false);

  const shipment = getShipmentById(params.id);

  const [editedShipmentDate, setEditedShipmentDate] = useState(
    shipment?.shipmentDate || ""
  );
  const [editedEstimatedDelivery, setEditedEstimatedDelivery] = useState(
    shipment?.estimatedDelivery || ""
  );
  const [editedTrackingHistory, setEditedTrackingHistory] = useState([
    ...(shipment?.trackingHistory || []),
  ]);

  if (!shipment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <Card className="text-center p-8 bg-gray-900/80 backdrop-blur-xl border-gray-800">
          <CardContent>
            <Package className="w-20 h-20 text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Shipment Not Found
            </h2>
            <p className="text-gray-400 mb-6">
              The shipment you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === shipment.status) {
      toast({
        title: "No Change Required",
        description: `Shipment is already ${shipment.status}`,
      });
      return;
    }

    setIsUpdating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      updateShipmentStatus(shipment.id, newStatus);
      toast({
        title: "✅ Status Updated",
        description: `Shipment updated to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "❌ Failed",
        description: "Status update failed.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveDates = () => {
    shipment.shipmentDate = editedShipmentDate;
    shipment.estimatedDelivery = editedEstimatedDelivery;
    shipment.trackingHistory = editedTrackingHistory;
    toast({
      title: "✅ Dates Updated",
      description: "Shipment and tracking dates updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-6 text-gray-300 hover:text-white hover:bg-gray-800 border border-orange-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Shipment Details
              </h1>
              <p className="text-gray-400 text-lg">
                Tracking ID:{" "}
                <span className="text-blue-400 font-semibold">
                  {shipment.id}
                </span>
              </p>
            </div>

            <StatusSelector
              currentStatus={shipment.status}
              onStatusChange={handleStatusUpdate}
              isUpdating={isUpdating}
              shipmentId={shipment.id}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipment Overview */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Package className="w-5 h-5 text-blue-400" />
                  Shipment Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Sender Info */}
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-400" /> Sender
                        Information
                      </h4>
                      <div className="space-y-2 text-sm text-white">
                        <p>{shipment.sender.name}</p>
                        <p className="text-gray-400">{shipment.sender.email}</p>
                        <p className="text-gray-400">{shipment.sender.phone}</p>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-400" /> Origin
                      </h4>
                      <p className="text-gray-300">{shipment.origin}</p>
                    </div>
                  </div>

                  {/* Receiver Info */}
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-purple-400" /> Receiver
                        Information
                      </h4>
                      <div className="space-y-2 text-sm text-white">
                        <p>{shipment.receiver.name}</p>
                        <p className="text-gray-400">
                          {shipment.receiver.email}
                        </p>
                        <p className="text-gray-400">
                          {shipment.receiver.phone}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-400" /> Destination
                      </h4>
                      <p className="text-gray-300">{shipment.destination}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center bg-gray-800/30 rounded-lg p-4">
                    <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <p className="font-medium text-white">Shipment Date</p>
                    <input
                      type="date"
                      value={
                        new Date(editedShipmentDate).toISOString().split("T")[0]
                      }
                      onChange={(e) =>
                        setEditedShipmentDate(
                          new Date(e.target.value).toISOString()
                        )
                      }
                      className="mt-1 bg-gray-700 text-white px-2 py-1 rounded"
                    />
                  </div>

                  <div className="text-center bg-gray-800/30 rounded-lg p-4">
                    <Calendar className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="font-medium text-white">Est. Delivery</p>
                    <input
                      type="date"
                      value={
                        new Date(editedEstimatedDelivery)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) =>
                        setEditedEstimatedDelivery(
                          new Date(e.target.value).toISOString()
                        )
                      }
                      className="mt-1 bg-gray-700 text-white px-2 py-1 rounded"
                    />
                  </div>

                  <div className="text-center bg-gray-800/30 rounded-lg p-4">
                    <Package className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <p className="font-medium text-white">Weight</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {shipment.weight}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleSaveDates}
                  className="mt-4 bg-blue-600 hover:bg-green-500 text-white font-semibold"
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Package Details */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Package Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="font-medium text-white mb-2">Dimensions</p>
                    <p className="text-gray-400">{shipment.dimensions}</p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="font-medium text-white mb-2">Service Type</p>
                    <p className="text-gray-400">{shipment.serviceType}</p>
                  </div>
                </div>

                {shipment.description && (
                  <div className="bg-gray-800/30 rounded-lg p-4">
                    <p className="font-medium text-white mb-2">Description</p>
                    <p className="text-gray-400">{shipment.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Tracking History */}
          <div>
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Tracking History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {editedTrackingHistory.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            index === 0
                              ? "bg-green-500 shadow-lg shadow-blue-500/50"
                              : "bg-gray-600"
                          }`}
                        />
                        {index < shipment.trackingHistory.length - 1 && (
                          <div className="w-px h-12 bg-gray-700 mt-2" />
                        )}
                      </div>

                      <div className="flex-1 pb-6">
                        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-white text-sm">
                              {event.status}
                            </p>
                            <input
                              type="date"
                              value={
                                new Date(event.timestamp)
                                  .toISOString()
                                  .split("T")[0]
                              }
                              onChange={(e) => {
                                const updated = [...editedTrackingHistory];
                                updated[index].timestamp = new Date(
                                  e.target.value
                                ).toISOString();
                                setEditedTrackingHistory(updated);
                              }}
                              className="bg-slate-400 text-white text-xs px-2 py-0.5 rounded"
                            />
                          </div>
                          <p className="text-xs text-gray-400 mb-1">
                            {event.location}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
