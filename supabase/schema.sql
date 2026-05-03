-- supabase/schema.sql
-- Run this in the Supabase SQL editor to create required tables.

-- Enable pgcrypto for UUID generation (idempotent)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Profiles table: extends auth.users with is_admin flag
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users NOT NULL,
  full_name text,
  is_admin boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Portfolio table: stores portfolio items and image paths
CREATE TABLE IF NOT EXISTS public.portfolio (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  category text,
  description text,
  client text,
  year integer,
  image_url text,
  images text[] DEFAULT array[]::text[],
  created_at timestamptz DEFAULT now()
);
