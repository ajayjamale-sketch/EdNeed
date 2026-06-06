import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, Building, Users, ArrowRight } from "lucide-react";
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



              <div className="bg-card border border-border rounded-2xl p-5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Average response time:</strong> Under 2 hours for support requests, 24 hours for general inquiries, and 48 hours for partnership discussions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Offices */}
      <section className="section-padding bg-muted/20 border-t border-border">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-blue mb-4 inline-block">Our Locations</span>
            <h2 className="text-3xl font-bold mb-4">Visit Our <span className="gradient-text">Global Offices</span></h2>
            <p className="text-muted-foreground">We have dedicated support and engineering centers around the world to serve our community.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { city: "Bangalore", type: "Global HQ", address: "4th Floor, Tech Park, Whitefield, Bangalore, Karnataka 560066", phone: "+91 80 4000 0000" },
              { city: "New Delhi", type: "North Hub", address: "Sector 62, Cyber City, Gurugram, NCR 122001", phone: "+91 11 4100 0000" },
              { city: "Mumbai", type: "Business Center", address: "BKC Commercial Complex, Bandra East, Mumbai 400051", phone: "+91 22 2600 0000" }
            ].map((office, i) => (
              <div key={i} className="glass-card-premium p-6 rounded-2xl text-center group hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">{office.city}</h3>
                <p className="text-xs font-semibold text-primary mb-3">{office.type}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{office.address}</p>
                <p className="text-sm font-medium text-foreground">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick FAQ Snippet */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
                <p className="text-muted-foreground mb-6 text-lg">Browse our comprehensive Help Center or read our Frequently Asked Questions for instant answers.</p>
                <a href="/faq" className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-primary/50 hover:bg-primary/5 bg-background rounded-xl font-semibold transition-all">
                  Visit Help Center <ArrowRight className="w-4 h-4 text-primary" />
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
                {["Account Recovery", "Billing & Subscriptions", "Course Enrollment", "Technical Support"].map((topic, i) => (
                  <a key={i} href="/faq" className="glass-card-premium p-4 rounded-xl text-sm font-medium hover:text-primary transition-colors flex items-center justify-between group">
                    {topic}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
