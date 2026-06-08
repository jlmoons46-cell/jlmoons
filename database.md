
# JLMOONS Database Documentation

This document outlines the database structure and security policies for the JLMOONS Digital Asset Recovery platform, utilizing Supabase (PostgreSQL).

## Tables

### `recovery_requests`
Stores the technical intake data submitted by users for forensic assessment.

```sql
CREATE TABLE recovery_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_at timestamptz DEFAULT now(),
  fullName text,
  email text,
  phone text,
  country text,
  recoveryType text,
  qualification_status text,
  message text,
  -- Add other dynamic fields as needed
  walletType text,
  walletIssueType text,
  availableMaterials text[],
  estimatedAssetValue text,
  exchangeName text,
  platformUrl text,
  withdrawalBlocked text,
  feesRequested text,
  totalDeposited text,
  brokerName text,
  brokerCountry text,
  brokerWebsite text,
  brokerDeposited text,
  brokerLoginAccess text,
  brokerWithdrawalRequested text,
  metWhere text,
  askedToInvest text,
  romancePlatform text,
  romanceLoss text,
  romanceWallet text,
  investPlatformName text,
  investPlatformUrl text,
  investAmount text,
  investCrypto text,
  investWalletAddress text,
  investLastTransferDate text,
  investStillCommunicating text,
  loanLenderName text,
  loanLenderWebsite text,
  loanLenderCountry text,
  loanDiscoveryMethod text,
  loanUpfrontFeesPaid text,
  loanTotalPaid text,
  loanCurrency text,
  loanFundDestination text,
  loanTransactionDetails text,
  loanEvidenceItems text[],
  loanCurrentStatus text
);

-- Enable RLS
ALTER TABLE recovery_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (Submit form)
CREATE POLICY "Public Insert" ON recovery_requests FOR INSERT TO public WITH CHECK (true);

-- Policy: Only authenticated admins can view
CREATE POLICY "Admin View" ON recovery_requests FOR SELECT TO authenticated USING (true);
```

### `app_settings`
Stores dynamic application configuration settings managed via the Admin Portal.

```sql
CREATE TABLE app_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read (Landing page)
CREATE POLICY "Public Read Settings" ON app_settings FOR SELECT TO public USING (true);

-- Policy: Only authenticated admins can modify
CREATE POLICY "Admin Manage Settings" ON app_settings FOR ALL TO authenticated USING (true);

-- Initial Setup
INSERT INTO app_settings (key, value) 
VALUES 
('hero_image_url', 'https://picsum.photos/seed/jlmoons-hero/1200/800'),
('trust_image_1_url', 'https://picsum.photos/seed/jlmoons-expert/600/400'),
('trust_image_2_url', 'https://picsum.photos/seed/jlmoons-meeting/600/400'),
('trust_image_3_url', 'https://picsum.photos/seed/jlmoons-system/600/400')
ON CONFLICT (key) DO NOTHING;
```

## Supabase Storage

### `assets` Bucket
Used for direct image uploads (Hero images, Trust assets).

1.  **Creation**: Create a bucket named `assets` in the Supabase Storage dashboard.
2.  **Access**: Set the bucket to **Public**.
3.  **RLS Policies**: Run the following SQL to allow admins to manage files.

```sql
-- Allow authenticated users to manage objects in 'assets'
CREATE POLICY "Admin Assets Manage" ON storage.objects FOR ALL TO authenticated 
USING (bucket_id = 'assets')
WITH CHECK (bucket_id = 'assets');

-- Allow everyone to view assets
CREATE POLICY "Public Assets View" ON storage.objects FOR SELECT TO public 
USING (bucket_id = 'assets');
```
