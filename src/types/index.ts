export type UserType = 'customer' | 'provider';

export type Screen =
  // ── Shared ──
  | 'login'
  | 'signup'
  | 'home'
  | 'search'
  | 'support'
  | 'settings'

  // ── Customer ──
  | 'services'
  | 'profile'
  | 'bookings'

  // ── Provider ──
  | 'provider-dashboard'
  | 'provider-profile'
  | 'provider-bookings'
  | 'provider-services'
  | 'provider-verification'
  | 'provider-post-service';

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
}

// ─── Booking ───────────────────────────────────────────────
export interface Booking {
  id: number;
  service: string;
  pro: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: string;
  img: string;
}

// ─── Provider Profile / Onboarding ───────────────────────
export interface ProviderRequirement {
  id: string;
  label: string;
  description: string;
  isComplete: boolean;
  weight: number; // % contribution to total
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
