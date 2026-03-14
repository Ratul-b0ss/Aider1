import React from 'react';
import { Search, MapPin, Star, Shield, Clock, Bell, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { Screen } from '../../types';

interface HomeProps {
  onNavigate: (s: Screen) => void;
  isAuthenticated: boolean;
}

const CATEGORIES = [
  { id: 'cleaning', name: 'Cleaning', icon: Search, color: 'bg-blue-50 text-blue-500' },
  { id: 'repair', name: 'Repair', icon: MapPin, color: 'bg-orange-50 text-orange-500' },
  { id: 'beauty', name: 'Beauty', icon: Star, color: 'bg-pink-50 text-pink-500' },
  { id: 'moving', name: 'Moving', icon: Shield, color: 'bg-purple-50 text-purple-500' },
  { id: 'gardening', name: 'Gardening', icon: Clock, color: 'bg-green-50 text-green-500' },
  { id: 'painting', name: 'Painting', icon: Search, color: 'bg-yellow-50 text-yellow-500' },
];

const POPULAR_SERVICES = [
  {
    id: '1',
    title: 'Deep Home Cleaning',
    provider: 'Sparkle Pros',
    rating: 4.9,
    reviews: 128,
    price: 45,
    image: 'https://picsum.photos/seed/cleaning/400/300',
  },
  {
    id: '2',
    title: 'AC Maintenance',
    provider: 'CoolAir Tech',
    rating: 4.8,
    reviews: 85,
    price: 60,
    image: 'https://picsum.photos/seed/ac/400/300',
  },
];

export const Home = ({ onNavigate, isAuthenticated }: HomeProps) => {
  return (
    <div className="w-full">
      {/* --- MOBILE LAYOUT (Only visible on small screens) --- */}
      <div className="block md:hidden pb-24 bg-white min-h-screen">
        {/* Hero / Welcome Section */}
        <div className="px-4 pt-6 pb-4">
          {!isAuthenticated ? (
            <div className="mb-6 space-y-4">
              <h1 className="text-4xl font-black text-ink leading-tight">
                Your home<br/><span className="text-primary">services,</span><br/>simplified.
              </h1>
              <p className="text-gray-500 text-sm">Book trusted professionals for your home needs instantly.</p>
              <div className="flex gap-3 pt-2">
                <button onClick={() => onNavigate('signup')} className="flex-1 bg-deep-moss text-white py-3.5 rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform">
                  Sign Up
                </button>
                <button onClick={() => onNavigate('login')} className="flex-1 bg-white border-2 border-gray-200 text-deep-moss py-3.5 rounded-xl font-bold text-sm active:scale-95 transition-transform">
                  Log In
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6 flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm font-medium">Welcome back,</p>
                <h1 className="text-2xl font-black text-ink">John Doe</h1>
              </div>
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-deep-moss">
                <User size={24} />
              </div>
            </div>
          )}

          {/* Search Bar */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-2 flex items-center shadow-sm mt-2">
            <div className="pl-3">
              <Search size={20} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="What do you need help with?" 
              className="w-full bg-transparent px-3 py-2 text-sm font-medium text-gray-800 outline-none placeholder:text-gray-400"
            />
            <div className="bg-primary text-white p-2 rounded-xl">
              <MapPin size={18} />
            </div>
          </div>
        </div>

        <div className="px-4 mt-4 space-y-8">
          {/* Categories Grid */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-black text-ink tracking-tight">Categories</h2>
              <button className="text-sm font-bold text-primary">See All</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {CATEGORIES.slice(0, 8).map((cat) => (
                <button key={cat.id} onClick={() => onNavigate('services')} className="flex flex-col items-center gap-2 transition-transform active:scale-95">
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center shadow-sm`}>
                    <cat.icon size={20} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] font-bold text-ink-muted text-center leading-tight">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Promo Banner */}
          <div className="bg-deep-moss rounded-3xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">Special Offer</span>
              <h3 className="text-xl font-black text-white mt-2.5 leading-tight">Get 20% Off<br/>First Booking</h3>
            </div>
            <img src="https://illustrations.popsy.co/amber/surreal-hourglass.svg" alt="Promo" className="w-24 h-24 object-contain drop-shadow-md relative z-10" style={{ filter: 'brightness(0) invert(1) opacity(0.8)' }} />
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          {/* Popular Services Horizontal Scroll */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-black text-ink tracking-tight">Popular Services</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-4">
              {POPULAR_SERVICES.map((service) => (
                <div key={service.id} className="min-w-[220px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                  <div className="h-32 w-full relative">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 text-deep-moss">
                      <Star size={12} className="text-yellow-500 fill-yellow-500" />
                      {service.rating}
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-ink text-sm truncate">{service.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{service.provider}</p>
                    <div className="mt-3 flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="font-black text-primary text-base">${service.price}</span>
                      <button onClick={() => onNavigate(isAuthenticated ? 'services' : 'login')} className="bg-deep-moss text-white text-xs font-bold px-4 py-2 rounded-xl transition-transform active:scale-95">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- DESKTOP LAYOUT (Hidden on mobile) --- */}
      <div className="hidden md:block space-y-fluid-xl pb-fluid-xl">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background-light px-4 sm:px-fluid-md py-12 sm:py-fluid-xl lg:py-24">
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Content */}
            <div className="relative z-10 w-full max-w-2xl space-y-4 sm:space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="mb-2 sm:mb-4 block text-xs sm:text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-gray-600">
                  Over 10,000+ Verified Professionals
                </span>
                <h1 className="text-[clamp(2.5rem,10vw,5.5rem)] font-black leading-[1.1] tracking-tight normal-case">
                  <span className="text-deep-moss">Find Trusted</span><br />
                  <span className="text-deep-moss">Services</span><br />
                  <span className="text-ink">Near You.</span>
                </h1>
                <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-[clamp(1rem,2vw,1.25rem)] text-gray-500 font-medium mx-auto lg:mx-0">
                  Electricians, plumbers, cleaners, and more — instantly connected to your doorstep.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-2 rounded-2xl sm:rounded-full bg-white p-1.5 sm:p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full max-w-3xl"
              >
                <div className="flex flex-1 items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 w-full border-b sm:border-b-0 sm:border-r border-gray-200">
                  <Search className="text-primary w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  <input 
                    type="text" 
                    placeholder="What service do you need?" 
                    className="w-full bg-transparent text-sm sm:text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-gray-800 outline-none placeholder:text-gray-500"
                  />
                </div>
                <div className="flex flex-1 items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3 w-full">
                  <MapPin className="text-primary w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  <input 
                    type="text" 
                    placeholder="Your Location" 
                    className="w-full bg-transparent text-sm sm:text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-gray-800 outline-none placeholder:text-gray-500"
                  />
                </div>
                <button className="w-full sm:w-auto rounded-xl sm:rounded-full bg-deep-moss px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-[clamp(0.875rem,1.5vw,1rem)] font-bold text-white transition-all hover:bg-deep-moss-dark whitespace-nowrap mt-1 sm:mt-0">
                  Find Service
                </button>
              </motion.div>
            </div>
            
            {/* Right Illustration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-full max-w-xl lg:w-1/2 flex justify-center mt-8 lg:mt-0"
            >
              <img 
                src="https://illustrations.popsy.co/amber/student-going-to-school.svg" 
                alt="People finding services" 
                className="w-3/4 sm:w-full h-auto max-w-[280px] sm:max-w-[500px] object-contain drop-shadow-2xl"
                style={{ filter: 'hue-rotate(140deg)' }}
              />
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-fluid-md py-8 sm:py-fluid-lg space-y-12 sm:space-y-fluid-xl">
          <section className="space-y-6 sm:space-y-fluid-md">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="block text-[clamp(0.625rem,1vw,0.75rem)] font-black uppercase tracking-[0.2em] text-primary">Browse</span>
                <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold normal-case leading-tight">Categories</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
                View All
              </Button>
            </div>
            
            <div className="no-scrollbar flex gap-4 sm:gap-fluid-md overflow-x-auto pb-4 sm:pb-fluid-sm -mx-4 px-4 sm:mx-0 sm:px-0">
              {CATEGORIES.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => onNavigate('services')}
                  className="group flex min-w-[80px] sm:min-w-[120px] flex-col items-center gap-2 sm:gap-fluid-sm"
                >
                  <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-white shadow-sm transition-all group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg">
                    <cat.icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] sm:text-fluid-xs font-bold uppercase tracking-wider text-ink-muted group-hover:text-ink text-center">
                    {cat.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Popular Services Section */}
          <section className="space-y-6 sm:space-y-fluid-md">
            <div className="flex items-end justify-between">
              <div className="space-y-1">
                <span className="block text-[clamp(0.625rem,1vw,0.75rem)] font-black uppercase tracking-[0.2em] text-primary">Trending</span>
                <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold normal-case leading-tight">Popular Services</h2>
              </div>
              <Button variant="ghost" size="sm" className="text-primary text-xs sm:text-sm">
                See More
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {POPULAR_SERVICES.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="card-premium group overflow-hidden p-0 flex flex-col"
                >
                  <div className="relative h-40 sm:h-48 w-full overflow-hidden shrink-0">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute right-3 top-3 sm:right-fluid-sm sm:top-fluid-sm rounded-full bg-white/90 px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-bold text-deep-moss backdrop-blur-sm">
                      ★ {service.rating}
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-fluid-sm p-4 sm:p-fluid-md flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-fluid-base text-ink normal-case truncate">{service.title}</h3>
                        <p className="text-xs sm:text-fluid-xs text-ink-muted truncate">{service.provider}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm sm:text-fluid-base font-black text-primary">${service.price}</p>
                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tighter text-ink-muted">Starting</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2 mt-auto">
                      <Button 
                        className="w-full text-xs sm:text-sm py-2 sm:py-3" 
                        onClick={() => onNavigate(isAuthenticated ? 'services' : 'login')}
                      >
                        {isAuthenticated ? 'Book Now' : 'Login to Book'}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
