-- Leasly Supabase Schema

-- Users (extended from auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  avatar_url text,
  university text,
  is_verified boolean default false,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "Users can view all profiles" on public.profiles for select using (true);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Listings
create table public.listings (
  id uuid primary key default gen_random_uuid(),
  host_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  location text not null,
  university text not null,
  price_per_night integer not null,
  beds integer not null default 0,
  baths numeric not null default 1,
  date_start date not null,
  date_end date not null,
  amenities text[] default '{}',
  rules text,
  status text default 'pending' check (status in ('pending', 'active', 'inactive')),
  created_at timestamptz default now()
);

alter table public.listings enable row level security;
create policy "Anyone can view active listings" on public.listings for select using (status = 'active');
create policy "Hosts can manage own listings" on public.listings for all using (auth.uid() = host_id);

-- Listing photos
create table public.listing_photos (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade not null,
  storage_path text not null,
  sort_order integer default 0,
  created_at timestamptz default now()
);

alter table public.listing_photos enable row level security;
create policy "Anyone can view listing photos" on public.listing_photos for select using (true);
create policy "Hosts can manage own listing photos" on public.listing_photos for all
  using (exists (select 1 from public.listings where id = listing_id and host_id = auth.uid()));

-- Booking requests
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid references public.listings(id) on delete cascade not null,
  guest_id uuid references public.profiles(id) on delete cascade not null,
  check_in date not null,
  check_out date not null,
  total_price integer not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  stripe_payment_intent_id text,
  message text,
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;
create policy "Guests can view own bookings" on public.bookings for select using (auth.uid() = guest_id);
create policy "Hosts can view bookings for their listings" on public.bookings for select
  using (exists (select 1 from public.listings where id = listing_id and host_id = auth.uid()));
create policy "Guests can create bookings" on public.bookings for insert with check (auth.uid() = guest_id);

-- Waitlist
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz default now()
);

-- Storage buckets
-- Run in Supabase dashboard:
-- insert into storage.buckets (id, name, public) values ('listing-photos', 'listing-photos', true);
-- insert into storage.buckets (id, name, public) values ('lease-pdfs', 'lease-pdfs', false);
