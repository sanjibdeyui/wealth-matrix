-- Add new columns for billing details
ALTER TABLE billing_details
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN zip_code TEXT,
ADD COLUMN state TEXT;
