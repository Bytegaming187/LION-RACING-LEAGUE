# Regelwerk 1.1 – technische Umsetzung

Quelle: https://docs.google.com/document/d/1ZFtvxfvMWLwv6VTyqvCAVVMRH6LRXk8K7LIn3WfmNBg/edit

Die öffentliche Seite `/regelwerk` liest das freigegebene Google-Dokument als HTML. Serverseitige HTML-Bereinigung entfernt Skripte und externe Einbettungen. Cache und Browser-Abfrage aktualisieren sich jede Minute. Bei Ausfällen bleibt die letzte im Serverprozess bekannte Fassung mit Warnhinweis stehen. Google-Freigaben müssen den öffentlichen Export weiterhin erlauben.

Textänderungen aktualisieren nur die Darstellung, keine ausführbare Logik oder bereits vergebenen Punkte. Das Reglement wird nicht von einem Sprachmodell während des Ligabetriebs interpretiert.

## Umgesetzt

- Lizenzstatus Bewerber/Rookie/aktiv/entzogen und Stamm-/Ersatz-/Testfahrer; Admin entscheidet nach Sichtung.
- Verknüpfung von Fahrerprofil und Konto; neue Fahrer über passende Konten. Teamchefs können zusätzlich im eigenen Team fahren. Teamchef und Renningenieure werden vom Admin einem Team zugeordnet.
- Private Portale mit serverseitig gefilterten Eigen-/Teamdaten; Offizielle sehen Vorgänge. Admin-, Fahrer- und Teamnavigation hängt von der Anmeldung und Rolle ab.
- An-/Abmeldung spätestens 24 Stunden vor Eventbeginn. Lizenzpflicht bei Meisterschaftsevents; Sichtung/Training ohne Lizenz möglich. Drei dokumentierte unentschuldigte Fehltermine sperren für die aktuelle Datenbasis.
- Protestformular mit Videolink und 48-Stunden-Frist nach tatsächlichem Rennende. Replay-Anforderung durch Offizielle binnen 24 Stunden. Das tatsächliche Ende muss ein Admin am Event erfassen; es wird nicht aus dem geplanten Start geraten.
- Unveränderliche Steward-Fälle mit den sechs Strafstufen. Strafpunkte erzeugen Verwarnstatus ab 25 und sperren das auf das Erreichen von 50 Punkten folgende Rennwochenende. „Season DSQ“ wird als Saisonsperre und Renn-DSQ behandelt. Dies ist eine explizite Interpretation der Kombination aus Stufenname und DSQ-Angabe; die +20 Sekunden sind im Katalog gespeichert, nach DSQ aber nicht wertungsentscheidend.
- Bei einem Urteil werden bereits gespeicherte Hauptrennergebnisse desselben Rennwochenendes neu berechnet. Ingame-Strafen bleiben erhalten. Resultate müssen hierfür mit `weekendId` und `sessionKind` eingereicht werden; die Rohdatendecodierung bleibt eine separate Aufgabe.
- Separate Sprintpunkte, schnellste Runde, DSQ, Ersatzfahrerwertung und null Punkte für Training/Sichtung. Divisionstabellen mit Strafpunkten/Strafen, Siegen und besten Platzierungen als Gleichstandskriterien.
- Team-Sanktionen: Konstrukteurspunkteabzug, dokumentierte Guthabenstrafe und Registrierungssperre. Neue Fahrerzuordnungen werden bei einer Registrierungssperre abgewiesen.
- Liga-Stellenausschreibungen, Bewerbungen und Personaländerungsmeldungen als persistente Vorgänge mit Audit-Protokoll.
- 24 reguläre 2025-Strecken plus drei Rückwärtsvarianten als Auswahl mit Länderflaggen. Alte freie Streckennamen bleiben lesbar.

## Weiterhin organisatorisch / noch nicht automatisiert

Sichtungsbewertung und Prüfung der Videoinhalte, Kommunikationspflichten in Discord, reale F1-Terminüberschneidungen, Fahrhilfen-/Lobbykontrolle, Fahrverhalten und Cheaterkennung bleiben Entscheidungen bzw. Kontrollen durch Offizielle. Keine Discord-Anbindung wurde eingerichtet.

Es gibt weiterhin keine vollständige Saisonverwaltung mit Abschluss/Rollover. Daher sind die exakt 24 Wochenenden, Veröffentlichung zwei Wochen vorher, Personalfrist eine Woche vor Saisonstart, genehmigungspflichtige Teamchefwechsel und Rookie-Übernahme in die Folgesaison noch nicht automatisch durchgesetzt. Der Zähler abgeschlossener Wochenenden steht in den Tabellen zur Verfügung; bei Saisonwechsel muss die Administration den Lizenzstatus prüfen. Training/Sichtung und Meisterschaft sind unterscheidbar, haben aber noch keine frei konfigurierbaren Lobbyprofile.

Bewerbungs-/Transfermeldungen sind dokumentierte Anträge; automatische Vertrags-/Transfergenehmigung, Replays als Datei-Upload, tatsächliches Team-Guthaben und Verwaltung interner Teamstellen sind nicht implementiert. Das Formular speichert Videolinks, keine Videos. „Urteile endgültig nach 48 Stunden“ wird durch unveränderliche Fall-Einträge gestützt; die Rechte für begründete Ergebnis-Korrekturen aus dem ursprünglichen Projekt bleiben erhalten.

Mehrere Saisons, neue Strafpunktzyklen nach einer verbüßten Sperre und die Abgrenzung „wenigste Strafpunkte/Strafen“ sind mit der Ligaleitung fachlich zu präzisieren. Aktuell gelten Strafpunktzahl, dann Anzahl Entscheidungen, dann Siege, dann sortierte Einzelplatzierungen. Neue Textfassungen benötigen eine bewusste Anpassung dieser Regeln.
