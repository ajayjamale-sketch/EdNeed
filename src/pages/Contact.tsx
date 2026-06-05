import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Building, Users } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const contactOptions = [
  { icon: MessageSquare, title: "General Inquiries", desc: "Questions about EdNeed platform and features", email: "hello@edneed.com", color: "blue" },
  { icon: Users, title: "Student Support", desc: "Help with courses, tutors, or learning", email: "support@edneed.com", color: "purple" },
  { icon: Building, title: "Institution Sales", desc: "School & institute onboarding", email: "sales@edneed.com", color: "green" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", type: "general" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (field: string, val: string) => {
    setForm((p) => ({ ...p, [field]: val }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.length < 20) e.message = "Please provide more detail (min. 20 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("Message sent! We'll get back to you within 24 hours.");
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-background dark:from-slate-950 dark:to-background" />
        <div className="container-custom relative z-10 text-center">
          <span className="badge-blue mb-5 inline-block">Contact Us</span>
          <h1 className="text-5xl font-bold mb-5">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Have a question, feedback, or want to discuss how EdNeed can help your institution? We're here for you.
          </p>
        </div>
      </section>

      {/* Contact options */}
      <section className="pb-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {contactOptions.map((opt, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors text-center">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4", colorMap[opt.color])}>
                  <opt.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">{opt.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{opt.desc}</p>
                <a href={`mailto:${opt.email}`} className="text-sm text-primary font-medium hover:underline">{opt.email}</a>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Form */}
            <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-7">
              <h2 className="text-2xl font-bold mb-1">Send a Message</h2>
              <p className="text-muted-foreground text-sm mb-6">We typically respond within 24 hours.</p>

              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm mb-5">Thank you for reaching out. Our team will get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "", type: "general" }); }}
                    className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Inquiry type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Inquiry Type</label>
                    <div className="flex flex-wrap gap-2">
                      {["general", "support", "sales", "partnership", "press"].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update("type", t)}
                          className={cn(
                            "px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all capitalize",
                            form.type === t ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent hover:border-border text-muted-foreground"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Full Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Your name"
                        className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.name ? "border-destructive" : "border-border focus:border-primary"}`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.email ? "border-destructive" : "border-border focus:border-primary"}`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Subject</label>
                    <input
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      placeholder="What is this about?"
                      className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.subject ? "border-destructive" : "border-border focus:border-primary"}`}
                    />
                    {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      placeholder="Tell us more about your query..."
                      rows={5}
                      className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none ${errors.message ? "border-destructive" : "border-border focus:border-primary"}`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{form.message.length} characters</p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold mb-5">Contact Information</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: "Email", val: "hello@edneed.com" },
                    { icon: Phone, label: "Phone", val: "+91 1800 000 0000 (Toll-free)" },
                    { icon: MapPin, label: "Office", val: "4th Floor, Tech Park, Bangalore, Karnataka 560001" },
                    { icon: Clock, label: "Support Hours", val: "Mon–Sat, 9:00 AM – 8:00 PM IST" },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                        <div className="text-sm font-medium">{val}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-2">Book a Free Demo</h3>
                <p className="text-white/75 text-sm mb-4">See EdNeed in action. Our team will walk you through the platform tailored to your institution's needs.</p>
                <button className="w-full py-2.5 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
                  Schedule Demo →
                </button>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Average response time:</strong> Under 2 hours for support requests, 24 hours for general inquiries, and 48 hours for partnership discussions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
