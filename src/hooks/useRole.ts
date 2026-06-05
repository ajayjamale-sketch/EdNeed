export type UserRole = "student" | "parent" | "teacher" | "institution" | "counselor" | "recruiter" | "admin";

export interface EdNeedUser {
  name: string;
  email: string;
  role: UserRole;
  id: string;
  avatar?: string;
}

export function getMockUser(): EdNeedUser {
  try {
    const stored = localStorage.getItem("edneed-user");
    return stored ? JSON.parse(stored) : { name: "Alex Johnson", email: "alex@example.com", role: "student", id: "u1" };
  } catch {
    return { name: "Alex Johnson", email: "alex@example.com", role: "student", id: "u1" };
  }
}

export function setMockUser(user: EdNeedUser) {
  localStorage.setItem("edneed-user", JSON.stringify(user));
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    student: "Student",
    parent: "Parent",
    teacher: "Teacher / Tutor",
    institution: "School / Institute",
    counselor: "Career Counselor",
    recruiter: "Recruiter",
    admin: "Admin",
  };
  return labels[role] || "User";
}

export function getRoleDashboardPath(role: UserRole): string {
  const paths: Record<UserRole, string> = {
    student: "/dashboard",
    parent: "/dashboard/parent",
    teacher: "/dashboard/teacher",
    institution: "/dashboard/institution",
    counselor: "/dashboard/counselor",
    recruiter: "/dashboard/recruiter",
    admin: "/dashboard/admin",
  };
  return paths[role] || "/dashboard";
}
