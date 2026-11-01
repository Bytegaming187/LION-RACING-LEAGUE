# Personal, Bewerbungen und Video

Ausschreibungen öffnen ein öffentliches Bewerbungsformular. Anträge enthalten Name, Discordname, Team, Rolle und Kontobedarf. Die Administration kann korrigieren, bestätigen oder ablehnen. Bestätigung erstellt absichtlich kein Konto: Konten legt die Administration selbst an.

Teamwechsel müssen im administrativ eingetragenen Wechselfenster liegen. Ohne Zeitfenster sind Wechsel geschlossen. Fahrer und beide zugeordneten Teamchefs müssen bestätigen; danach kann ein Administrator den Wechsel ausführen. Bearbeitung von Daten setzt Freigaben zurück. Zielteamkapazität wird abschließend geprüft. Der Admin trägt auch den Saisonstart ein; das Fenster muss spätestens sieben Tage davor schließen. Diese Grenze wird serverseitig geprüft.

## Direkte F1-Aufnahme

Der Collector verwendet FFmpeg und das benannte F1-Fenster. Zum Aktivieren `RECORD_GAME=true`, `F1_WINDOW_TITLE=<exakter Fenstertitel>`, `DEVICE_ID` und `DEVICE_SECRET` setzen; optional `FFMPEG_PATH`. Windows und ein sichtbares F1-Fenster (Fenster-/randloser Modus empfohlen) erforderlich. Es wird kein ganzer Desktop aufgenommen. Audio ist aktuell deaktiviert. `KEEP_LOCAL_CLIPS=true` behält nach Upload die lokale MP4. Ohne diese Option werden lokale Clips erst nach erfolgreicher Serverbestätigung entfernt. Der laufende Segmentpuffer wird nach zwei Minuten bereinigt; fehlgeschlagene Uploads bleiben erhalten.

EA-UDP-2025-Ereignisse `COLL` lösen ohne Filter auf den eigenen Fahrer Clips aus. Geplant sind ungefähr zehn Sekunden davor und zwanzig Sekunden danach; Zusammenfügen/Upload starten nach 22 Sekunden. Die reale Verfügbarkeit hängt von Aufnahme, Encoder, Netzwerk und Upload ab. Keine Garantie für alle Unfälle oder exakt 30 Sekunden: Nur gemeldete Kollisionen werden erkannt; ein einzelner Kameraausschnitt zeigt nicht zwangsläufig den Unfall. Bei Aufnahmeausfall bleibt das Ereignis als „Clip ausstehend“ sichtbar. Ein App-Absturz während der Nachlaufphase kann den noch nicht erzeugten Clip verlieren. Bildqualität, exklusiver Vollbildmodus und reale UDP-Ereignisse müssen in einem F1-Test validiert werden; diese Prüfung wurde noch nicht durchgeführt.

Server speichert Unfallmetadaten in der Datenbank und Videos in `data/clips`. Authentifizierte Admins, Stewards und Race Control sehen diese im privaten Bereich; andere Konten nicht. Dateiuploads sind signiert und auf 100 MB begrenzt. Speicherbudget, Löschfristen und langfristige Archivierung sind vor Dauereinsatz festzulegen. Ein funktionierender UDP-/Geräteschlüssel ist Voraussetzung; es wird ohne Aktivierung keine Aufnahme gestartet.

Quelle: [EA F1 25 UDP v3](https://forums.ea.com/t5/s/tghpe58374/attachments/tghpe58374/f1-games-game-info-hub-en/61/4/Data%20Output%20from%20F1%2025%20v3.pdf).
