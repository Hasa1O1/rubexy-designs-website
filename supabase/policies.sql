-- supabase/policies.sql
-- Run this AFTER running schema.sql. These policies enable RLS and allow only admins to modify portfolio rows.

-- Enable Row Level Security
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.portfolio ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- Allow users to SELECT their own profile
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'select_own_profile' AND tablename = 'profiles'
  ) THEN
    CREATE POLICY select_own_profile ON public.profiles FOR SELECT USING (auth.uid() = id);
  END IF;
END$$;

-- Allow users to INSERT their own profile (only when auth.uid() = id)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'insert_own_profile' AND tablename = 'profiles'
  ) THEN
    CREATE POLICY insert_own_profile ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
  END IF;
END$$;

-- Prevent users from making themselves admin via policy; admins must be set manually by a service or via dashboard.

-- Portfolio policies
-- Allow public SELECT on portfolio
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'public_select_portfolio' AND tablename = 'portfolio'
  ) THEN
    CREATE POLICY public_select_portfolio ON public.portfolio FOR SELECT USING (true);
  END IF;
END$$;

-- Allow INSERT only for authenticated admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'admins_insert_portfolio' AND tablename = 'portfolio'
  ) THEN
    CREATE POLICY admins_insert_portfolio ON public.portfolio FOR INSERT WITH CHECK (
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin)
    );
  END IF;
END$$;

-- Allow UPDATE only for authenticated admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'admins_update_portfolio' AND tablename = 'portfolio'
  ) THEN
    CREATE POLICY admins_update_portfolio ON public.portfolio FOR UPDATE USING (
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin)
    );
  END IF;
END$$;

-- Allow DELETE only for authenticated admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'admins_delete_portfolio' AND tablename = 'portfolio'
  ) THEN
    CREATE POLICY admins_delete_portfolio ON public.portfolio FOR DELETE USING (
      EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin)
    );
  END IF;
END$$;
