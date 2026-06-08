
# JLMOONS Database Documentation

This document outlines the database structure and security policies for the JLMOONS Digital Asset Recovery platform, utilizing Supabase (PostgreSQL).

## Tables

### `recovery_requests`
Stores the technical intake data submitted by users for forensic assessment.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | uuid | Primary key (default: gen_random_uuid()) |
| `submitted_at` | timestamptz | Timestamp of submission |
| `fullName` | text | Full name of the applicant |
| `email` | text | Secure contact email |
| `phone` | text | Phone number |
| `country` | text | Geographic location |
| `recoveryType` | text | Classification of the case |
| `qualification_status` | text | Priority level |
| `message` | text | Loss narrative |
| `...` | ... | (Other technical fields as defined in the intake form) |

### `app_settings`
Stores dynamic application configuration settings managed via the Admin Portal.

| Column | Type | Description |
| :--- | :--- | :--- |
| `key` | text | Unique configuration key (Primary Key) |
| `value` | text | Configuration value |
| `updated_at` | timestamptz | Last updated timestamp |

## Supabase Storage

### `assets` Bucket
Used for direct image uploads (Hero images, Trust assets).

1.  **Creation**: Create a bucket named `assets` in the Supabase Storage dashboard.
2.  **Access**: Set the bucket to **Public**.
3.  **RLS Policies**: Ensure you have a policy that allows **Authenticated** users to `INSERT` and `UPDATE` objects, and allows **Public** (anon) users to `SELECT` (read) objects.

Example SQL for Storage RLS:
```sql
-- Allow authenticated users to upload/update
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'assets');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'assets');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'assets');

-- Allow everyone to view assets
CREATE POLICY "Public View" ON storage.objects FOR SELECT TO public USING (bucket_id = 'assets');
```

## Initial Configuration
To enable dynamic visuals, run this SQL:
```sql
INSERT INTO app_settings (key, value) 
VALUES 
('hero_image_url', 'https://picsum.photos/seed/jlmoons-hero/1200/800'),
('trust_image_1_url', 'https://picsum.photos/seed/jlmoons-expert/600/400'),
('trust_image_2_url', 'https://picsum.photos/seed/jlmoons-meeting/600/400'),
('trust_image_3_url', 'https://picsum.photos/seed/jlmoons-system/600/400')
ON CONFLICT (key) DO NOTHING;
```
