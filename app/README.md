# Lion Racing League – Lokale App

Dieser Bereich beschreibt die Windows-Anwendung und die Telemetrie-Komponenten.

- Race Control und UDP-Simulator: `apps/race-control`
- Optionaler Fahrer-Client: `apps/driver-client`
- Telemetrie- und Kollisionsmodelle: `packages/telemetry`
- Desktop-Start: `npm run app`
- Simulator-Start: `npm run simulator`

Die App empfängt bzw. simuliert F1-25-Telemetrie, zeigt Rennstatus und Timing an und kann signierte Daten sowie Unfallclips an die Server/API-Schicht übertragen.
