import AdminHeader from "@/components/AdminHeader";
import MetricCard from "@/components/MetricCard";
import StatusBadge from "@/components/StatusBadge";
import { Gamepad2, Users, Wallet, CreditCard, Activity } from "lucide-react";

const recentActivity = [
  { id: 1, action: "Game #1042 started", time: "2 min ago", type: "game" },
  { id: 2, action: "Withdrawal #892 approved — $150", time: "8 min ago", type: "withdrawal" },
  { id: 3, action: "New user registered: john_doe", time: "15 min ago", type: "user" },
  { id: 4, action: "Room 'VIP Lounge' created", time: "32 min ago", type: "room" },
  { id: 5, action: "Game #1041 completed — Winner: alice_w", time: "1 hr ago", type: "game" },
];

export default function DashboardPage() {
  return (
    <>
      <AdminHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-6">
        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard title="Active Games" value={12} change="+3 today" icon={Gamepad2} accent="primary" />
          <MetricCard title="Total Users" value="4,821" change="+48 this week" icon={Users} accent="success" />
          <MetricCard title="Pending Withdrawals" value={5} icon={Wallet} accent="warning" />
          <MetricCard title="Cards in Play" value="1,204" icon={CreditCard} accent="destructive" />
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b px-5 py-4">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold">Recent Activity</h2>
          </div>
          <ul className="divide-y">
            {recentActivity.map((a) => (
              <li key={a.id} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-muted/50">
                <span className="text-sm">{a.action}</span>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
