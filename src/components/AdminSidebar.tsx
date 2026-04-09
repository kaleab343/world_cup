import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Gamepad2,
  Wallet,
  DoorOpen,
  LogOut,
  CircleDot,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Games", path: "/games", icon: Gamepad2 },
  { title: "Withdrawals", path: "/withdrawals", icon: Wallet, badge: 5 },
  { title: "Rooms", path: "/rooms", icon: DoorOpen },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[280px] flex-col bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))]">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-[hsl(var(--sidebar-border))]">
        <CircleDot className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold tracking-tight text-primary-foreground">
          Bingo<span className="text-primary">Admin</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "hover:bg-[hsl(var(--sidebar-hover))]"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.title}</span>
              {item.badge && (
                <span className="pulse-badge ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-bold text-destructive-foreground">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[hsl(var(--sidebar-border))] p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-[hsl(var(--sidebar-hover))] hover:text-destructive">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
