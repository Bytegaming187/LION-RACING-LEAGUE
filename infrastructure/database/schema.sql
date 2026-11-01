CREATE TABLE IF NOT EXISTS league_state (id integer PRIMARY KEY CHECK (id=1), body jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS audit_log (id bigserial PRIMARY KEY, at timestamptz NOT NULL DEFAULT now(), actor text NOT NULL, action text NOT NULL, body jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS telemetry_events (event_id uuid PRIMARY KEY, device_id text NOT NULL, captured_at timestamptz NOT NULL, received_at timestamptz NOT NULL DEFAULT now(), body jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS session_results (session_id text PRIMARY KEY, body jsonb NOT NULL);
CREATE TABLE IF NOT EXISTS accounts (id text PRIMARY KEY, username text NOT NULL UNIQUE, name text NOT NULL, role text NOT NULL, password_hash text NOT NULL, active integer NOT NULL DEFAULT 1);
CREATE TABLE IF NOT EXISTS login_sessions (token_hash text PRIMARY KEY, account_id text NOT NULL REFERENCES accounts(id), expires_at text NOT NULL);
