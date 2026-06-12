export type Department =
  | 'Computer Science'
  | 'Physics'
  | 'Actuarial Science'
  | 'Chemistry'
  | 'Environmental Science'
  | 'Biological Science'
  | 'Biochemistry'
  | 'Mathematics'
  | 'Optometry'
  | 'Meteorological and Climate Sciences'
  | 'Food Science and Technology'
  | 'Statistics';

export const DEPARTMENTS: Department[] = [
  'Computer Science',
  'Physics',
  'Actuarial Science',
  'Chemistry',
  'Environmental Science',
  'Biological Science',
  'Biochemistry',
  'Mathematics',
  'Optometry',
  'Meteorological and Climate Sciences',
  'Food Science and Technology',
  'Statistics',
];

export interface CollegeExecutive {
  id: number;
  name: string;
  position: string;
  phone: string | null;
  email: string | null;
  description: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export type CollegeExecutiveInsert = {
  name: string;
  position: string;
  phone?: string | null;
  email?: string | null;
  description?: string | null;
  image?: string | null;
};

export interface DepartmentExecutive {
  id: number;
  department: Department;
  name: string;
  position: string;
  phone: string | null;
  email: string | null;
  description: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
}

export type DepartmentExecutiveInsert = {
  department: Department;
  name: string;
  position: string;
  phone?: string | null;
  email?: string | null;
  description?: string | null;
  image?: string | null;
};