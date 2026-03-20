export type UserType = 'guest' | 'customer' | 'provider';
export type AuthStatus = 'unauthenticated' | 'customer' | 'provider';

export type Screen =
  // ── Auth ──
  | 'login'
  | 'signup'

  // ── Public ──
  | 'landing'
  | 'terms'
  | 'privacy'
  | 'help'

  // ── Shared ──
  | 'search'
  | 'support'
  | 'settings'

  // ── Customer ──
  | 'home'
  | 'services'
  | 'service-detail'
  | 'booking-checkout'
  | 'order-tracking'
  | 'profile'
  | 'bookings'

  // ── Provider ──
  | 'provider-dashboard'
  | 'provider-profile'
  | 'provider-bookings'
  | 'provider-services'
  | 'provider-verification'
  | 'provider-post-service'
  | 'provider-gig-create'
  | 'provider-wallet'
  | 'provider-verification-wizard';

// ─── Auth Context ───────────────────────────────────────────────
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'provider';
}

// ─── Service ───────────────────────────────────────────────
export interface Service {
  id: number;
  title: string;
  category: string;
  price: string;
  rating: string;
  reviews: string;
  img: string;
  pro: string;
  description?: string;
  tags?: string[];
  duration?: string;
  location?: string;
}

// ─── Booking ───────────────────────────────────────────────
export interface Booking {
  id: number;
  service: string;
  pro: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'In Progress';
  price: string;
  img: string;
  trackingSteps?: TrackingStep[];
}

export interface TrackingStep {
  label: string;
  description: string;
  completed: boolean;
  time?: string;
}

// ─── Provider Profile / Onboarding ───────────────────────
export interface ProviderRequirement {
  id: string;
  label: string;
  description: string;
  isComplete: boolean;
  weight: number;
}

export interface ProviderProfile {
  photoUrl: string | null;
  bio: string;
  skillTags: string[];
  professionalCerts: CertEntry[];
  idVerified: boolean;
  idDocumentUrl: string | null;
}

export interface CertEntry {
  id: string;
  name: string;
  issuer: string;
  year: string;
  fileUrl: string | null;
}

export interface ProviderOnboardingState {
  profile: ProviderProfile;
  completionPct: number;
  requirements: ProviderRequirement[];
  canPostService: boolean;
  updateProfile: (partial: Partial<ProviderProfile>) => void;
}

// ─── Wallet / Payout ───────────────────────────────────────
export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit' | 'pending';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}
