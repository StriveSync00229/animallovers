
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Allow public read access for ebooks" ON storage.objects;
CREATE POLICY "Allow public read access for ebooks"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'ebooks');



DROP POLICY IF EXISTS "Allow authenticated users to upload ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to upload ebooks"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ebooks');




DROP POLICY IF EXISTS "Allow authenticated users to update ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to update ebooks"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'ebooks');


DROP POLICY IF EXISTS "Allow authenticated users to delete ebooks" ON storage.objects;
CREATE POLICY "Allow authenticated users to delete ebooks"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'ebooks');

