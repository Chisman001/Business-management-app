-- ============================================================
-- Textile Business App — Supabase SQL Schema
-- Copy and run this in your Supabase SQL Editor
-- ============================================================

-- Products table
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10, 2) not null check (price >= 0),
  category text not null,
  created_at timestamptz default now() not null
);

-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  price numeric(10, 2) not null check (price >= 0),
  quantity integer not null default 1 check (quantity >= 1),
  category text not null,
  customer_id uuid references customers(id) on delete set null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz default now() not null
);

-- ============================================================
-- Migration: run these if the products table already exists
-- ============================================================
alter table products
  add column if not exists stock_quantity integer not null default 0 check (stock_quantity >= 0);

-- ============================================================
-- Migration: run these if the orders table already exists
-- ============================================================
-- alter table orders
--   add column if not exists customer_id uuid references customers(id) on delete set null,
--   add column if not exists status text not null default 'pending'
--     check (status in ('pending', 'confirmed', 'completed', 'cancelled'));
--
-- Optional: mark all pre-existing orders as completed so they count toward revenue
-- update orders set status = 'completed' where status = 'pending';

alter table orders
  add column if not exists quantity integer not null default 1 check (quantity >= 1);

-- Customers table
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone_number text not null,
  created_at timestamptz default now() not null
);

-- ============================================================
-- Enable Row Level Security (enable before adding auth later)
-- ============================================================
alter table products enable row level security;
alter table orders enable row level security;
alter table customers enable row level security;

-- Temporary permissive policies (remove and replace with auth policies when login is added)
create policy "Allow all on products" on products for all using (true) with check (true);
create policy "Allow all on orders" on orders for all using (true) with check (true);
create policy "Allow all on customers" on customers for all using (true) with check (true);
