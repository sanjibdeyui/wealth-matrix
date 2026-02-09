-- Create the billing_details table to store paid user details and transactions
create table public.billing_details (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  full_name text not null,
  address text,
  city text,
  country text,
  last_4_digits text,
  plan_purchased text,
  amount numeric,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.billing_details enable row level security;

-- Create policy to allow users to insert their own billing details
create policy "Users can insert their own billing details"
  on public.billing_details for insert
  with check (auth.uid() = user_id);

-- Create policy to allow users to view their own billing details
create policy "Users can view their own billing details"
  on public.billing_details for select
  using (auth.uid() = user_id);

-- Create policy to allow users to delete their own billing details
create policy "Users can delete their own billing details"
  on public.billing_details for delete
  using (auth.uid() = user_id);

-- Create policy to allow users to update their own billing details
create policy "Users can update their own billing details"
  on public.billing_details for update
  using (auth.uid() = user_id);
