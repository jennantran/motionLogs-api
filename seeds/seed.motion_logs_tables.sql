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


INSERT INTO save_logs (log_id, wout_name, set, rep, weight, modified, user_id)
VALUES 
    ('1','squats','1','5','100','2016-01-16' 1),
    ('2','squats','2','5','105','2016-05-01',1),
    ('1','deadlifts','1','10','200','2018-02-13',2);
COMMIT;