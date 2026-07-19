import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, updateUserRole } from "../../api/users";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/dateHelpers";
import { Topbar } from "../../components/admin/Topbar";
import { DataTable } from "../../components/admin/DataTable";
import { PageLoader } from "../../components/ui/PageLoader";

const roleOptions = ["staff", "admin"];

export default function UsersAdmin() {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) => updateUserRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  if (isLoading) return <PageLoader />;

  return (
    <>
      <Topbar title="Users" />

      <div className="p-8">
        <p className="mb-6 max-w-xl text-sm text-stone">
          Anyone can create an account from the login screen. Promote a user to <strong>admin</strong> to give
          them full access to this dashboard, or demote them back to <strong>staff</strong> at any time.
        </p>

        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "createdAt", label: "Joined", render: (r) => formatDate(r.createdAt) },
            {
              key: "role",
              label: "Role",
              render: (r) =>
                r._id === currentUser?.id ? (
                  <span className="rounded-full bg-ink/5 px-2.5 py-1 text-xs capitalize text-stone">
                    {r.role} (you)
                  </span>
                ) : (
                  <select
                    value={r.role}
                    onChange={(e) => roleMutation.mutate({ id: r._id, role: e.target.value })}
                    className="rounded-lg border border-ink/10 px-2 py-1 text-xs capitalize"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                ),
            },
          ]}
          rows={users}
        />
      </div>
    </>
  );
}
