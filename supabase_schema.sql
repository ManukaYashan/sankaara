-- ==============================================================================
-- SANKĀRA BOUTIQUE RETREAT — DATABASE SCHEMA & ROW LEVEL SECURITY
-- Paste this script into your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/owbyroritruqsckblrhe/sql/new
-- ==============================================================================

-- 1. BOOKINGS TABLE
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  suite_id text not null,
  suite_title text not null,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  check_in date not null,
  check_out date not null,
  total_price numeric not null default 0,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'declined'))
);

-- Enable RLS for bookings
alter table public.bookings enable row level security;

-- Anyone can submit a booking request (insert)
create policy "Allow public to submit bookings"
  on public.bookings for insert
  with check (true);

-- Allow reading bookings (for manager/admin or matching email)
create policy "Allow select bookings"
  on public.bookings for select
  using (true);

-- Allow updating bookings (confirm/decline)
create policy "Allow update bookings"
  on public.bookings for update
  using (true);

-- Allow delete bookings
create policy "Allow delete bookings"
  on public.bookings for delete
  using (true);


-- 2. BLOCKED DATES TABLE (Calendar Availability)
create table if not exists public.blocked_dates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  suite_id text not null, -- e.g. 'all' or 'suite-01', 'suite-02'
  date date not null,
  reason text default 'Manager Blocked'
);

-- Enable RLS for blocked dates
alter table public.blocked_dates enable row level security;

-- Anyone can view blocked dates (to see disabled dates in calendar)
create policy "Allow public to view blocked dates"
  on public.blocked_dates for select
  using (true);

-- Allow inserting blocked dates
create policy "Allow insert blocked dates"
  on public.blocked_dates for insert
  with check (true);

-- Allow deleting blocked dates (unblock)
create policy "Allow delete blocked dates"
  on public.blocked_dates for delete
  using (true);


