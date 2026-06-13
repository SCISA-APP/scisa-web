/**
 * useSiteExecutives
 *
 * Fetches the 6 SCISA executive positions for display on:
 *   - Landing page  (Executives section)
 *   - /executives   (full public page)
 *
 * Source of truth: `site_executives` table (synced from the management
 * dashboard which writes to both site_executives AND college_executives).
 *
 * Falls back to public-folder images if a row has no stored image yet.
 */

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const POSITION_ORDER = [
  'President',
  'Vice President',
  'General Secretary',
  'Financial Secretary',
  'Organizing Secretary',
  "Women's Commissioner",
];

// Public-folder images used before Supabase images are uploaded
const FALLBACK_IMAGES: Record<string, string> = {
  'President':             '/president.JPG',
  'Vice President':        '/vp.jpeg',
  'General Secretary':     '/gensec.JPG',
  'Financial Secretary':   '/finance.JPG',
  'Organizing Secretary':  '/organa.JPG',
  "Women's Commissioner":  '/wocom.JPG',
};

export interface ExecutiveDisplay {
  id: number;
  position: string;
  name: string;
  image: string;
}

export function useSiteExecutives() {
  const [executives, setExecutives] = useState<ExecutiveDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('site_executives')
      .select('id, position, name, image')
      .order('id', { ascending: true })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          // Full fallback — static data so the page never breaks
          setExecutives(
            POSITION_ORDER.map((position, i) => ({
              id: i + 1,
              position,
              name: '',
              image: FALLBACK_IMAGES[position] ?? '',
            }))
          );
          return;
        }

        // Sort by the canonical position order
        const sorted = [...data].sort(
          (a, b) =>
            POSITION_ORDER.indexOf(a.position) -
            POSITION_ORDER.indexOf(b.position)
        );

        setExecutives(
          sorted.map((row) => ({
            id:       row.id,
            position: row.position,
            name:     row.name ?? '',
            // Use stored Supabase image; fall back to public folder
            image:    row.image || FALLBACK_IMAGES[row.position] || '',
          }))
        );
      })
      .finally(() => setLoading(false));
  }, []);

  return { executives, loading };
}
