import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Search, Eye, Pencil } from "lucide-react";

const mockGames = Array.from({ length: 20 }, (_, i) => ({
  id: `G-${1000 + i}`,
  name: `Bingo ${["Blitz", "Bonanza", "Royale", "Classic", "Turbo"][i % 5]}`,
  status: ["Active", "Scheduled", "Completed"][i % 3],
  players: Math.floor(Math.random() * 200) + 10,
  prize: `$${(Math.floor(Math.random() * 50) + 5) * 100}`,
  startTime: new Date(Date.now() - i * 3600000).toLocaleString(),
}));

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = mockGames.filter(
    (g) =>
      (statusFilter === "All" || g.status === statusFilter) &&
      (g.name.toLowerCase().includes(search.toLowerCase()) || g.id.includes(search))
  );

  return (
    <>
      <AdminHeader title="Game Management" />
      <main className="flex-1 space-y-4 p-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search games..." className="pl-9 bg-card" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          {["All", "Active", "Scheduled", "Completed"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-xl border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Game ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Players</th>
                <th className="px-5 py-3">Prize Pool</th>
                <th className="px-5 py-3">Start Time</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((g) => (
                <tr key={g.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{g.id}</td>
                  <td className="px-5 py-3 font-medium">{g.name}</td>
                  <td className="px-5 py-3"><StatusBadge status={g.status} /></td>
                  <td className="px-5 py-3">{g.players}</td>
                  <td className="px-5 py-3 font-semibold">{g.prize}</td>
                  <td className="px-5 py-3 text-muted-foreground">{g.startTime}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-md p-1.5 transition-colors hover:bg-primary/10 hover:text-primary"><Eye className="h-4 w-4" /></button>
                      <button className="rounded-md p-1.5 transition-colors hover:bg-primary/10 hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
