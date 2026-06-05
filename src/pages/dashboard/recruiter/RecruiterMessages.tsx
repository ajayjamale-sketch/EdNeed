import DashboardLayout from "@/components/layout/DashboardLayout";
import { MessageSquare, Search, Send, Phone, Video, MoreVertical, CheckCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const contacts = [
  { id: 1, name: "Arjun Nair", role: "Software Engineer Candidate", time: "10:30 AM", unread: 2, online: true, lastMsg: "I have updated my resume as requested." },
  { id: 2, name: "Priya Sharma", role: "Data Science Intern", time: "Yesterday", unread: 0, online: false, lastMsg: "Thank you for the interview opportunity!" },
  { id: 3, name: "Rahul Verma", role: "Frontend Developer", time: "Yesterday", unread: 0, online: true, lastMsg: "When can I expect the results?" },
  { id: 4, name: "Sneha Gupta", role: "Product Designer", time: "Mon", unread: 0, online: false, lastMsg: "Sure, I'll send the portfolio link." },
];

export default function RecruiterMessages() {
  const [activeContact, setActiveContact] = useState(contacts[0]);

  return (
    <DashboardLayout title="Messages" subtitle="Communicate with your prospective candidates">
      <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] min-h-[600px] flex gap-6 p-4 sm:p-6">
        
        {/* Contacts List */}
        <div className="w-full sm:w-80 flex flex-col glass-card-premium rounded-3xl overflow-hidden flex-shrink-0 border border-border">
          <div className="p-4 border-b border-border bg-card/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full pl-9 pr-4 py-2.5 bg-muted border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setActiveContact(contact)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-2xl transition-all text-left mb-1",
                  activeContact.id === contact.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted border border-transparent"
                )}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {contact.name.charAt(0)}
                  </div>
                  {contact.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-sm truncate pr-2">{contact.name}</h4>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-muted-foreground truncate">{contact.lastMsg}</p>
                    {contact.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center ml-2 flex-shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden sm:flex flex-1 flex-col glass-card-premium rounded-3xl overflow-hidden border border-border bg-card">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex justify-between items-center bg-card/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold">
                  {activeContact.name.charAt(0)}
                </div>
                {activeContact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />}
              </div>
              <div>
                <h3 className="font-bold text-sm">{activeContact.name}</h3>
                <p className="text-xs text-muted-foreground">{activeContact.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"><Phone className="w-4 h-4" /></button>
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"><Video className="w-4 h-4" /></button>
              <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors"><MoreVertical className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/30">
            <div className="flex justify-center"><span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Today</span></div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {activeContact.name.charAt(0)}
              </div>
              <div className="bg-card border border-border p-3.5 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]">
                <p className="text-sm">Hi, thank you for reaching out regarding the software engineer position. Is there anything else you need from my side?</p>
                <span className="text-[10px] text-muted-foreground mt-2 block">10:15 AM</span>
              </div>
            </div>

            <div className="flex items-start gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                R
              </div>
              <div className="bg-primary text-primary-foreground p-3.5 rounded-2xl rounded-tr-sm shadow-sm max-w-[80%]">
                <p className="text-sm text-white">Yes, could you please provide a link to your updated portfolio and your latest resume?</p>
                <div className="flex items-center justify-end gap-1 mt-1 text-white/70">
                  <span className="text-[10px]">10:20 AM</span>
                  <CheckCheck className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {activeContact.name.charAt(0)}
              </div>
              <div className="bg-card border border-border p-3.5 rounded-2xl rounded-tl-sm shadow-sm max-w-[80%]">
                <p className="text-sm">{activeContact.lastMsg}</p>
                <span className="text-[10px] text-muted-foreground mt-2 block">{activeContact.time}</span>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 bg-card border-t border-border flex items-center gap-3">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 py-3 px-4 bg-muted border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button className="w-12 h-12 rounded-xl gradient-primary text-white flex items-center justify-center hover:opacity-90 shadow-lg shadow-primary/20 flex-shrink-0 transition-transform hover:scale-105">
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
