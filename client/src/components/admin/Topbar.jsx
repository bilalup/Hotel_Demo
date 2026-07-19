import { useAuth } from "../../context/AuthContext";

export function Topbar({ title }) {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between border-b border-ink/10 bg-white px-8 py-5">
      <h1 className="font-display text-2xl text-ink">{title}</h1>
      {user && (
        <div className="text-right">
          <p className="text-sm font-medium text-ink">{user.name}</p>
          <p className="text-xs capitalize text-stone">{user.role}</p>
        </div>
      )}
    </div>
  );
}
