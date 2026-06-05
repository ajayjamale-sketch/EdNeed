import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { GraduationCap, Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Minimal nav */}
      <header className="p-4 md:p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5 w-fit">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="font-bold text-lg"><span className="gradient-text">Ed</span>Need</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* 404 Visual */}
          <div className="relative mb-8">
            <div className="text-[10rem] font-black leading-none gradient-text select-none opacity-10 absolute inset-0 flex items-center justify-center">
              404
            </div>
            <div className="relative z-10 py-16">
              <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/25">
                <Search className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-3">Page Not Found</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Oops! The page at <code className="px-2 py-0.5 bg-muted rounded text-sm font-mono">{location.pathname}</code> doesn't exist.
          </p>
          <p className="text-muted-foreground mb-8">
            It may have been moved, deleted, or you may have mistyped the URL.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              <Home className="w-4 h-4" /> Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-xl font-semibold hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm text-muted-foreground mb-4 font-medium">Popular pages</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {[
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "Blog", href: "/blog" },
                { label: "Dashboard", href: "/dashboard" },
                { label: "Contact", href: "/contact" },
                { label: "FAQ", href: "/faq" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  to={href}
                  className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="p-6 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} EdNeed. All rights reserved.
      </footer>
    </div>
  );
}
