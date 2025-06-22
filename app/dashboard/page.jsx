"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useShipments } from "@/contexts/shipment-context";
import DashboardHeader from "@/components/dashboard-header";
import SearchFilters from "@/components/search-filters";
import ShipmentGrid from "@/components/shipment-grid";

export default function DashboardPage() {
  const { user } = useAuth();
  const { shipments } = useShipments();
  const [filteredShipments, setFilteredShipments] = useState(shipments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    let filtered = shipments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (shipment) =>
          shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          shipment.receiver.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (shipment) => shipment.status === statusFilter
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(
            (shipment) => new Date(shipment.shipmentDate) >= filterDate
          );
          break;
        case "week":
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(
            (shipment) => new Date(shipment.shipmentDate) >= filterDate
          );
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(
            (shipment) => new Date(shipment.shipmentDate) >= filterDate
          );
          break;
      }
    }

    setFilteredShipments(filtered);
  }, [searchTerm, statusFilter, dateFilter, shipments]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <DashboardHeader user={user} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Tremandics Shipping Management Dashboard
          </h2>
          <p className="text-gray-400 text-lg">
            Track & manage products across India
          </p>
        </div>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing{" "}
            <span className="text-blue-400 font-semibold">
              {filteredShipments.length}
            </span>{" "}
            of{" "}
            <span className="text-blue-400 font-semibold">
              {shipments.length}
            </span>{" "}
            shipments
          </p>
        </div>

        <ShipmentGrid shipments={filteredShipments} />
      </div>
    </div>
  );
}
