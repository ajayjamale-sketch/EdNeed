import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Edit, Trash2, Clock, BookOpen, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const periods = ["8:00–8:45", "8:45–9:30", "9:30–10:15", "10:15–11:00", "11:30–12:15", "12:15–1:00", "2:00–2:45", "2:45–3:30"];

const timetableData: Record<string, Record<string, string>> = {
  Monday: { "8:00–8:45": "Mathematics — Mr. Ravi", "8:45–9:30": "Physics — Dr. Aisha", "9:30–10:15": "Chemistry — Dr. Sanjay", "10:15–11:00": "English — Ms. Kavitha", "11:30–12:15": "Biology — Dr. Priya", "12:15–1:00": "PE — Mr. Rakesh", "2:00–2:45": "Mathematics — Mr. Ravi", "2:45–3:30": "Computer Sci — Mr. Kiran" },
  Tuesday: { "8:00–8:45": "Physics — Dr. Aisha", "8:45–9:30": "Chemistry — Dr. Sanjay", "9:30–10:15": "Mathematics — Mr. Ravi", "10:15–11:00": "Biology — Dr. Priya", "11:30–12:15": "English — Ms. Kavitha", "12:15–1:00": "Art — Ms. Neha", "2:00–2:45": "Chemistry — Dr. Sanjay", "2:45–3:30": "Library" },
  Wednesday: { "8:00–8:45": "Mathematics — Mr. Ravi", "8:45–9:30": "English — Ms. Kavitha", "9:30–10:15": "Physics — Dr. Aisha", "10:15–11:00": "Computer Sci — Mr. Kiran", "11:30–12:15": "Chemistry — Dr. Sanjay", "12:15–1:00": "Mathematics — Mr. Ravi", "2:00–2:45": "Biology — Dr. Priya", "2:45–3:30": "PE — Mr. Rakesh" },
  Thursday: { "8:00–8:45": "Chemistry — Dr. Sanjay", "8:45–9:30": "Biology — Dr. Priya", "9:30–10:15": "English — Ms. Kavitha", "10:15–11:00": "Mathematics — Mr. Ravi", "11:30–12:15": "Physics — Dr. Aisha", "12:15–1:00": "Computer Sci — Mr. Kiran", "2:00–2:45": "Art — Ms. Neha", "2:45–3:30": "Mathematics — Mr. Ravi" },
  Friday: { "8:00–8:45": "English — Ms. Kavitha", "8:45–9:30": "Physics — Dr. Aisha", "9:30–10:15": "Biology — Dr. Priya", "10:15–11:00": "Chemistry — Dr. Sanjay", "11:30–12:15": "Mathematics — Mr. Ravi", "12:15–1:00": "PE — Mr. Rakesh", "2:00–2:45": "Computer Sci — Mr. Kiran", "2:45–3:30": "Assembly/Activity" },
  Saturday: { "8:00–8:45": "Mathematics — Mr. Ravi", "8:45–9:30": "Science Lab — Dr. Aisha", "9:30–10:15": "English — Ms. Kavitha", "10:15–11:00": "Library/Self Study", "11:30–12:15": "Sports", "12:15–1:00": "Club Activities" },
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900",
  Physics: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900",
  Chemistry: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-900",
  English: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-900",
  Biology: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-900",
  "Computer Sci": "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900",
};

function getSubjectColor(subject: string): string {
  const key = Object.keys(subjectColors).find((k) => subject.startsWith(k));
  return key ? subjectColors[key] : "bg-muted text-muted-foreground border-border";
}

const classesList = ["Class 8-A", "Class 9-A", "Class 10-A", "Class 10-B", "Class 11-A", "Class 12-B"];

