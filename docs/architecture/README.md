# Architektur und weitere Phasen

Next.js → lokaler API-Proxy → TypeScript-API → PostgreSQL. UDP → Windows-Collector → atomare Spool-Dateien → HMAC-signierter HTTP-Upload → dedupliziertes Roharchiv. SSE meldet Empfang und Ergebnisänderungen. Der Collector löscht eine Pufferdatei erst nach erfolgreicher Serverbestätigung; ein Absturz danach erzeugt höchstens eine deduplizierte Wiederholung.

Nächste fachliche Schritte: verifizierte EA-Spezifikation und binäre Testpakete beschaffen; Session-/Teilnehmer-/Ergebnisdecoder implementieren; Konflikte zwischen Host- und Fahrerpaketen über Gerätequelle, Session-ID und Frame auflösen; erst danach automatische Sessionabschlüsse veröffentlichen. Eine stabile EA-ID ist bislang nicht nachgewiesen. Anzeigenamen dürfen nicht als eindeutige Kennung angenommen werden.

Danach Saisons, Divisionsergebnisse und Teamzuordnungen mit Gültigkeitsintervallen normalisieren; sessionspezifische Regeln und Tabellen-Gleichstände festlegen; Mehrbenutzerrechte, Einladungen und Audit-Akteure integrieren; native Windows-Oberfläche und signierte zentrale Updates ergänzen. Update-Signierung erfordert eine echte Publisher-Identität. Für öffentliche Bereitstellung folgen Objektspeicher, Backups/Restore-Test, TLS, Limits, Monitoring und Lösch-/Exportprozesse.

Quellen: https://nextjs.org/docs/app/getting-started/installation und EA UDP-Spezifikation im EA Forums F1 Game Info Hub. Die 2026-Erweiterung wird nicht als identisch mit UDP 2025 behandelt.
