-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table
create table if not exists public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  name text,
  is_admin boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Drop existing subscriptions if migrating from Part 2, then recreate
drop table if exists public.subscriptions;

-- Create subscriptions table (Updated for Stripe)
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null unique,
  status text not null,
  plan text not null,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create api_keys table for storing encrypted keys per user
create table if not exists public.api_keys (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  provider text not null, -- e.g., 'openai', 'anthropic', 'telegram'
  encrypted_key text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, provider)
);

-- Create ai_usage table for tracking usage
create table if not exists public.ai_usage (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  provider text not null,
  model text not null,
  tokens_used integer not null,
  request_timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user preferences table
create table if not exists public.user_preferences (
  user_id uuid references public.users(id) on delete cascade not null primary key,
  preferred_model text,
  telegram_open_dm boolean default false not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create telegram_messages table for tracking activity
create table if not exists public.telegram_messages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  chat_id text not null,
  is_bot boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create instances table (for AI tools/workspaces/deployments)
create table if not exists public.instances (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  status text not null default 'active',
  url text,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.api_keys enable row level security;
alter table public.ai_usage enable row level security;
alter table public.user_preferences enable row level security;
alter table public.telegram_messages enable row level security;
alter table public.instances enable row level security;

-- Policies for users table
drop policy if exists "Users can view their own profile." on public.users;
create policy "Users can view their own profile."
  on public.users for select
  using ( auth.uid() = id );

drop policy if exists "Admins can view all profiles." on public.users;
create policy "Admins can view all profiles."
  on public.users for select
  using ( 
    exists (
      select 1 from public.users
      where id = auth.uid() and is_admin = true
    )
  );

drop policy if exists "Users can update their own profile." on public.users;
create policy "Users can update their own profile."
  on public.users for update
  using ( auth.uid() = id );

-- Policies for subscriptions table
drop policy if exists "Users can view their own subscriptions." on public.subscriptions;
create policy "Users can view their own subscriptions."
  on public.subscriptions for select
  using ( auth.uid() = user_id );

drop policy if exists "Admins can view all subscriptions." on public.subscriptions;
create policy "Admins can view all subscriptions."
  on public.subscriptions for select
  using ( 
    exists (
      select 1 from public.users
      where id = auth.uid() and is_admin = true
    )
  );

-- Allow service role to insert/update subscriptions
drop policy if exists "Service role can manage subscriptions." on public.subscriptions;
create policy "Service role can manage subscriptions."
  on public.subscriptions for all
  using ( true )
  with check ( true );

-- Policies for api_keys table
drop policy if exists "Users can manage their own API keys." on public.api_keys;
create policy "Users can manage their own API keys."
  on public.api_keys for all
  using ( auth.uid() = user_id );

-- Policies for ai_usage table
drop policy if exists "Users can view their own usage." on public.ai_usage;
create policy "Users can view their own usage."
  on public.ai_usage for select
  using ( auth.uid() = user_id );

drop policy if exists "Service role can insert usage." on public.ai_usage;
create policy "Service role can insert usage."
  on public.ai_usage for insert
  with check ( true );

-- Policies for user_preferences table
drop policy if exists "Users can manage their own preferences." on public.user_preferences;
create policy "Users can manage their own preferences."
  on public.user_preferences for all
  using ( auth.uid() = user_id );

-- Policies for telegram_messages table
drop policy if exists "Service role can manage telegram messages." on public.telegram_messages;
create policy "Service role can manage telegram messages."
  on public.telegram_messages for all
  using ( true )
  with check ( true );

-- Policies for instances table
drop policy if exists "Users can manage their own instances." on public.instances;
create policy "Users can manage their own instances."
  on public.instances for all
  using ( auth.uid() = user_id );

drop policy if exists "Admins can view all instances." on public.instances;
create policy "Admins can view all instances."
  on public.instances for select
  using ( 
    exists (
      select 1 from public.users
      where id = auth.uid() and is_admin = true
    )
  );

-- Function to handle new user creation automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name');
  
  insert into public.user_preferences (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- Create purchases table for boilerplate sales tracking
create table if not exists public.purchases (
  id uuid default uuid_generate_v4() primary key,
  github_username text not null,
  stripe_session_id text not null unique,
  purchase_timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  invite_status text not null default 'pending', -- 'pending', 'sent', 'failed'
  error_message text
);

-- Set up Row Level Security (RLS) for purchases
alter table public.purchases enable row level security;

-- Only service role can manage purchases (since we don't have user auth for buyers)
drop policy if exists "Service role can manage purchases." on public.purchases;
create policy "Service role can manage purchases."
  on public.purchases for all
  using ( true )
  with check ( true );
