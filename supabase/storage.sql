insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read images" on storage.objects;
create policy "Public can read images"
on storage.objects
for select
using (bucket_id = 'images');

drop policy if exists "Admin can upload images" on storage.objects;
create policy "Admin can upload images"
on storage.objects
for insert
with check (
  bucket_id = 'images'
  and auth.jwt() ->> 'email' = 'rubexydesigns@gmail.com'
);

drop policy if exists "Admin can update images" on storage.objects;
create policy "Admin can update images"
on storage.objects
for update
using (
  bucket_id = 'images'
  and auth.jwt() ->> 'email' = 'rubexydesigns@gmail.com'
)
with check (
  bucket_id = 'images'
  and auth.jwt() ->> 'email' = 'rubexydesigns@gmail.com'
);

drop policy if exists "Admin can delete images" on storage.objects;
create policy "Admin can delete images"
on storage.objects
for delete
using (
  bucket_id = 'images'
  and auth.jwt() ->> 'email' = 'rubexydesigns@gmail.com'
);
