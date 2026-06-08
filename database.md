
# JLMOONS Database Documentation

This document outlines the database structure and security policies for the JLMOONS Digital Asset Recovery platform.

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

ALTER TABLE recovery_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Insert" ON recovery_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin View" ON recovery_requests FOR SELECT TO authenticated USING (true);
```

### `app_settings`
Stores dynamic application configuration settings (hero images, trust indicators).

```sql
CREATE TABLE IF NOT EXISTS app_settings (
  key text PRIMARY KEY,
  value text,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Settings" ON app_settings FOR SELECT TO public USING (true);
CREATE POLICY "Admin Manage Settings" ON app_settings FOR ALL TO authenticated USING (true);
```

### `articles`
Stores educational resources for the Knowledge Hub.

```sql
CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  content text,
  tag text,
  image_url text,
  slug text UNIQUE,
  is_published boolean DEFAULT true
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Articles" ON articles FOR SELECT TO public USING (is_published = true);
CREATE POLICY "Admin Manage Articles" ON articles FOR ALL TO authenticated USING (true);
```

## Storage

### `assets` Bucket
Used for images. Ensure the bucket is **Public**.

```sql
-- Required Storage Policies
CREATE POLICY "Admin Assets Manage" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'assets');
CREATE POLICY "Public Assets View" ON storage.objects FOR SELECT TO public USING (bucket_id = 'assets');
```
