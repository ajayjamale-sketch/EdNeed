import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/features/ThemeProvider";
import {
  Menu, X, Sun, Moon, ChevronDown, GraduationCap, BookOpen,
  Users, BarChart3, Briefcase, Bell, Search, LogOut, Settings, User
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Platform",
    children: [
      { label: "Features", href: "/features", icon: BookOpen, desc: "All platform capabilities" },
      { label: "For Students", href: "/for-students", icon: GraduationCap, desc: "Learning & assessments" },
      { label: "For Teachers", href: "/for-teachers", icon: Users, desc: "Teaching & revenue tools" },
      { label: "For Institutions", href: "/for-institutions", icon: BarChart3, desc: "School & institute mgmt" },
    ],
  },
  { label: "Courses", href: "/courses" },
  { label: "Tutors", href: "/tutors" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", icon: BookOpen, desc: "Education insights" },
      { label: "FAQ", href: "/faq", icon: Users, desc: "Common questions" },
      { label: "Career Guidance", href: "/career", icon: Briefcase, desc: "Career planning tools" },
    ],
  },
  { label: "About", href: "/about" },
];

function getMockUser() {
  try {
    const stored = localStorage.getItem("edneed-user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const user = getMockUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogout = () => {
    localStorage.removeItem("edneed-user");
    setUserMenuOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-transparent"
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading">
                <span className="gradient-text">Ed</span>Need
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        cn("nav-link px-3 py-2 rounded-lg hover:bg-muted transition-all", isActive && "text-primary")
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <button className="nav-link px-3 py-2 rounded-lg hover:bg-muted transition-all flex items-center gap-1">
                      {item.label}
                      <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeDropdown === item.label && "rotate-180")} />
                    </button>
                  )}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-xl p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                            <child.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{child.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{child.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Toggle theme"
              >
                {resolvedTheme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                      {user.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-sm font-medium hidden md:block">{user.name?.split(" ")[0]}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-xl p-1.5">
                      <Link to="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm" onClick={() => setUserMenuOpen(false)}>
                        <BarChart3 className="w-4 h-4 text-muted-foreground" />Dashboard
                      </Link>
                      <Link to="/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm" onClick={() => setUserMenuOpen(false)}>
                        <User className="w-4 h-4 text-muted-foreground" />Profile
                      </Link>
                      <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-muted text-sm" onClick={() => setUserMenuOpen(false)}>
                        <Settings className="w-4 h-4 text-muted-foreground" />Settings
                      </Link>
                      <div className="border-t border-border my-1" />
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-destructive/10 hover:text-destructive text-sm transition-colors">
                        <LogOut className="w-4 h-4" />Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 transition-opacity shadow-sm shadow-primary/30"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.href ? (
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center px-4 py-3 rounded-xl hover:bg-muted font-medium text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2">
                        {item.label}
                      </div>
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-muted text-sm transition-colors"
                        >
                          <child.icon className="w-4 h-4 text-primary" />
                          {child.label}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              ))}
              <div className="border-t border-border pt-4 mt-2 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-muted font-medium text-sm">
                      <BarChart3 className="w-4 h-4" />Dashboard
                    </Link>
                    <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-destructive/10 hover:text-destructive font-medium text-sm">
                      <LogOut className="w-4 h-4" />Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl border border-border font-medium text-sm text-center">Sign in</Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl gradient-primary text-white font-semibold text-sm text-center">Get Started Free</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
