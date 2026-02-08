-- Enable RLS and define admin helper
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- Profiles: user can read their own role
alter table public.profiles enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles
for select
using (id = auth.uid());

-- Collections: public read, admin write
alter table public.collections enable row level security;

drop policy if exists collections_select_all on public.collections;
create policy collections_select_all
on public.collections
for select
using (true);

drop policy if exists collections_admin_write on public.collections;
create policy collections_admin_write
on public.collections
for insert
with check (public.is_admin());

drop policy if exists collections_admin_update on public.collections;
create policy collections_admin_update
on public.collections
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists collections_admin_delete on public.collections;
create policy collections_admin_delete
on public.collections
for delete
using (public.is_admin());

-- Items: admin only
alter table public.items enable row level security;

drop policy if exists items_admin_select on public.items;
create policy items_admin_select
on public.items
for select
using (public.is_admin());

drop policy if exists items_admin_insert on public.items;
create policy items_admin_insert
on public.items
for insert
with check (public.is_admin());

drop policy if exists items_admin_update on public.items;
create policy items_admin_update
on public.items
for update
using (public.is_admin())
with check (public.is_admin());

drop policy if exists items_admin_delete on public.items;
create policy items_admin_delete
on public.items
for delete
using (public.is_admin());

-- Orders: user can read their own, admin can read/update all
alter table public.orders enable row level security;

drop policy if exists orders_select_own_or_admin on public.orders;
create policy orders_select_own_or_admin
on public.orders
for select
using (user_id = auth.uid() or public.is_admin());

drop policy if exists orders_admin_update on public.orders;
create policy orders_admin_update
on public.orders
for update
using (public.is_admin())
with check (public.is_admin());
