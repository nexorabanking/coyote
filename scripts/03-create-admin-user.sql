-- Create admin user with properly hashed password
-- This script will create an admin user with email: admin@coyotelogistics.com and password: admin123

DO $$
DECLARE
    hashed_password TEXT;
BEGIN
    -- Generate bcrypt hash for password 'admin123'
    -- Using bcrypt with salt rounds = 10
    hashed_password := crypt('Nexora_01', gen_salt('bf', 10));
    
    -- Insert or update admin user
    INSERT INTO admin_users (email, password_hash, full_name) 
    VALUES ('support@shipcoyotelogistics.com', hashed_password, 'Admin User')
    ON CONFLICT (email) 
    DO UPDATE SET 
        password_hash = hashed_password,
        full_name = 'Admin User',
        updated_at = NOW();
        
    RAISE NOTICE 'Admin user created/updated successfully';
END $$;
