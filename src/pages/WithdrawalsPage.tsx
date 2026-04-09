import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Eye } from "lucide-react";

interface Withdrawal {
  id: string;
  user: string;
  amount: string;
  method: string;
  status: string;
  date: string;
}

const mockWithdrawals: Withdrawal[] = Array.from({ length: 12 }, (_, i) => ({
  id: `W-${900 + i}`,
  user: ["alice_w", "bob_k", "charlie_m", "diana_l", "eric_p"][i % 5],
  amount: `$${(Math.floor(Math.random() * 20) + 1) * 50}`,
  method: ["Bank Transfer", "PayPal", "Crypto", "Mobile Money"][i % 4],
  status: i < 5 ? "Pending" : ["Approved", "Rejected", "Paid"][i % 3],
  date: new Date(Date.now() - i * 7200000).toLocaleDateString(),
}));

export default function WithdrawalsPage() {
  const [selected, setSelected] = useState<Withdrawal | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState(mockWithdrawals);

  const handleAction = (action: "Paid" | "Rejected") => {
    if (!selected) return;
    setLoading(true);
    setTimeout(() => {
      setWithdrawals((prev) =>
        prev.map((w) => (w.id === selected.id ? { ...w, status: action } : w))
      );
      setLoading(false);
      setSelected(null);
      setNote("");
    }, 800);
  };

  return (
    <>
      <AdminHeader title="Withdrawal Review" />
      <main className="flex-1 space-y-4 p-6">
        <div className="overflow-auto rounded-xl border bg-card shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {withdrawals.map((w) => (
                <tr key={w.id} className="transition-colors hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{w.id}</td>
                  <td className="px-5 py-3 font-medium">{w.user}</td>
                  <td className="px-5 py-3 font-semibold">{w.amount}</td>
                  <td className="px-5 py-3">{w.method}</td>
                  <td className="px-5 py-3"><StatusBadge status={w.status} /></td>
                  <td className="px-5 py-3 text-muted-foreground">{w.date}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => { setSelected(w); setNote(""); }} className="rounded-md p-1.5 transition-colors hover:bg-primary/10 hover:text-primary">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Review Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Review Withdrawal {selected?.id}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">User:</span> <span className="font-medium">{selected.user}</span></div>
                <div><span className="text-muted-foreground">Amount:</span> <span className="font-bold">{selected.amount}</span></div>
                <div><span className="text-muted-foreground">Method:</span> {selected.method}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selected.status} /></div>
                <div className="col-span-2"><span className="text-muted-foreground">Date:</span> {selected.date}</div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">Admin Note</label>
                <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note..." rows={3} />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => handleAction("Paid")} disabled={loading} className="flex-1 bg-success hover:bg-success/90">
                  <CheckCircle className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Approve (PAID)"}
                </Button>
                <Button onClick={() => handleAction("Rejected")} disabled={loading} variant="destructive" className="flex-1">
                  <XCircle className="mr-2 h-4 w-4" /> {loading ? "Processing..." : "Reject"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
