SELECT DATABASE();
USE patient;
CREATE TABLE IF NOT EXISTS patient_record(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    height INT,
    weight INT
);
INSERT INTO patient_record (name, age, height, weight)
VALUES
    ('hassan shah', 32, 157, 70),
    ('ahmed khan', 25, 175, 68),
    ('ali', 28, 180, 75);
SELECT * FROM patient_record;
