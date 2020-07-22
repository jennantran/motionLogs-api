CREATE TABLE save_logs(
    log_id TEXT,
    wout_name TEXT NOT NULL,
    set INTEGER NOT NULL,
    rep INTEGER NOT NULL,
    weight INTEGER NOT NULL,
    user_id INTEGER 
        REFERENCES log_users(id) ON DELETE CASCADE NOT NULL,
    modified TIMESTAMPTZ DEFAULT now() NOT NULL
);