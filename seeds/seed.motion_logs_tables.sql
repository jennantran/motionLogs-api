BEGIN;

TRUNCATE
  log_users,
  save_logs
  RESTART IDENTITY CASCADE;

INSERT INTO log_users (username, password)
VALUES
    ('jennantran','$2a$12$bfT51PX60dNdSXkX3nRTzOdpThGOlmfG6Jwba11wqEWWdJAIAQ9i2'),
    ('viethuynh','$2a$12$SroD5sKTrLbBXnQKjOVzTO2iKLR0/i71HILoDSBYaEheIE57esFy'),
    ('jillyn','$2a$12$UVW62jOFLw/Eu1MXIjfk4OKabq424J7pO85aY.guR1oBx8WcIKYqy');


INSERT INTO save_logs (log_id, wout_name, set, rep, weight, user_id, date_added)
VALUES 
    ('1','squats','1','5','100', 1,'2020-01-16 12:00:00'),
    ('2','squats','2','5','105',1,'2020-01-17 12:00:00'),
    ('3','deadlifts','1','10','200',2,'2020-03-17 12:00:00');
COMMIT;