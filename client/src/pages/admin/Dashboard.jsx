import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, Clock, DollarSign, BedDouble, DoorOpen } from "lucide-react";
import { fetchDashboardStats } from "../../api/bookings";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/dateHelpers";
import { Topbar } from "../../components/admin/Topbar";
import { StatCard } from "../../components/ui/StatCard";
import { DataTable } from "../../components/admin/DataTable";
import { PageLoader } from "../../components/ui/PageLoader";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  const { config } = useHotelConfig();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Topbar title="Overview" />

      <div className="p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total Bookings" value={stats.totalBookings} icon={CalendarCheck} />
          <StatCard label="Pending" value={stats.pendingCount} icon={Clock} />
          <StatCard
            label="Total Revenue"
            value={formatCurrency(stats.totalRevenue, config.bookingRules?.currency)}
            icon={DollarSign}
            accent
          />
          <StatCard label="Active Room Types" value={stats.activeRooms} icon={BedDouble} />
          <StatCard label="Total Rooms" value={stats.totalRoomUnits} icon={DoorOpen} />
        </div>

        <div className="mt-10">
          <h2 className="mb-5 font-display text-xl text-ink">Recent Bookings</h2>
          <DataTable
            columns={[
              { key: "confirmationCode", label: "Code" },
              { key: "guest", label: "Guest", render: (r) => r.guestDetails?.fullName },
              { key: "room", label: "Room", render: (r) => r.room?.name },
              { key: "checkIn", label: "Check In", render: (r) => formatDate(r.checkIn) },
              { key: "checkOut", label: "Check Out", render: (r) => formatDate(r.checkOut) },
              {
                key: "totalPrice",
                label: "Total",
                render: (r) => formatCurrency(r.totalPrice, r.currency),
              },
              {
                key: "status",
                label: "Status",
                render: (r) => (
                  <span className={`rounded-full px-2.5 py-1 text-xs capitalize ${statusStyles[r.status]}`}>
                    {r.status}
                  </span>
                ),
              },
            ]}
            rows={stats.recentBookings}
          />
        </div>
      </div>
    </>
  );
}
