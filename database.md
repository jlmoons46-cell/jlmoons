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
| `recoveryType` | text | Classification of the case (e.g., wallet_recovery, loan_scam) |
| `qualification_status` | text | Priority level (priority, standard, low_threshold) |
| `message` | text | Loss narrative and technical description |
| `walletType` | text | (Optional) Software/Hardware wallet name |
| `walletIssueType` | text | (Optional) Nature of access failure |
| `availableMaterials` | text[] | (Optional) Array of items held (seed, backup, etc.) |
| `estimatedAssetValue` | text | (Optional) Value of lost assets |
| `exchangeName` | text | (Optional) Name of scam exchange |
| `platformUrl` | text | (Optional) URL of the fraudulent platform |
| `totalDeposited` | text | (Optional) Amount deposited in scams |
| `brokerName` | text | (Optional) Name of fraudulent broker |
| `metWhere` | text | (Optional) Source of contact (social media/dating) |
| `investWalletAddress` | text | (Optional) Destination wallet address of stolen funds |
| `loanLenderName` | text | (Optional) Fraudulent loan company name |
| `loanTransactionDetails` | text | (Optional) TXIDs or payment markers |
| `loanEvidenceItems` | text[] | (Optional) Types of evidence held |

### `app_settings`
Stores dynamic application configuration settings managed via the Admin Portal.

| Column | Type | Description |
| :--- | :--- | :--- |
| `key` | text | Unique configuration key (Primary Key) |
| `value` | text | Configuration value |
| `updated_at` | timestamptz | Last updated timestamp |

## Security Protocols (RLS)

### 1. `recovery_requests`
- **Anonymous Submissions**: `Enable insert for anonymous users` (INSERT ONLY).
- **Administrative Access**: `Enable all for admin role` (SELECT/UPDATE/DELETE for *@jlmoons.com emails).

### 2. `app_settings`
- **Public Read Access**: `Enable read for all users`
  - **SQL**: `CREATE POLICY "Allow public read" ON app_settings FOR SELECT USING (true);`
- **Administrative Write Access**: `Enable all for admin role`
  - **SQL**: `CREATE POLICY "Allow admin manage" ON app_settings FOR ALL TO authenticated USING (auth.jwt() ->> 'email' LIKE '%@jlmoons.com');`

## Initial Configuration
To enable dynamic hero images, run this SQL:
```sql
INSERT INTO app_settings (key, value) 
VALUES ('hero_image_url', 'https://picsum.photos/seed/jlmoons-hero/1200/800')
ON CONFLICT (key) DO NOTHING;
```