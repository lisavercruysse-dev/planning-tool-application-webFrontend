// src/api/mock_data.js

const TASK_DATA = [
  {
    id: 1,
    type: "Inspectie",
    omschrijving: "Kwaliteitscontrole lijn B",
    duurtijd: 60,
    startdatum: "2026-03-02T09:00:00", // Maandag
    status: "Afgewerkt",
    specificaties: "Start en controleer assemblagelijn AL-07 en voer een korte testrun uit.",
    machine: "MC-PLT-001",
  },
  {
    id: 2,
    type: "Onderhoud",
    omschrijving: "Preventief onderhoud machine A1",
    duurtijd: 120,
    startdatum: "2026-03-04T08:00:00", // Woensdag
    status: "Gepland",
    specificaties: "Controleer en vervang slijtagegevoelige onderdelen, smeer bewegende delen en voer een testcyclus uit.",
    machine: "MC-ASD-023",
  },
  {
    id: 3,
    type: "Productie",
    omschrijving: "Productie batch PET flessen 1,5L",
    duurtijd: 240,
    startdatum: "2026-03-05T13:00:00", // Donderdag namiddag
    status: "Gepland",
    specificaties: "Start de productie op lijn C3, controleer de vulmachine, en houd de kwaliteit gedurende de batch in de gaten.",
    machine: "MC-PLT-100",
  },
  {
    id: 4,
    type: "Reparatie",
    omschrijving: "Herstellen sensor foutcode E17",
    duurtijd: 90,
    startdatum: "2026-03-06T10:30:00", // Vrijdag voormiddag
    status: "Gepland",
    specificaties: "Diagnosticeer sensor E17, vervang defecte componenten en voer kalibratie uit om correcte werking te garanderen.",
    machine: "MC-HST-003",
  },
  {
    id: 5,
    type: "Reparatie",
    omschrijving: "Herstellen sensor foutcode E18",
    duurtijd: 90,
    startdatum: "2026-03-06T13:00:00", // Vrijdag namiddag
    status: "Afgewerkt",
    specificaties: "Controleer foutcode E18, vervang defecte sensoronderdelen en voer een korte functionele test uit.",
    machine: "MC-PLT-100",
  },
  {
    id: 6,
    type: "Onderhoud",
    omschrijving: "Onderhoud verpakkingsmachine P2",
    duurtijd: 120,
    startdatum: "2026-03-06T14:30:00", // Vrijdag namiddag
    status: "Gepland",
    specificaties: "Controleer de sensoren en rollen, en voer een proefrun uit om de correcte werking te verifiëren.",
    machine: "MC-PLT-001",
  },
];

const USER_DATA = [
  {
    id: 1,
    firstName: 'Jonas',
    lastName: 'Van Aert',
    email: 'Jonas.VanAert@example.com',
    jobtitel: 'werknemer',
  },
  {
    id: 2,
    firstName: 'Jan',
    lastName: 'Jansens',
    email: 'Jan.Jansens@example.com',
    jobtitel: 'manager',
  },
  {
    id: 3,
    firstName: 'Pieter',
    lastName: 'De Bakker',
    email: 'Pieter.DeBakker@example.com',
    jobtitel: 'verantwoordelijke',
  },
]

const PLANTS = ["Plant A", "Plant B"];

const TEAMS = {
  "Plant A": ["Team A", "Team B"],
  "Plant B": ["Team C", "Team D"],
};

export { TASK_DATA, USER_DATA, PLANTS, TEAMS };