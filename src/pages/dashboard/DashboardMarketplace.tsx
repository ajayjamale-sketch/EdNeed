import React, { useState } from 'react';
import { 
  BookOpen, Star, Clock, Users, Search, Heart, ShoppingCart, 
  CheckCircle, Play, ArrowRight
} from 'lucide-react';
import DashboardLayout from "@/components/layout/DashboardLayout";

// --- Utility ---
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// --- Mock Data ---
const marketplaceCourses = [
  { id: 1, title: "Complete JEE Physics - Mechanics to Modern Physics", instructor: "Dr. Vivek Agarwal", rating: 4.9, reviews: 3420, students: 18500, duration: "52h", price: 2999, originalPrice: 5999, category: "JEE Prep", tag: "Bestseller", color: "blue", lessons: 140, enrolled: false },
  { id: 2, title: "NEET Biology Mastery - Botany & Zoology Complete", instructor: "Dr. Priya Reddy", rating: 4.8, reviews: 2890, students: 22000, duration: "45h", price: 2499, originalPrice: 4999, category: "NEET Prep", tag: "New", color: "green", lessons: 125, enrolled: false },
  { id: 3, title: "CAT Quantitative Aptitude - Shortcuts & Tricks", instructor: "Mr. Rajesh Sharma", rating: 4.7, reviews: 1560, students: 9800, duration: "38h", price: 1999, originalPrice: 3999, category: "CAT Prep", tag: "Hot", color: "orange", lessons: 98, enrolled: false },
  { id: 4, title: "Python Full Stack Development - Beginner to Pro", instructor: "Mr. Kiran Tech", rating: 4.8, reviews: 2100, students: 15000, duration: "65h", price: 3999, originalPrice: 7999, category: "Coding", tag: "Popular", color: "green", lessons: 180, enrolled: false },
  { id: 5, title: "Spoken English & Communication Skills", instructor: "Ms. Kavitha Nair", rating: 4.7, reviews: 3500, students: 28000, duration: "20h", price: 799, originalPrice: 1599, category: "Language", tag: "Popular", color: "orange", lessons: 60, enrolled: false },
];

const tutors = [
  { id: 1, name: "Dr. Smith", subject: "Physics Expert", rating: 4.9, hourlyRate: 800, image: "S", students: 1240, available: true },
  { id: 2, name: "Prof. Anjali Sharma", subject: "Math & Reasoning", rating: 5.0, hourlyRate: 950, image: "A", students: 980, available: true },
  { id: 3, name: "Ms. Priya Mehta", subject: "Chemistry (NEET/JEE)", rating: 4.8, hourlyRate: 750, image: "P", students: 2100, available: false },
];

// --- Modal Components ---
function EnrollModal({ course, onClose, onConfirm }: any) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-md w-full p-6 shadow-xl border border-border">
        <h3 className="text-xl font-bold mb-2">Enroll in {course.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">You'll get lifetime access to {course.lessons} lessons, downloadable resources, and certificate.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 border border-border rounded-lg bg-muted text-muted-foreground font-semibold hover:text-foreground transition-colors">Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 gradient-primary text-white py-2 rounded-lg font-semibold hover:opacity-95 transition-opacity">Confirm Enrollment</button>
        </div>
      </div>
    </div>
  );
}

