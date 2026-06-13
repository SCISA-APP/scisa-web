/**
 * seed-executives.mjs
 *
 * Uploads the 6 executive photos from /public to Supabase storage,
 * then upserts rows into:
 *   - site_executives   (website: landing page + /executives)
 *   - college_executives (mobile app: college executives screen)
 *
 * Run once:  node scripts/seed-executives.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '../public');

// ── Supabase credentials ──────────────────────────────────────────────────
const SUPABASE_URL = 'https://vtnpiyszfmgqtyfeiaps.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0bnBpeXN6Zm1ncXR5ZmVpYXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyMjYzMTgsImV4cCI6MjA3OTgwMjMxOH0.2A8Duz63as9G37jIgZlPnpx2c0zDKQAXkDCuB7FXQG8';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const SITE_BUCKET = 'site-executives';

// ── Executive definitions ─────────────────────────────────────────────────
// order matters — site_executives rows are matched by position string
const EXECUTIVES = [
  { position: 'President',             name: 'Nana Agyekum Boateng', file: 'president.JPG'  },
  { position: 'Vice President',        name: 'Derrick Kello Junior',  file: 'vp.jpeg'        },
  { position: 'General Secretary',     name: 'Lily Tugbah',           file: 'gensec.JPG'     },
  { position: 'Financial Secretary',   name: '',                       file: 'finance.JPG'    },
  { position: 'Organizing Secretary',  name: '',                       file: 'organa.JPG'     },
  { position: "Women's Commissioner",  name: '',                       file: 'wocom.JPG'      },
];

// ── Helpers ───────────────────────────────────────────────────────────────

function mimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  return ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
}

async function uploadImage(filename) {
  const filePath = resolve(PUBLIC_DIR, filename);
  if (!existsSync(filePath)) {
    console.warn(`  ⚠  File not found: ${filePath} — skipping upload`);
    return null;
  }

  const fileBuffer = readFileSync(filePath);
  const storageName = `executives/${filename}`;
  const contentType = mimeType(filename);

  const { error } = await supabase.storage
    .from(SITE_BUCKET)
    .upload(storageName, fileBuffer, { contentType, upsert: true });

  if (error) {
    console.error(`  ✗  Upload failed for ${filename}:`, error.message);
    return null;
  }

  const { data } = supabase.storage.from(SITE_BUCKET).getPublicUrl(storageName);
  return data.publicUrl;
}

// ── Main ──────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n🌱  Seeding SCISA executives...\n');

  for (const exec of EXECUTIVES) {
    console.log(`→  ${exec.position}`);

    // 1. Upload image
    console.log(`   Uploading ${exec.file}...`);
    const imageUrl = await uploadImage(exec.file);
    if (imageUrl) console.log(`   ✓  ${imageUrl}`);

    // 2. Upsert into site_executives (match on position)
    const { error: siteErr } = await supabase
      .from('site_executives')
      .upsert(
        {
          position:   exec.position,
          name:       exec.name || null,
          image:      imageUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'position' }
      );

    if (siteErr) {
      console.error(`   ✗  site_executives upsert failed:`, siteErr.message);
    } else {
      console.log(`   ✓  site_executives updated`);
    }

    // 3. Upsert into college_executives (match on position)
    const { error: mobileErr } = await supabase
      .from('college_executives')
      .upsert(
        {
          name:       exec.name || exec.position,
          position:   exec.position,
          image:      imageUrl,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'position' }
      );

    if (mobileErr) {
      console.error(`   ✗  college_executives upsert failed:`, mobileErr.message);
    } else {
      console.log(`   ✓  college_executives updated`);
    }

    console.log();
  }

  console.log('✅  Done. Both tables seeded and images uploaded.\n');
}

seed().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
