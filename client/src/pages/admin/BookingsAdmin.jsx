import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchBookings, updateBookingStatus } from "../../api/bookings";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/dateHelpers";
import { Topbar } from "../../components/admin/Topbar";
import { DataTable } from "../../components/admin/DataTable";
import { PageLoader } from "../../components/ui/PageLoader";

const statusOptions = ["pending", "confirmed", "cancelled"];

export default function BookingsAdmin() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings", status],
    queryFn: () => fetchBookings(status ? { status } : {}),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status: newStatus }) => updateBookingStatus(id, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });

  if (isLoading) return <PageLoader />;

  const bookings = data?.data || [];

  return (
    <>
      <Topbar title="Bookings" />

      <div className="p-8">
        <div className="mb-6 flex gap-2">
          {["", ...statusOptions].map((s) => (
            <button
              key={s || "all"}
              onClick={() => setStatus(s)}
              className={`rounded-full px-4 py-1.5 text-xs capitalize transition-colors ${
                status === s ? "bg-ink text-warm-white" : "bg-ink/5 text-stone hover:bg-ink/10"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>

        <DataTable
          columns={[
            { key: "confirmationCode", label: "Code" },
            { key: "guest", label: "Guest", render: (r) => r.guestDetails?.fullName },
            { key: "email", label: "Email", render: (r) => r.guestDetails?.email },
            { key: "room", label: "Room", render: (r) => r.room?.name },
            { key: "checkIn", label: "Check In", render: (r) => formatDate(r.checkIn) },
            { key: "checkOut", label: "Check Out", render: (r) => formatDate(r.checkOut) },
            { key: "total", label: "Total", render: (r) => formatCurrency(r.totalPrice, r.currency) },
            {
              key: "status",
              label: "Status",
              render: (r) => (
                <select
                  value={r.status}
                  onChange={(e) => statusMutation.mutate({ id: r._id, status: e.target.value })}
                  className="rounded-lg border border-ink/10 px-2 py-1 text-xs capitalize"
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              ),
            },
          ]}
          rows={bookings}
        />
      </div>
    </>
  );
}
