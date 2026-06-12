// These are the 6 fixed SCISA executive positions shown on the website.
// Admins can update the name and photo for each position each year.

export type ExecutivePosition =
  | 'President'
  | 'Vice President'
  | 'General Secretary'
  | 'Financial Secretary'
  | 'Organizing Secretary'
  | "Women's Commissioner";

export const EXECUTIVE_POSITIONS: ExecutivePosition[] = [
  'President',
  'Vice President',
  'General Secretary',
  'Financial Secretary',
  'Organizing Secretary',
  "Women's Commissioner",
];

export interface SiteExecutive {
  id: number;
  position: ExecutivePosition;
  name: string | null;
  image: string | null;
  updated_at: string;
}

export type SiteExecutiveUpdate = {
  name?: string | null;
  image?: string | null;
};
