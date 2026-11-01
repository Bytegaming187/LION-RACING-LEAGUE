# Anmeldung und lokale Daten

Ohne `DATABASE_URL` startet die API mit einer dauerhaften SQLite-Datenbank unter `data/league.sqlite`. Mit `DATABASE_URL` wird PostgreSQL verwendet. Ein Wechsel kopiert keine Daten automatisch zwischen den Datenbanken. Das Datenverzeichnis nicht löschen: Es enthält Konten und Ligaeinträge. Für Backups SQLite mit dem Backup-Verfahren bzw. bei gestoppter API sichern; die WAL-Dateien dürfen nicht bei laufender Datenbank ignoriert werden.

Beim ersten Start wird das Konto `admin` angelegt. Das initiale Passwort erscheint einmal im API-Terminal. Optional kann vor dem ersten Start `BOOTSTRAP_ADMIN_PASSWORD` gesetzt werden. Diese Variable setzt bestehende Passwörter nicht zurück. Nach der Anmeldung kann unter „Mein Konto“ das Passwort geändert werden. Ein Passwortwechsel beendet alle Sitzungen dieses Kontos.

Unter Administration stehen Formulare für Fahrer, Teams, Reglement, Punkteregeln, Benutzerkonten, Divisionen und Rennkalender zur Verfügung. Konto und Fahrer sind getrennt: Ein Konto ist ein Login; ein Fahrer ist ein sportlicher Teilnehmer. Einen Fahrer bitte mit seiner Spielkennung und einem Team erfassen. Ein Team hat zwei Startplätze. Die Zuordnung eines Kontos zum sportlichen Fahrerprofil ist noch kein automatischer Prozess.

Neue Installationen erhalten die zehn F1-Konstrukteure von 2025 und eine Division mit 20 Plätzen. Es werden keine echten F1-Piloten als Ligateilnehmer angelegt. Bestehende, bereits konfigurierte Ligen werden nicht überschrieben. Pro weiterer Division können Teams durch den Admin angelegt werden.

Nur Administratoren können Verwaltungsdaten ändern oder Konten anlegen. Andere Rollen können sich anmelden und das eigene Passwort ändern; ihre speziellen Arbeitsabläufe werden später ergänzt. Konten können umbenannt (Anzeigename), gesperrt, mit einer Rolle versehen oder mit einem neuen Passwort ausgestattet werden. Der letzte aktive Admin lässt sich nicht sperren oder herabstufen. Sitzungen laufen nach zwölf Stunden aus. Passwörter werden mit scrypt gehasht und Sitzungswerte nur gehasht in der Datenbank gespeichert.

Lokal läuft die API nur auf Loopback. Für einen öffentlichen Betrieb sind HTTPS und `COOKIE_SECURE=true`, ein abgestimmtes Deployment und dauerhafte Schutzmaßnahmen gegen verteilte Anmeldeversuche erforderlich. Der Login begrenzt aktuell Versuche je Benutzername im Prozessspeicher.

Teamquelle: [Formula 1 – Saisonstart 2025](https://corp.formula1.com/twenty-drivers-ten-teams-one-season-launch/).
