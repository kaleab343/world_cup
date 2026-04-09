import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Room {
  id: string;
  name: string;
  capacity: number;
  activeGames: number;
  status: string;
}

const initialRooms: Room[] = [
  { id: "R-001", name: "Main Hall", capacity: 500, activeGames: 3, status: "Active" },
  { id: "R-002", name: "VIP Lounge", capacity: 50, activeGames: 1, status: "Active" },
  { id: "R-003", name: "Turbo Arena", capacity: 200, activeGames: 0, status: "Inactive" },
  { id: "R-004", name: "Jackpot Room", capacity: 100, activeGames: 2, status: "Active" },
  { id: "R-005", name: "Beginner Zone", capacity: 300, activeGames: 1, status: "Active" },
];

export default function RoomsPage() {
  const [rooms, setRooms] = useState(initialRooms);
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({ name: "", capacity: "" });

  const openNew = () => {
    setIsNew(true);
    setForm({ name: "", capacity: "" });
    setEditRoom({ id: "", name: "", capacity: 0, activeGames: 0, status: "Active" });
  };

  const openEdit = (r: Room) => {
    setIsNew(false);
    setForm({ name: r.name, capacity: String(r.capacity) });
    setEditRoom(r);
  };

  const save = () => {
    if (!form.name || !form.capacity) return;
    if (isNew) {
      setRooms((prev) => [
        ...prev,
        { id: `R-${String(prev.length + 1).padStart(3, "0")}`, name: form.name, capacity: Number(form.capacity), activeGames: 0, status: "Active" },
      ]);
    } else if (editRoom) {
      setRooms((prev) => prev.map((r) => (r.id === editRoom.id ? { ...r, name: form.name, capacity: Number(form.capacity) } : r)));
    }
    setEditRoom(null);
  };

  const deleteRoom = (id: string) => setRooms((prev) => prev.filter((r) => r.id !== id));

  return (
    <>
      <AdminHeader title="Room Management" />
      <main className="flex-1 space-y-4 p-6">
        <div className="flex justify-end">
          <Button onClick={openNew}><Plus className="mr-2 h-4 w-4" /> Create Room</Button>
        </div>
        <div className="overflow-auto rounded-xl border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Room ID</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Capacity</th>
                <th className="px-5 py-3">Active Games</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {rooms.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-5 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3">{r.capacity}</td>
                  <td className="px-5 py-3">{r.activeGames}</td>
                  <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(r)} className="rounded-md p-1.5 transition-colors hover:bg-primary/10 hover:text-primary"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => deleteRoom(r.id)} className="rounded-md p-1.5 transition-colors hover:bg-destructive/10 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Dialog open={!!editRoom} onOpenChange={() => setEditRoom(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{isNew ? "Create Room" : "Edit Room"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Room name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Capacity" type="number" value={form.capacity} onChange={(e) => setForm((f) => ({ ...f, capacity: e.target.value }))} />
            <Button onClick={save} className="w-full">{isNew ? "Create" : "Save Changes"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
