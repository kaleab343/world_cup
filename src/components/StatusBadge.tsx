const statusStyles: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  scheduled: "bg-primary/10 text-primary border-primary/20",
  completed: "bg-muted text-muted-foreground border-border",
  pending: "bg-warning/10 text-warning border-warning/20",
  approved: "bg-success/10 text-success border-success/20",
  paid: "bg-success/10 text-success border-success/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  inactive: "bg-muted text-muted-foreground border-border",
};

export default function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase();
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusStyles[s] ?? statusStyles.inactive}`}>
      {status}
    </span>
  );
}