export default function InstitutionTimetable() {
  // Seed initial data for all classes
  const [schedules, setSchedules] = useState<Record<string, Record<string, Record<string, string>>>>(() => {
    const init: Record<string, Record<string, Record<string, string>>> = {};
    classesList.forEach(c => {
      init[c] = c === "Class 10-A" ? JSON.parse(JSON.stringify(timetableData)) : {};
    });
    return init;
  });

  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
  const [slotFormData, setSlotFormData] = useState({ day: "", period: "", subject: "", teacher: "" });

  const currentSchedule = schedules[selectedClass] || {};

  const handleSlotClick = (day: string, period: string, subject: string) => {
    if (isEditMode) {
      const parts = subject ? subject.split("—") : ["", ""];
      setSlotFormData({ day, period, subject: parts[0]?.trim() || "", teacher: parts[1]?.trim() || "" });
      setIsSlotModalOpen(true);
    } else {
      if (subject) toast.success(`${day} ${period}: ${subject}`);
    }
  };

  const handleSaveSlot = () => {
    const newValue = slotFormData.subject ? `${slotFormData.subject} — ${slotFormData.teacher || "TBA"}` : "";
    setSchedules(prev => ({
      ...prev,
      [selectedClass]: {
        ...(prev[selectedClass] || {}),
        [slotFormData.day]: {
          ...((prev[selectedClass] || {})[slotFormData.day] || {}),
          [slotFormData.period]: newValue
        }
      }
    }));
    toast.success(`Updated slot for ${slotFormData.day} ${slotFormData.period} (${selectedClass})`);
    setIsSlotModalOpen(false);
  };

  return (
    <DashboardLayout title="Timetable Management" subtitle="View and manage class schedules across all sections">
      <div className="flex flex-wrap gap-3 mb-5">
        {classesList.map((c) => (
          <button key={c} onClick={() => setSelectedClass(c)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold border transition-all", selectedClass === c ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {c}
          </button>
        ))}
        <button onClick={() => setIsEditMode(!isEditMode)} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors", isEditMode ? "bg-accent text-accent-foreground border-transparent" : "border border-dashed border-border text-muted-foreground hover:text-primary hover:border-primary")}>
          {isEditMode ? <><Save className="w-4 h-4" /> Done Editing</> : <><Edit className="w-4 h-4" /> Edit Timetable</>}
        </button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground w-28">Period / Time</th>
                {days.map((d) => (
                  <th key={d} className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {periods.map((period, pi) => (
                <tr key={period} className={cn("border-b border-border last:border-0", pi === 4 ? "bg-yellow-50/30 dark:bg-yellow-950/10" : "hover:bg-muted/20 transition-colors")}>
                  <td className="px-4 py-2 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {pi === 4 ? "BREAK" : period}
                  </td>
                  {days.map((day) => {
                    const subject = currentSchedule[day]?.[period] || "";
                    return (
                      <td key={day} className="px-3 py-2">
                        {subject ? (
                          <div className={cn("px-2.5 py-1.5 rounded-lg border text-xs font-medium leading-tight transition-opacity", getSubjectColor(subject), isEditMode ? "cursor-pointer hover:ring-2 hover:ring-primary ring-offset-1 ring-offset-background" : "cursor-pointer hover:opacity-80")} onClick={() => handleSlotClick(day, period, subject)}>
                            <div className="font-semibold truncate text-[11px]">{subject.split("—")[0].trim()}</div>
                            <div className="opacity-70 text-[10px] truncate">{subject.split("—")[1]?.trim()}</div>
                          </div>
                        ) : (
                          <div className={cn("px-2 py-1.5 rounded-lg bg-muted/30 text-xs text-muted-foreground text-center", isEditMode && "cursor-pointer hover:bg-muted/60 border border-dashed border-muted-foreground")} onClick={() => handleSlotClick(day, period, "")}>
                            {isEditMode ? "+" : "—"}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Edit Slot Modal --- */}
      <Dialog open={isSlotModalOpen} onOpenChange={setIsSlotModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Edit Slot: {slotFormData.day} ({slotFormData.period})</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="slot-subject">Subject (Leave empty to clear slot)</Label>
              <Input 
                id="slot-subject" 
                value={slotFormData.subject} 
                onChange={(e) => setSlotFormData({ ...slotFormData, subject: e.target.value })} 
                placeholder="e.g. Physics"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slot-teacher">Teacher / Room</Label>
              <Input 
                id="slot-teacher" 
                value={slotFormData.teacher} 
                onChange={(e) => setSlotFormData({ ...slotFormData, teacher: e.target.value })} 
                placeholder="e.g. Dr. Aisha"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSlotModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSlot}>Save Slot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