-- 3. ROOM MEDIA TABLE (Custom Room Photos)
create table if not exists public.room_media (
  suite_id text primary key,
  main_image text not null,
  thumbnail_1 text,
  thumbnail_2 text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for room media
alter table public.room_media enable row level security;

-- Anyone can view room media
create policy "Allow public to view room media"
  on public.room_media for select
  using (true);

-- Allow insert/update room media
create policy "Allow upsert room media"
  on public.room_media for all
  using (true)
  with check (true);


-- 4. SEED INITIAL ROOM MEDIA WITH DEFAULT HIGH-RES IMAGES
insert into public.room_media (suite_id, main_image, thumbnail_1, thumbnail_2)
values
  ('suite-01', './images/suite_01_forest.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmVXCExA-ob32ts1_fTf8gb7RgAWjnyndwLBxiDTUUx6JEejxHcIPVnkzareVBtE5R0HWtiOXaVirUB_FXk4Jcl4n75VwhMq2lDAgE72N7qwf1sKMevSITp0KtCe_7Z5VRUkJqeqFco1NMJi9AJcMafLZf0gINf11b-3QmjYJVAo_dPvSkL-ebOfSvV1nqcVNDCkmn7zqqB9OG9a3un50qkJXnt94Z4JZsLNHWtnfVCDnTvKKyOyhTwA', './images/home_retreat_courtyard.jpg'),
  ('suite-02', './images/suite_02_courtyard.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnqKV8AkerRlLX-vfkQ8XJyYWyRjsNVql7oCDcgIQNg26c_2WLI8I1d9e8taJOkuLVv6bS-s-4ei0cUclS7JiUmQ6Oq7Y-URUige2VAPhQia4UyzOAzPnviPuFGTU68feLWWll19nfoKJeOA_u80UrgJQgr15F37n_whveCIlaOH--64IgOgR8mNessF2Vxma3Nu-lUdY1gUbPiDZKygl8Yofmc7ZL_b80iTnp6X7P9-dbn0co2cyhkg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFvg7aIZpji9zYR_ZkREf_xnUwKdw6nsi1j4dhnTueKSuc8JoMhzHCD8WoSfQBwBYh51LW3_bQ3pR51T4TnFXeu6Ho4zJ0oo6KQ75-_Rq4HbyMMyQ2Oev8_lklKfWps_kRAME7AH7LSFawAPBwd4Kq-KbaQVWAUZbaY84wYQVIPzzw-CwmBn8SQAXyF8RYuj9cDy4GB0hlmkX1wwtG6rvMCW45DQx00Xa-UnBPCfikXYY-m_sbER7yEQ'),
  ('suite-03', './images/suite_03_veranda.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC642FqrRSHg3z-NPc5cq5hjijl5AP_cIFHtqwCSKK7l9JBH_4JKelkbzVHzzjJQXWzuBsau5G6RBwFOFkOFUIVpPIH0A7VdOLKEv0bkw1kUDRfYFyMWpS5U7mNOVEmOLleLXf9savA1HgTBBmMTeKtITC7nYe8i4yMSgJ_GhXTyszIXSI0I_aPZrSMoKUyKJCgs3E8_ZEi2astl-6mUNZ9624-YFzMA6HrgoNva6tqFZ5jqIuIANOJIQ', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNAuWpXRBpT1KfdHKisews63K2rsJNFumSRcFEVaODBdy7_5Jf9-qCit0sXXwEl1NQllmoP2yJ5IENcoCmnq5UawgaYR-9EuK6nf1KiSNs9c_e08CQfwcq7oaXUqllEKQ8KjBC0C_ObH15JXr1rWzLMxCdYA7EUxySL4MplIEJMgj9dj6ebqslucFaMpAmNo-roK6TuP6CPgLhmRDdYAKjdalbIRP-YV4l4yxH_bvfNG8rN-d4wn9Swg'),
  ('suite-04', './images/suite_04_rooftop.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvk9yVcX_br46YarLVqEAjpfNvIBpt24gsZV9BR429-nyFkLo67iVPDV0yRC_cpqRgP_59T1s0YP2JRWm-iyRzXU6O9ZGVefKMRhH6ZxEPPXAsb-mUcfzLBwXn92M2QHns7xjGfcqn8uAMDcppDtgKRLGbcoR2tJVCvhqjy7YnC8SiLil3HIe46mhKAI_102ShwX44XpMUfiqj43SZWNe06pBGaui2Budun1-YPopv7ZBF9-5-WbtzUg', './images/exp_hydrotherapy_pool.jpg'),
  ('suite-05', './images/suite_05_flagship.jpg', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4HsHVNnHR2a1XlPycONW0MJoIujCEb8wSquiOWJQQNDUAa4Yhdhypk6rXVQxZFcPybbCtarX37TjGXBOl7-_pB7y18a9QQN2uoyE8zJUr96VxYuVRQl_DPdAtVcp4KSwBvVrkLqGRA6Gt95OX1w1fPXtTuZwhrvrRWQmK9GeBSd7MiPiPW3G9UyZUyzeAjj0IxEakGt7RkqMO_hxMbsUmalfMShVGc9h8_dGBEWnFRnYlefC34Msa5A', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE1SsVx2lM2Ksj5Pt1ahM5CMPlRYlLJZ0dTmT7ZexOvk4yqMWk02i_EcBrV64PsHJypUXynYpM_KDCR0AmnU31h0YtuaPJ8-xl4GF0fxhSw7SYe-mZAaE1oLaMNlZdoifb-hcyrPBBT-Doo5X5jwX-nqCfGKjWxROvHZL4rgFTdNzFLDXdjUegSMwRuyXE_GMaW7S9BlkCz5Glby5R4NVU4kinkfdm34-09UK8arbPbRJd78DKIb_ypQ')
on conflict (suite_id) do nothing;


-- 5. STORAGE BUCKET & POLICIES FOR ROOM PHOTOS
-- (Creates public bucket 'room-photos' and allows upload/select)
insert into storage.buckets (id, name, public)
values ('room-photos', 'room-photos', true)
on conflict (id) do update set public = true;

drop policy if exists "Allow Public Uploads to room-photos" on storage.objects;
drop policy if exists "Allow Public Select from room-photos" on storage.objects;
drop policy if exists "Allow Public Update on room-photos" on storage.objects;

create policy "Allow Public Uploads to room-photos"
  on storage.objects for insert
  with check ( bucket_id = 'room-photos' );

create policy "Allow Public Select from room-photos"
  on storage.objects for select
  using ( bucket_id = 'room-photos' );

create policy "Allow Public Update on room-photos"
  on storage.objects for update
  using ( bucket_id = 'room-photos' );

