import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MessageSquare, Send, Search, Plus, Phone, Video, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const teachers = [
  { id: 1, name: "Dr. Aisha Patel", subject: "Physics", initials: "AP", color: "bg-blue-500", online: true, lastMsg: "Riya is doing well in Chapter 6", time: "1h ago", unread: 2 },
  { id: 2, name: "Mr. Ravi Tiwari", subject: "Mathematics", initials: "RT", color: "bg-purple-500", online: false, lastMsg: "Aryan needs more practice in algebra", time: "4h ago", unread: 1 },
  { id: 3, name: "Ms. Kavitha Nair", subject: "English", initials: "KN", color: "bg-green-500", online: true, lastMsg: "Essay submission deadline is June 15", time: "1 day ago", unread: 0 },
  { id: 4, name: "Dr. Sanjay Mehta", subject: "Chemistry", initials: "SM", color: "bg-orange-500", online: false, lastMsg: "Riya's practical work is excellent!", time: "2 days ago", unread: 0 },
];

const initialMessages: Record<number, { from: string; text: string; time: string; self?: boolean }[]> = {
  1: [
    { from: "Dr. Aisha Patel", text: "Good morning! I wanted to update you on Riya's progress in Physics.", time: "9:00 AM" },
    { from: "Dr. Aisha Patel", text: "She has been performing excellently in Chapter 6 — Optics. Her lab work is also very good.", time: "9:01 AM" },
    { from: "You", text: "Thank you so much, Doctor! We're glad to hear that. Is there anything she should focus on?", time: "9:15 AM", self: true },
    { from: "Dr. Aisha Patel", text: "She should focus on Thermodynamics. Her accuracy in that topic is around 58% — below target.", time: "9:20 AM" },
  ],
  2: [
    { from: "Mr. Ravi Tiwari", text: "I wanted to bring to your attention that Aryan has been struggling with algebraic expressions in Class 7 Math.", time: "2:00 PM" },
    { from: "You", text: "Thank you for informing us. We will get him extra coaching for that topic.", time: "2:30 PM", self: true },
    { from: "Mr. Ravi Tiwari", text: "That would be very helpful. I recommend 30 minutes of practice daily on EdNeed's exercises.", time: "2:45 PM" },
  ],
};

export default function ParentCommunication() {
  const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null);
  const [msgs, setMsgs] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [showCompose, setShowCompose] = useState(false);
  const [composeSubject, setComposeSubject] = useState("");
  const [composeMsg, setComposeMsg] = useState("");

  const sendMsg = () => {
    if (!input.trim() || !selectedTeacher) return;
    const key = selectedTeacher.id;
    setMsgs((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), { from: "You", text: input, time: "Just now", self: true }],
    }));
    setInput("");
    setTimeout(() => {
      toast.success("Message sent!");
    }, 100);
  };

  const sendCompose = () => {
    if (!composeSubject.trim() || !composeMsg.trim()) { toast.error("Please fill all fields"); return; }
    toast.success("Message sent to all teachers!");
    setShowCompose(false);
    setComposeSubject("");
    setComposeMsg("");
  };

  return (
    <DashboardLayout title="Parent-Teacher Communication" subtitle="Stay connected with your child's teachers">
      <div className="grid lg:grid-cols-3 gap-5 h-[600px]">
        {/* Teacher list */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Teachers</h3>
              <button onClick={() => setShowCompose(true)} className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white hover:opacity-90">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input placeholder="Search teachers..." className="w-full pl-8 pr-3 py-2 border border-border rounded-xl text-xs bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {teachers.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTeacher(t)}
                className={cn("w-full flex items-start gap-3 p-4 border-b border-border hover:bg-muted/50 transition-colors text-left", selectedTeacher?.id === t.id && "bg-primary/5 border-l-2 border-l-primary")}
              >
                <div className="relative">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0", t.color)}>{t.initials}</div>
                  {t.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{t.name}</span>
                    <span className="text-xs text-muted-foreground">{t.time}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{t.subject}</div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{t.lastMsg}</p>
                </div>
                {t.unread > 0 && <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-1">{t.unread}</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
          {selectedTeacher ? (
            <>
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold", selectedTeacher.color)}>{selectedTeacher.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{selectedTeacher.name}</div>
                    <div className="text-xs text-muted-foreground">{selectedTeacher.subject} Teacher · {selectedTeacher.online ? "Online" : "Offline"}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success("Requesting phone call...")} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"><Phone className="w-3.5 h-3.5" /></button>
                  <button onClick={() => toast.success("Starting video call...")} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"><Video className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(msgs[selectedTeacher.id] || []).map((m, i) => (
                  <div key={i} className={cn("flex", m.self ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed", m.self ? "gradient-primary text-white rounded-br-md" : "bg-muted rounded-bl-md")}>
                      {m.text}
                      <div className={cn("text-[10px] mt-1", m.self ? "text-white/60" : "text-muted-foreground")}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                  placeholder={`Message ${selectedTeacher.name}...`}
                  className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button onClick={sendMsg} className="w-10 h-10 rounded-xl gradient-primary text-white flex items-center justify-center hover:opacity-90 flex-shrink-0">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageSquare className="w-14 h-14 text-muted-foreground mb-4" />
              <h3 className="font-semibold text-lg mb-1">Select a Teacher</h3>
              <p className="text-sm text-muted-foreground">Choose a teacher from the list to start a conversation</p>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">New Message</h3>
              <button onClick={() => setShowCompose(false)}><X className="w-4 h-4" /></button>
            </div>
            <input placeholder="Subject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3" />
            <textarea placeholder="Your message..." value={composeMsg} onChange={(e) => setComposeMsg(e.target.value)} rows={4} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none mb-4" />
            <div className="flex gap-2">
              <button onClick={sendCompose} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Send</button>
              <button onClick={() => setShowCompose(false)} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
