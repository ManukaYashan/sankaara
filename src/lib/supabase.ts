import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://owbyroritruqsckblrhe.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93Ynlyb3JpdHJ1cXNja2JscmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyOTg5NjYsImV4cCI6MjEwNzg3NDk2Nn0.CjId1EINmcgTsqKsnkj1aUYLAIEfHtq2BK0ClCBsuCQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BookingRecord {
  id?: string;
  created_at?: string;
  suite_id: string;
  suite_title: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string; // YYYY-MM-DD
  check_out: string; // YYYY-MM-DD
  total_price: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'declined';
}

export interface BlockedDateRecord {
  id?: string;
  created_at?: string;
  suite_id: string; // 'all' or 'suite-01', etc.
  date: string; // YYYY-MM-DD
  reason?: string;
}

export interface RoomMediaRecord {
  suite_id: string;
  main_image: string;
  thumbnail_1?: string;
  thumbnail_2?: string;
  updated_at?: string;
}