function TutorBookingModal({ tutor, onClose, onBook }: any) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [topic, setTopic] = useState('');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl max-w-md w-full p-6 border border-border">
        <h3 className="text-xl font-bold">Book {tutor.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{tutor.subject} · ₹{tutor.hourlyRate}/hr</p>
        <div className="space-y-3">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-border bg-background rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full border border-border bg-background rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input type="text" placeholder="Topics to discuss" value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full border border-border bg-background rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2 border border-border rounded-lg bg-muted text-muted-foreground font-semibold hover:text-foreground transition-colors">Cancel</button>
          <button onClick={() => { if(date && time) onBook(tutor, date, time, topic); onClose(); }} className="flex-1 bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

function CartModal({ cartItems, courses, onRemove, onCheckout, onClose }: any) {
  const total = cartItems.reduce((sum: number, id: number) => sum + (courses.find((c: any) => c.id === id)?.price || 0), 0);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold">Your Cart ({cartItems.length})</h3>
        {cartItems.length === 0 ? <p className="text-muted-foreground my-4">Cart is empty</p> : (
          <div className="mt-3 space-y-3 max-h-60 overflow-auto">
            {cartItems.map((id: number) => {
              const c = courses.find((crs: any) => crs.id === id);
              return <div key={id} className="flex justify-between items-center border-b border-border pb-2"><span className="text-sm font-medium">{c?.title}</span><div className="flex items-center gap-2"><span className="font-semibold text-sm">₹{c?.price}</span><button onClick={() => onRemove(id)} className="text-destructive text-xs hover:underline">Remove</button></div></div>;
            })}
            <div className="font-bold flex justify-between pt-2">Total: ₹{total}</div>
          </div>
        )}
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2 border border-border rounded-lg bg-muted text-muted-foreground font-semibold hover:text-foreground transition-colors">Close</button>
          {cartItems.length > 0 && <button onClick={() => { onCheckout(); onClose(); }} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition-colors">Checkout</button>}
        </div>
      </div>
    </div>
  );
}

// --- Main Dashboard Component ---
export default function DashboardMarketplace() {
  // State
  const [courses, setCourses] = useState(marketplaceCourses);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [modal, setModal] = useState<{type: string; data?: any} | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  // Handlers
  const handleEnroll = (course: any) => {
    if (!enrolledCourses.find(c => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, { ...course, enrolled: true, progress: 0 }]);
      setCart(cart.filter(id => id !== course.id));
      setWishlist(wishlist.filter(id => id !== course.id));
    }
  };

  const toggleCart = (id: number) => {
    if (cart.includes(id)) setCart(cart.filter(c => c !== id));
    else setCart([...cart, id]);
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) setWishlist(wishlist.filter(w => w !== id));
    else setWishlist([...wishlist, id]);
  };

  const handleCheckout = () => {
    const purchased = courses.filter(c => cart.includes(c.id));
    const newEnrolled = [...enrolledCourses, ...purchased.map(c => ({ ...c, enrolled: true, progress: 0 }))];
    setEnrolledCourses(newEnrolled);
    setCart([]);
    setModal(null);
  };

  const filteredCourses = courses.filter(c => {
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a,b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.students - a.students;
  });

  const handleBookTutor = (tutor: any, date: string, time: string, topic: string) => {
    setBookings([...bookings, { tutor, date, time, topic, id: Date.now() }]);
  };

  const categoriesList = ["All", "JEE Prep", "NEET Prep", "CAT Prep", "Coding", "Language"];

  return (
    <DashboardLayout title="Marketplace" subtitle="Discover verified prep courses, tutoring sessions, and study materials">
      {/* Course Marketplace Section */}
      <div className="mb-10">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">📚 Course Marketplace</h2>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                placeholder="Search courses..." 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className="pl-9 pr-3 py-2 border border-border bg-background rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary/30" 
              />
            </div>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)} 
              className="border border-border bg-background rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
            </select>
            <button 
              onClick={() => setModal({ type: 'cart' })} 
              className="relative p-2 border border-border bg-background rounded-xl hover:bg-muted transition-colors flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="bg-emerald-500 text-white text-[10px] rounded-full w-4.5 h-4.5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
          {categoriesList.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)} 
              className={cn(
                "px-4 py-1.5 rounded-full text-sm whitespace-nowrap font-medium transition-all", 
                activeCategory === cat 
                  ? "gradient-primary text-white" 
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all card-hover flex flex-col">
              <div className={cn("h-28 flex items-center justify-center relative", course.color === 'blue' ? 'bg-blue-50/10' : course.color === 'green' ? 'bg-emerald-50/10' : 'bg-orange-50/10')}>
                <BookOpen className="w-12 h-12 text-muted-foreground/50" />
                {course.tag && <span className="absolute top-2 left-2 text-[10px] font-bold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded-full">{course.tag}</span>}
                <button onClick={() => toggleWishlist(course.id)} className="absolute top-2 right-2 bg-card/85 rounded-full p-1.5 border border-border hover:bg-muted transition-colors">
                  <Heart className={cn("w-3.5 h-3.5", wishlist.includes(course.id) ? "fill-red-500 text-red-500 border-transparent" : "text-muted-foreground")} />
                </button>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm leading-snug line-clamp-2 min-h-[40px]">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{course.instructor}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold">{course.rating}</span>
                    <span className="text-xs text-muted-foreground">({course.reviews})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                    <Clock className="w-3.5 h-3.5" />{course.duration}
                    <Users className="w-3.5 h-3.5" />{(course.students/1000).toFixed(0)}K
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                  <div>
                    <span className="font-bold text-sm">₹{course.price}</span>
                    <span className="text-[10px] line-through ml-1 text-muted-foreground">₹{course.originalPrice}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => setModal({ type: 'enroll', data: course })} className="gradient-primary text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      Enroll
                    </button>
                    <button 
                      onClick={() => toggleCart(course.id)} 
                      className={cn(
                        "p-1.5 border rounded-lg transition-colors", 
                        cart.includes(course.id) 
                          ? "bg-emerald-500 text-white border-transparent" 
                          : "border-border hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tutor Marketplace */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">👩‍🏫 Top Tutors</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {tutors.map(tutor => (
            <div key={tutor.id} className="bg-card p-5 rounded-2xl border border-border flex flex-col justify-between hover:border-primary/30 transition-all card-hover">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {tutor.image}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{tutor.name}</h3>
                  <p className="text-xs text-muted-foreground">{tutor.subject}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">{tutor.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                <span className="text-sm font-bold">₹{tutor.hourlyRate}/hr</span>
                <button 
                  onClick={() => setModal({ type: 'tutor', data: tutor })} 
                  className="text-xs bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
                >
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Learning Section */}
      {enrolledCourses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">📖 My Enrolled Courses</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-card p-4 rounded-2xl border border-border flex justify-between items-center hover:border-primary/30 transition-all">
                <div className="flex-1 min-w-0 pr-3">
                  <p className="font-medium text-sm truncate">{course.title}</p>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{course.progress}% complete</p>
                </div>
                <Play className="w-4 h-4 text-primary flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {modal?.type === 'enroll' && <EnrollModal course={modal.data} onClose={() => setModal(null)} onConfirm={() => handleEnroll(modal.data)} />}
      {modal?.type === 'tutor' && <TutorBookingModal tutor={modal.data} onClose={() => setModal(null)} onBook={handleBookTutor} />}
      {modal?.type === 'cart' && <CartModal cartItems={cart} courses={courses} onRemove={(id: number) => setCart(cart.filter(c => c !== id))} onCheckout={handleCheckout} onClose={() => setModal(null)} />}
    </DashboardLayout>
  );
}