# Production checklist (critical)

## 1) Secrets on Vercel (do not commit .env.local)
Set these in **Vercel → Project → Settings → Environment Variables**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only; never expose in client)
- `RESEND_API_KEY`
- `EMAIL_FROM` (use your domain, e.g. `admin@gauriboutique.in`)
- `NEXT_DISABLE_TURBOPACK=1`

If `.env.local` was ever committed, rotate keys in Supabase/Resend and remove it
from git history.

## 2) Run RLS SQL in Supabase
Open **Supabase → SQL Editor** and run:

```
-- from supabase/rls_admin.sql
```

This enables:
- `profiles`: users can read their own role
- `collections`: public read, admin write
- `items`: admin-only
- `orders`: user read own, admin read/update all

## 3) Set admin users
In `public.profiles`, set `role = 'admin'` for your admin user(s).

## 4) Verify triggers for items → collections.sizes
Ensure your `items` triggers (`sync_collection_sizes` / `update_collection_sizes`)
exist and are enabled.
