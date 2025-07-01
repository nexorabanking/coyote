-- Migration script to add sender and recipient fields
-- Run this after the initial table creation if you have existing data

-- Add sender information columns
ALTER TABLE packages ADD COLUMN IF NOT EXISTS sender_name TEXT;

-- Add recipient fields
ALTER TABLE packages ADD COLUMN IF NOT EXISTS recipient_email TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS recipient_phone TEXT;
ALTER TABLE packages ADD COLUMN IF NOT EXISTS recipient_address TEXT;

-- Update existing records with default values if needed
-- This ensures existing packages have some data in the new required fields
UPDATE packages 
SET 
  sender_name = COALESCE(sender_name, 'Unknown Sender'),
  recipient_address = COALESCE(recipient_address, destination)
WHERE sender_name IS NULL OR recipient_address IS NULL;

-- Make the new required fields NOT NULL after populating with default values
ALTER TABLE packages ALTER COLUMN sender_name SET NOT NULL;
ALTER TABLE packages ALTER COLUMN recipient_address SET NOT NULL; 