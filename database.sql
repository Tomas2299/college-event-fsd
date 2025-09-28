-- HENOSIS 2K25 - ULTIMATE DATABASE SCHEMA
-- Run this in phpMyAdmin or MySQL

-- Create Database
CREATE DATABASE IF NOT EXISTS henosis2k25_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE henosis2k25_db;

-- Users Registration Table
CREATE TABLE IF NOT EXISTS registrations (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    college VARCHAR(200) NOT NULL,
    event VARCHAR(100) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
    neural_id VARCHAR(50) UNIQUE,
    sync_status ENUM('synced', 'pending', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_email (email),
    INDEX idx_neural_id (neural_id),
    INDEX idx_registration_date (registration_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id INT(11) NOT NULL AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    description TEXT,
    prize_amount DECIMAL(10,2) DEFAULT 0.00,
    duration_hours INT(11) DEFAULT 24,
    max_participants INT(11) DEFAULT 100,
    current_participants INT(11) DEFAULT 0,
    start_date DATETIME,
    end_date DATETIME,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_event_type (event_type),
    INDEX idx_start_date (start_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Neural Activity Logs
CREATE TABLE IF NOT EXISTS neural_activity (
    id INT(11) NOT NULL AUTO_INCREMENT,
    user_id INT(11),
    activity_type VARCHAR(50) NOT NULL,
    activity_data JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES registrations(id) ON DELETE SET NULL,
    INDEX idx_activity_type (activity_type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- System Stats
CREATE TABLE IF NOT EXISTS system_stats (
    id INT(11) NOT NULL AUTO_INCREMENT,
    stat_name VARCHAR(50) NOT NULL UNIQUE,
    stat_value BIGINT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY unique_stat_name (stat_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Initial Events Data
INSERT INTO events (event_name, event_type, description, prize_amount, duration_hours, max_participants, start_date, end_date) VALUES
('AI Neural Hackathon', 'hackathon', '48-hour neural interface coding marathon with mind-bending challenges', 300000.00, 48, 200, '2025-12-15 09:00:00', '2025-12-17 09:00:00'),
('VR Data Universe', 'vr', 'Navigate through virtual data dimensions in spectacular VR', 200000.00, 24, 100, '2025-12-15 10:00:00', '2025-12-16 10:00:00'),
('Quantum ML Lab', 'quantum', 'Quantum machine learning experiments beyond imagination', 150000.00, 16, 50, '2025-12-15 11:00:00', '2025-12-16 03:00:00'),
('Brain-Computer Interface', 'bci', 'Direct neural connections to computing systems', 250000.00, 36, 75, '2025-12-15 12:00:00', '2025-12-17 00:00:00');

-- Insert Initial System Stats
INSERT INTO system_stats (stat_name, stat_value) VALUES
('total_registrations', 3247),
('neural_nodes_active', 187),
('sync_rate_percent', 998),
('quantum_links', 156),
('ai_protocols', 48);

-- Create Triggers for Auto-updating Stats
DELIMITER //

CREATE TRIGGER update_registration_count 
    AFTER INSERT ON registrations
    FOR EACH ROW
BEGIN
    UPDATE system_stats SET stat_value = stat_value + 1 WHERE stat_name = 'total_registrations';
END//

CREATE TRIGGER generate_neural_id 
    BEFORE INSERT ON registrations
    FOR EACH ROW
BEGIN
    SET NEW.neural_id = CONCAT('NEURAL_', UPPER(SUBSTRING(MD5(CONCAT(NEW.email, NOW())), 1, 8)));
END//

DELIMITER ;

-- Create Views for Easy Data Access
CREATE VIEW active_registrations AS
SELECT 
    r.id,
    r.name,
    r.email,
    r.phone,
    r.college,
    e.event_name,
    e.event_type,
    r.neural_id,
    r.sync_status,
    r.registration_date
FROM registrations r
JOIN events e ON r.event = e.event_type
WHERE r.status = 'active';

-- Create View for Event Statistics
CREATE VIEW event_statistics AS
SELECT 
    e.event_name,
    e.event_type,
    e.prize_amount,
    e.max_participants,
    COUNT(r.id) as current_registrations,
    ROUND((COUNT(r.id) / e.max_participants) * 100, 2) as fill_percentage
FROM events e
LEFT JOIN registrations r ON e.event_type = r.event
GROUP BY e.id, e.event_name, e.event_type, e.prize_amount, e.max_participants;
