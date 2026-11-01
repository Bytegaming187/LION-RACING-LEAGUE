# Lokale API v1

`GET /health`, `GET /v1/league`, `GET /v1/results` sind öffentlich. `GET /v1/live` liefert SSE mit Verbindungs-/Empfangsstatus und Ergebnisbenachrichtigungen. Rohpakete werden nicht öffentlich ausgestrahlt.

`PUT /v1/league` ersetzt validierte Ligadaten atomar mit Audit-Eintrag. `GET /v1/audit` zeigt die letzten 100 Änderungen. Beide benötigen `Authorization: Bearer <ADMIN_TOKEN>`.

`POST /v1/results` benötigt denselben Token und `{sessionId, reason, results, penalties}`. Ergebnisse: `{driverId, teamId, laps, timeMs, status, fastestLap?}`. Strafen: `{id,driverId,sessionId,kind,value,reason}`. Zeiten in Millisekunden, Zeitstrafen in Sekunden; Status `finished`, `dnf`, `dsq`; Strafarten `time`, `positions`, `points`, `dsq`. Punkte werden synchron berechnet. Teamzuordnung wird gegen aktuelle Stammdaten geprüft. Saison- und divisionenbezogene Zuordnung muss vor echtem Ligabetrieb ergänzt werden.

`POST /v1/telemetry` nimmt `TelemetryEnvelope` aus `packages/api-contracts` entgegen. `X-Signature` enthält HMAC-SHA256 (Hex) über die exakt übertragenen UTF-8-JSON-Bytes. Wiederholte eventId wird mit 202 und `duplicate: true` bestätigt. Keine zeitliche Ablehnung alter Events, damit Offline-Nachlieferung möglich bleibt. Format 2025 wird angenommen; semantische Dekodierung steht aus.
