# Simulation und Stream-Overlay

`npm run api`, `npm run simulator` und `npm run start -w @lrl/web` (nach `npm run build`) starten die drei lokalen Dienste. Anschließend öffnet `npm run app` das eigenständige Electron-Fenster. Electron lädt seine Laufzeit bei Bedarf beim ersten Start herunter. Die App benötigt aktuell die laufende lokale Web-App und den Simulationsdienst; sie ist noch kein verteilbarer Windows-Installer.

- Webseite: http://localhost:3000/?demo=1
- App-Oberfläche: http://localhost:3000/app
- OBS-Browserquelle: http://localhost:3000/overlay?demo=1 (1920 × 1080 empfohlen)

Der Simulationsmodus zeigt 20 erfundene Ligafahrer, zehn F1-Teams, 24 Rennwochenenden, drei berechnete Ergebnissessions, WM-Tabellen, Strafen und Liga-/Team-Ausschreibungen. Demo-Endpunkte sind read-only und schreiben keine Ligadaten. Formulare für echte Anträge sollten im normalen Ligamodus verwendet werden; Demo-Bewerbungen werden nicht gespeichert. Admin-Verwaltung ist im Demomodus deaktiviert.

Der getrennte Simulator sendet 20-mal je Sekunde synthetische F1-25-Car-Telemetry-Pakete über Loopback-UDP auf Port 20778 und decodiert sie am Empfänger. App-Anzeige und Overlay erhalten die empfangenen Fahrzeugwerte über einen lokalen HTTP-Dienst auf Port 4100. Gas, Bremse, Geschwindigkeit, RPM, Gang und DRS sind decodiert. Positionen, Namen, Zeiten und Flaggen stammen dagegen aus dem Szenario, nicht aus einem vollständigen Spieldecoder. Der echte Collector auf 20777 wird dadurch nicht belegt; Testpakete gelangen nicht ins echte Roharchiv. Keine echten Videoaufnahmen werden im Simulator ausgelöst.

Die App bietet Start/Pause, Reset, 1×/2×/5× sowie eine Gelb/Grün-Umschaltung. Browser-Overlay hat transparenten Hintergrund, Timing-Tower, Reifenanzeige, Flaggenstatus und Fahrereinblendung. Es ist als Simulation gekennzeichnet. Ohne `demo=1` wird ausdrücklich keine echte Datenquelle behauptet; Anbindung echter Livepositionen bleibt an den vollständigen F1-Decoder gebunden.

Web-Navigation verwendet `view` und `race` in der URL mit Verlaufseinträgen und `popstate`. Browser-Zurück/Vorwärts und die entsprechenden Maustasten verwenden dadurch dieselben Navigationseinträge. Das ist unabhängig von der Desktop-App.

Teamchefs veröffentlichen Team-Ausschreibungen im privaten Portal; Admins können Liga- oder Team-Ausschreibungen anlegen. Teamzuordnung wird serverseitig geprüft. Das öffentliche Ausschreibungsboard gruppiert diese getrennt.
