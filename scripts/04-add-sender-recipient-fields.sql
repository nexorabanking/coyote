-- Migration script to add sender and recipient address fields
-- Run this after the initial table creation if you have existing data

-- Add sender information columns
ALTER TABLE packages ADD COLUMN IF NOT EXISTS sender_name TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS sender_email TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS sender_phone TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS sender_address TEXT;

-- Add recipient address column
ALTER TABLE packages ADD COLUMN IF NOT EXISTS recipient_address TEXT;

-- Update existing records with default values if needed
-- This ensures existing packages have some data in the new required fields
UPDATE packages 
SET 
  sender_name = COALESCE(sender_name, 'Unknown Sender'),
  sender_address = COALESCE(sender_address, 'Unknown Address'),
  recipient_address = COALESCE(recipient_address, destination)
WHERE sender_name IS NULL OR sender_address IS NULL OR recipient_address IS NULL;

-- Make the new required fields NOT NULL after populating with default values
ALTER TABLE packages ALTER COLUMN sender_name SET NOT NULL;
ALTER TABLE packages ALTER COLUMN sender_address SET NOT NULL;
ALTER TABLE packages ALTER COLUMN recipient_address SET NOT NULL; 