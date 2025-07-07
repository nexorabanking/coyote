-- Disable RLS on packages table to allow admin operations
ALTER TABLE packages DISABLE ROW LEVEL SECURITY;

-- Disable RLS on tracking_events table to allow admin operations
ALTER TABLE tracking_events DISABLE ROW LEVEL SECURITY;

-- Disable RLS on admin_users table to allow admin operations
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Alternative: If you want to keep RLS enabled, you can create policies instead:
-- CREATE POLICY "Allow all operations for authenticated users" ON packages
--     FOR ALL USING (true) WITH CHECK (true);

-- CREATE POLICY "Allow all operations for authenticated users" ON tracking_events
--     FOR ALL USING (true) WITH CHECK (true);

-- CREATE POLICY "Allow all operations for authenticated users" ON admin_users
--     FOR ALL USING (true) WITH CHECK (true); 