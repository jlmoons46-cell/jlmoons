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

## Security Protocols (RLS)

Row Level Security (RLS) must be enabled on the `recovery_requests` table to ensure forensic confidentiality.

### 1. Anonymous Submissions
**Policy:** `Enable insert for anonymous users`
- **Definition:** Allows the public to submit recovery requests via the website form.
- **SQL:**
  ```sql
  CREATE POLICY "Allow anonymous insert" 
  ON recovery_requests 
  FOR INSERT 
  WITH CHECK (true);
  ```

### 2. Administrative Access
**Policy:** `Enable all for admin role`
- **Definition:** Restricts read, update, and delete access to authenticated investigators.
- **Role Verification:** Access is controlled by checking the authenticated user's email or a custom claim.
- **SQL (Email-based example):**
  ```sql
  CREATE POLICY "Allow admin full access" 
  ON recovery_requests 
  FOR ALL 
  TO authenticated 
  USING (auth.jwt() ->> 'email' LIKE '%@jlmoons.com');
  ```

## Admin Role Initialization

To grant an investigator access to the **Forensic Intelligence Dashboard**:

1. Create a user account in **Supabase Auth**.
2. Ensure the email used ends in `@jlmoons.com` (as per the RLS policy above).
3. The investigator can then initialize a session at `/admin/login`.

---
*Confidentiality Note: All technical data stored in this database is considered sensitive forensic evidence.*