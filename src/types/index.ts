export type UserType = 'customer' | 'provider';

export type Screen = 
  | 'login' 
  | 'signup' 
  | 'home' 
  | 'services' 
  | 'profile' 
  | 'bookings' 
  | 'settings'
  | 'provider-dashboard'
  | 'provider-profile'
  | 'provider-bookings'
  | 'provider-services';

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
