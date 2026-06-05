import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Edit, Trash2, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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

export default function InstitutionTimetable() {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");

  return (
    <DashboardLayout title="Timetable Management" subtitle="View and manage class schedules across all sections">
      <div className="flex flex-wrap gap-3 mb-5">
        {["Class 8-A", "Class 9-A", "Class 10-A", "Class 10-B", "Class 11-A", "Class 12-B"].map((c) => (
          <button key={c} onClick={() => setSelectedClass(c)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold border transition-all", selectedClass === c ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {c}
          </button>
        ))}
        <button onClick={() => toast.success("Opening timetable editor...")} className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary transition-colors">
          <Plus className="w-4 h-4" /> Edit Timetable
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
                    const subject = timetableData[day]?.[period] || "";
                    return (
                      <td key={day} className="px-3 py-2">
                        {subject ? (
                          <div className={cn("px-2.5 py-1.5 rounded-lg border text-xs font-medium leading-tight cursor-pointer hover:opacity-80 transition-opacity", getSubjectColor(subject))} onClick={() => toast.success(`${day} ${period}: ${subject}`)}>
                            <div className="font-semibold truncate text-[11px]">{subject.split("—")[0].trim()}</div>
                            <div className="opacity-70 text-[10px] truncate">{subject.split("—")[1]?.trim()}</div>
                          </div>
                        ) : (
                          <div className="px-2 py-1.5 rounded-lg bg-muted/30 text-xs text-muted-foreground text-center">—</div>
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
    </DashboardLayout>
  );
}
