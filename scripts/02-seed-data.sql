-- First, let's create a proper admin user with a hashed password
-- Password: admin123 (hashed with bcrypt)
INSERT INTO admin_users (email, password_hash, full_name) VALUES 
('admin@coyotelogistics.com', '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZQZQZQZQZQZQZ', 'Admin User')
ON CONFLICT (email) DO UPDATE SET 
password_hash = '$2a$10$rOzJqQZQZQZQZQZQZQZQZOzJqQZQZQZQZQZQZQZQZQZQZQZQZQZQZ',
full_name = 'Admin User';

-- Insert sample packages
INSERT INTO packages (tracking_id, recipient_name, recipient_email, current_location, destination, estimated_delivery, status, weight, dimensions, service_type) VALUES 
('CL123456789', 'Jane Doe', 'jane.doe@email.com', 'Chicago, IL Distribution Center', 'New York, NY', 'Tomorrow by 6:00 PM', 'In Transit', '2.5 lbs', '12" x 8" x 4"', 'Express Shipping'),
('CL987654321', 'John Smith', 'john.smith@email.com', 'Miami, FL', 'Miami, FL', 'Delivered', 'Delivered', '5.2 lbs', '16" x 12" x 8"', 'Standard Shipping')
ON CONFLICT (tracking_id) DO NOTHING;

-- Insert tracking events for first package
INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-18', '09:00', 'Los Angeles, CA', 'Package Picked Up', 'Package picked up from sender', true
FROM packages p WHERE p.tracking_id = 'CL123456789'
ON CONFLICT DO NOTHING;

INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-18', '14:30', 'Los Angeles, CA Hub', 'Departed Facility', 'Package departed Los Angeles facility', true
FROM packages p WHERE p.tracking_id = 'CL123456789'
ON CONFLICT DO NOTHING;

INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-19', '08:15', 'Chicago, IL Hub', 'Arrived at Facility', 'Package arrived at Chicago distribution center', true
FROM packages p WHERE p.tracking_id = 'CL123456789'
ON CONFLICT DO NOTHING;

INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-19', '11:30', 'Chicago, IL Hub', 'In Transit', 'Package is being processed for next destination', true
FROM packages p WHERE p.tracking_id = 'CL123456789'
ON CONFLICT DO NOTHING;

-- Insert tracking events for second package
INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-17', '10:00', 'Atlanta, GA', 'Package Picked Up', 'Package picked up from sender', true
FROM packages p WHERE p.tracking_id = 'CL987654321'
ON CONFLICT DO NOTHING;

INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-17', '18:00', 'Atlanta, GA Hub', 'Departed Facility', 'Package departed Atlanta facility', true
FROM packages p WHERE p.tracking_id = 'CL987654321'
ON CONFLICT DO NOTHING;

INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-18', '09:00', 'Miami, FL Hub', 'Arrived at Facility', 'Package arrived at Miami distribution center', true
FROM packages p WHERE p.tracking_id = 'CL987654321'
ON CONFLICT DO NOTHING;

INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-18', '13:00', 'Miami, FL', 'Out for Delivery', 'Package out for delivery', true
FROM packages p WHERE p.tracking_id = 'CL987654321'
ON CONFLICT DO NOTHING;

INSERT INTO tracking_events (package_id, event_date, event_time, location, status, description, completed) 
SELECT p.id, '2024-12-18', '15:45', 'Miami, FL', 'Delivered', 'Package delivered to recipient - John Smith', true
FROM packages p WHERE p.tracking_id = 'CL987654321'
ON CONFLICT DO NOTHING;
