BEGIN;

TRUNCATE
  log_users,
  save_logs
  RESTART IDENTITY CASCADE;

INSERT INTO log_users (username, password)
VALUES
    ('jennantran','password1'),
    ('viethuynh','password2'),
    ('jillyn','password3');


INSERT INTO save_logs (log_id, wout_name, set, rep, weight, user_id, date_added)
VALUES 
    ('1','squats','1','5','100', 1,'2020-01-16'),
    ('2','squats','2','5','105',1,'2020-01-17'),
    ('1','deadlifts','1','10','200',2,'2020-02-17'));
COMMIT;