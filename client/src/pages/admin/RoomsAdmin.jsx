import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { fetchRooms, createRoom, updateRoom, deleteRoom } from "../../api/rooms";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { Topbar } from "../../components/admin/Topbar";
import { DataTable } from "../../components/admin/DataTable";
import { RoomForm } from "../../components/admin/RoomForm";
import { Button } from "../../components/ui/Button";
import { PageLoader } from "../../components/ui/PageLoader";

export default function RoomsAdmin() {
  const { config } = useHotelConfig();
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["admin-rooms"],
    queryFn: () => fetchRooms({ includeInactive: true }),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-rooms"] });
    queryClient.invalidateQueries({ queryKey: ["rooms"] });
  };

  const createMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      invalidate();
      setFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateRoom(id, payload),
    onSuccess: () => {
      invalidate();
      setFormOpen(false);
      setEditingRoom(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: invalidate,
  });

  function handleSubmit(payload) {
    if (editingRoom) {
      updateMutation.mutate({ id: editingRoom._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  function handleDelete(room) {
    if (confirm(`Delete "${room.name}"? This cannot be undone.`)) {
      deleteMutation.mutate(room._id);
    }
  }

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Topbar title="Rooms" />

      <div className="p-8">
        <div className="mb-6 flex justify-end">
          <Button
            variant="primary"
            onClick={() => {
              setEditingRoom(null);
              setFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> New Room
          </Button>
        </div>

        <DataTable
          columns={[
            {
              key: "name",
              label: "Room",
              render: (r) => (
                <div className="flex items-center gap-3">
                  <img src={r.images?.[0]} alt="" className="h-10 w-12 rounded object-cover" />
                  <span>{r.name}</span>
                </div>
              ),
            },
            { key: "type", label: "Type" },
            { key: "price", label: "Price", render: (r) => formatCurrency(r.pricePerNight, config.bookingRules?.currency) },
            { key: "maxGuests", label: "Guests" },
            { key: "totalRooms", label: "Units" },
            {
              key: "isActive",
              label: "Status",
              render: (r) => (
                <span className={`rounded-full px-2.5 py-1 text-xs ${r.isActive ? "bg-green-100 text-green-700" : "bg-stone/10 text-stone"}`}>
                  {r.isActive ? "Active" : "Inactive"}
                </span>
              ),
            },
            {
              key: "actions",
              label: "",
              render: (r) => (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setEditingRoom(r);
                      setFormOpen(true);
                    }}
                    aria-label="Edit"
                    className="text-stone hover:text-ink"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(r)} aria-label="Delete" className="text-stone hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ),
            },
          ]}
          rows={rooms}
        />
      </div>

      {formOpen && (
        <RoomForm
          initialRoom={editingRoom}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </>
  );
}
