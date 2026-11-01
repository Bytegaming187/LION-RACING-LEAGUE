# Lion Racing League

Deutsches F1-25-Liga-Portal mit öffentlichem Team- und Fahrerbereich, Anmeldung, Adminverwaltung und lokaler Rohdatenerfassung.

## Lokal starten

Node.js 24 verwenden und `npm install` ausführen. Anschließend in zwei Terminals:

```text
npm run api
npm run dev
```

Webseite: http://localhost:3000 — API: http://localhost:4000/health

Ohne `.env` funktioniert die lokale Verwaltung mit SQLite (`data/league.sqlite`). Beim ersten API-Start wird ein Admin-Konto erstellt; Benutzername und zufälliges initiales Passwort erscheinen im Terminal. Nach Anmeldung unter „Mein Konto“ ein eigenes Passwort setzen. Die Datenbank enthält nur gesalzene Passworthashes.

Für PostgreSQL `.env.example` als `.env` übernehmen, `DATABASE_URL` mit passenden Zugangsdaten setzen und bei Bedarf `docker compose -f infrastructure/deployment/compose.yaml up -d` verwenden. Der Wechsel zwischen SQLite und PostgreSQL migriert bestehende Daten nicht automatisch.

## Verwaltung

Neue Installationen beginnen mit den zehn F1-Teams der Saison 2025, einer Division und freien Fahrerplätzen. Admins können über Formulare Fahrer hinzufügen, Teams zuweisen, Teams/Divisionen/Rennwochenenden bearbeiten, Reglement und Punktesystem pflegen und Konten erstellen, sperren, mit Rollen versehen oder Passwörter zurücksetzen. Ein Fahrer ist ein sportlicher Teilnehmer; ein Konto ist eine davon getrennte Anmeldung. Spielkennungen sind nur für Admins sichtbar.

Änderungen werden sofort gespeichert und protokolliert. Maximal zwei Fahrer je Team und 20 Fahrer je Division. Ein Team oder eine Division mit noch zugeordneten Fahrern kann nicht entfernt werden, bevor die Zuordnungen angepasst wurden. Der letzte aktive Admin ist vor Sperrung oder Herabstufung geschützt.

Weitere Hinweise: [Konten und Betrieb](docs/operations/accounts.md), [API](docs/api/README.md), [Architektur](docs/architecture/README.md).

## Pakete und Prüfungen

- `apps/web`: Next.js-Portal mit öffentlicher Ansicht, Login, Formularverwaltung und API-Proxy.
- `apps/api`: TypeScript-API mit PostgreSQL oder lokaler SQLite-Persistenz.
- `apps/race-control`: UDP-Collector mit signiertem Upload und persistentem Sendepuffer.
- `apps/driver-client`: gemeinsamer Collector-Einstieg, noch keine Desktop-Oberfläche.
- `packages`: Domäne, F1-Teamvorlage, Wertung, Authentifizierung und Datenverträge.

`npm test` prüft Wertung, Passwörter, echte API-Anmeldung, Rechte, Kontensperrung und Persistenz nach Neustart in einer isolierten Testdatenbank. `npm run check` prüft API/Pakete; `npm run build` prüft und baut die Web-App. Den Produktionsbuild startet `npm run start -w @lrl/web`.

## Telemetrie und verbleibende Arbeiten

`npm run collector` benötigt `DEVICE_ID` und `DEVICE_SECRET` aus `.env`. F1 25 UDP auf 127.0.0.1:20777 konfigurieren. Die App puffert Rohpakete lokal und sendet sie HMAC-signiert an die API. Events werden anhand ihrer ID dedupliziert. Die Live-Ansicht zeigt bisher Paketempfang, keine aus UDP decodierten Rennpositionen.

Der echte F1-Decoder, automatische Sessionabschlüsse, mehrdimensionale Meisterschaften, Teamwechselhistorie, Replay, Einladungen, spezielle Rechteabläufe für Nicht-Admins, Datenschutzexport/-löschung und Windows-Installer mit Updates stehen aus. Ergebnisberechnungen lassen sich bisher über die API einreichen. Roharchiv und Sendepuffer sind unlimitiert; vor längerem Rennbetrieb sind Batch-Übertragung, Kompression und Speicherbudget erforderlich. Öffentliche Bereitstellung benötigt HTTPS, sichere Cookies und weitere Betriebsabsicherung. Lokal läuft die API auf Loopback.
