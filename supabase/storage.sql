-- supabase/storage.sql
-- Storage policy statements for the bucket `portfolio-images`.
-- Note: Creating buckets via SQL may not be supported in all projects; create the bucket via the Supabase Dashboard (Storage -> Create new bucket)
-- Then run the policy statements below in the SQL editor (they modify the `storage.objects` policies).

-- Allow public read (SELECT) on objects in the portfolio-images bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'public_read_portfolio_images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY public_read_portfolio_images ON storage.objects FOR SELECT USING (
      bucket_id = 'portfolio-images'
    );
  END IF;
END$$;

-- Allow INSERT only for admins into portfolio-images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'admins_insert_portfolio_images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY admins_insert_portfolio_images ON storage.objects FOR INSERT WITH CHECK (
      bucket_id = 'portfolio-images' AND EXISTS (
        SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin
      )
    );
  END IF;
END$$;

-- Allow UPDATE only for admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'admins_update_portfolio_images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY admins_update_portfolio_images ON storage.objects FOR UPDATE USING (
      bucket_id = 'portfolio-images' AND EXISTS (
        SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin
      )
    );
  END IF;
END$$;

-- Allow DELETE only for admins
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'admins_delete_portfolio_images' AND tablename = 'objects'
  ) THEN
    CREATE POLICY admins_delete_portfolio_images ON storage.objects FOR DELETE USING (
      bucket_id = 'portfolio-images' AND EXISTS (
        SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.is_admin
      )
    );
  END IF;
END$$;

-- NOTE: If your Supabase project does not allow executing policies on storage.objects via SQL editor, use the Dashboard -> Storage -> Policies UI to create equivalent policies.
