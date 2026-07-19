import { NavLink } from "react-router-dom";
import { LayoutDashboard, BedDouble, CalendarCheck, Users, Settings, LogOut } from "lucide-react";
import clsx from "clsx";
import { useHotelConfig } from "../../context/HotelConfigContext";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/users", label: "Users", icon: Users, adminOnly: true },
  { to: "/admin/settings", label: "Hotel Settings", icon: Settings, adminOnly: true },
];

export function Sidebar() {
  const { config } = useHotelConfig();
  const { logout, user } = useAuth();
  const visibleLinks = links.filter((link) => !link.adminOnly || user?.role === "admin");

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-ink/10 bg-ink text-warm-white">
      <div className="px-7 py-8">
        <p className="font-display text-lg">{config.hotelName}</p>
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Admin Console</p>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {visibleLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive ? "bg-gold/10 text-gold" : "text-warm-white/70 hover:bg-white/5 hover:text-warm-white"
              )
            }
          >
            <Icon className="h-4 w-4" strokeWidth={1.5} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="mx-4 mb-8 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-warm-white/70 transition-colors hover:bg-white/5 hover:text-warm-white"
      >
        <LogOut className="h-4 w-4" strokeWidth={1.5} />
        Log Out
      </button>
    </aside>
  );
}
