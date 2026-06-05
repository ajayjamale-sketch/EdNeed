import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Send, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const parents = [
  { id: 1, name: "Rakesh Sharma", student: "Aarav Sharma", class: "10-A", phone: "+91-9876543210", initials: "RS", color: "bg-blue-500", unread: 2 },
  { id: 2, name: "Sunita Mehta", student: "Priya Mehta", class: "10-B", phone: "+91-9876543211", initials: "SM", color: "bg-purple-500", unread: 0 },
  { id: 3, name: "Vijay Verma", student: "Rohan Verma", class: "9-A", phone: "+91-9876543212", initials: "VV", color: "bg-red-500", unread: 1 },
];

const notices = [
  { title: "Annual Sports Day — June 15", sent: "Jun 1", recipients: "All Parents", read: 820 },
  { title: "Parent-Teacher Meeting — June 12", sent: "May 28", recipients: "Class 10 Parents", read: 240 },
  { title: "Fee Payment Reminder — Q2", sent: "May 25", recipients: "Pending Fee Parents", read: 95 },
  { title: "Summer Vacation Notice", sent: "May 20", recipients: "All Parents", read: 850 },
];

export default function InstitutionCommunication() {
  const [tab, setTab] = useState<"messages" | "broadcast">("messages");
  const [selected, setSelected] = useState<typeof parents[0] | null>(null);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Record<number, { text: string; self: boolean; time: string }[]>>({
    1: [{ text: "Aarav's attendance this month is 92%. Keep it up!", self: false, time: "9:00 AM" }],
    3: [{ text: "Rohan's attendance is below 75%. Please ensure regular attendance.", self: false, time: "2:00 PM" }],
  });
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState("All Parents");

  const send = () => {
    if (!input.trim() || !selected) return;
    setMsgs((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), { text: input, self: true, time: "Just now" }] }));
    setInput("");
    toast.success("Message sent!");
  };

  const sendBroadcast = () => {
    if (!broadcastMsg.trim()) { toast.error("Write a message"); return; }
    toast.success(`Broadcast sent to ${broadcastTarget}!`);
    setBroadcastMsg("");
  };

  return (
    <DashboardLayout title="Parent Communication" subtitle="Send messages, notices, and updates to parents">
      <div className="flex gap-2 mb-5">
        {(["messages", "broadcast"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-4 py-2.5 rounded-xl text-sm font-semibold border capitalize transition-all", tab === t ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {t === "broadcast" ? "Broadcast / Notices" : "Direct Messages"}
          </button>
        ))}
      </div>

      {tab === "messages" && (
        <div className="grid lg:grid-cols-3 gap-5 h-[520px]">
          <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input placeholder="Search parents..." className="w-full pl-8 pr-3 py-2 border border-border rounded-xl text-xs bg-background focus:outline-none" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {parents.map((p) => (
                <button key={p.id} onClick={() => setSelected(p)} className={cn("w-full flex items-center gap-3 p-4 border-b border-border hover:bg-muted/50 text-left transition-colors", selected?.id === p.id && "bg-primary/5 border-l-2 border-l-primary")}>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0", p.color)}>{p.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.student} · {p.class}</div>
                  </div>
                  {p.unread > 0 && <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">{p.unread}</div>}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
            {selected ? (
              <>
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0", selected.color)}>{selected.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{selected.name}</div>
                    <div className="text-xs text-muted-foreground">Parent of {selected.student}</div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {(msgs[selected.id] || []).map((m, i) => (
                    <div key={i} className={cn("flex", m.self ? "justify-end" : "justify-start")}>
                      <div className={cn("max-w-[75%] px-4 py-2.5 rounded-2xl text-sm", m.self ? "gradient-primary text-white rounded-br-md" : "bg-muted rounded-bl-md")}>
                        {m.text}
                        <div className={cn("text-[10px] mt-0.5", m.self ? "text-white/60" : "text-muted-foreground")}>{m.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border flex gap-2">
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <button onClick={send} className="w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center hover:opacity-90">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <Bell className="w-12 h-12 text-muted-foreground mb-3" />
                <h3 className="font-semibold">Select a parent to message</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "broadcast" && (
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Send Broadcast Notice</h3>
            <div className="mb-3">
              <label className="block text-xs font-medium mb-1.5">Recipients</label>
              <select value={broadcastTarget} onChange={(e) => setBroadcastTarget(e.target.value)} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                {["All Parents", "Class 10 Parents", "Class 12 Parents", "Pending Fee Parents", "At-Risk Student Parents"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1.5">Message</label>
              <textarea value={broadcastMsg} onChange={(e) => setBroadcastMsg(e.target.value)} rows={5} placeholder="Type your notice or announcement..." className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            </div>
            <button onClick={sendBroadcast} className="w-full py-3 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" /> Send Notice
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Recent Notices</h3>
            <div className="space-y-3">
              {notices.map((n, i) => (
                <div key={i} className="p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => toast.success(`Viewing: ${n.title}`)}>
                  <div className="font-semibold text-sm">{n.title}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span>Sent: {n.sent}</span>
                    <span>To: {n.recipients}</span>
                    <span className="text-accent">{n.read} read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
