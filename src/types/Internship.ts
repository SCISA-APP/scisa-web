export type ListingType = 'Internship' | 'Job' | 'NSS';

export type Department =
  | 'Computer Science'
  | 'Food Science'
  | 'Actuarial Science'
  | 'Environmental Science'
  | 'Optometry'
  | 'Mathematics'
  | 'Physics'
  | 'Meteorology and Climate Science'
  | 'Chemistry'
  | 'Biological Science'
  | 'Statistics'
  | 'Biochemistry';

export const LISTING_DEPARTMENTS: Department[] = [
  'Computer Science',
  'Food Science',
  'Actuarial Science',
  'Environmental Science',
  'Optometry',
  'Mathematics',
  'Physics',
  'Meteorology and Climate Science',
  'Chemistry',
  'Biological Science',
  'Statistics',
  'Biochemistry',
];

export const LISTING_TYPES: ListingType[] = ['Internship', 'Job', 'NSS'];

export interface Listing {
  id: string;
  company: string;
  logo?: string; // URL to company logo image
  location: string;
  role: string;
  department: Department;
  type: ListingType;
  stipend?: {
    amount: number;
    currency: string;
    period: 'monthly' | 'weekly' | 'total';
  };
  duration: string;
  deadline: string;
  description: string;
  skills: string[];
  contact: {
    email?: string;
    phone?: string;
    name?: string;
  };
  tint: string;
  created_at?: string;
  updated_at?: string;
}

export type ListingInsert = Omit<Listing, 'id' | 'created_at' | 'updated_at'>;
