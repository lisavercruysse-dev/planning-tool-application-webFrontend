// src/api/mock_data.js

const TASK_DATA = [
  {
    id: 1,
    type: "Inspectie",
    omschrijving: "Kwaliteitscontrole lijn B",
    duurtijd: 60,
    startdatum: "2026-03-02T09:00:00", // Maandag
    status: "Afgewerkt",
  },
  {
    id: 2,
    type: "Onderhoud",
    omschrijving: "Preventief onderhoud machine A1",
    duurtijd: 120,
    startdatum: "2026-03-04T08:00:00", // Woensdag
    status: "Gepland",
  },
  {
    id: 3,
    type: "Productie",
    omschrijving: "Productie batch PET flessen 1,5L",
    duurtijd: 240,
    startdatum: "2026-03-05T13:00:00", // Donderdag namiddag
    status: "Gepland",
  },
  {
    id: 4,
    type: "Reparatie",
    omschrijving: "Herstellen sensor foutcode E17",
    duurtijd: 90,
    startdatum: "2026-03-06T10:30:00", // Vrijdag voormiddag
    status: "Gepland",
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

export { TASK_DATA, USER_DATA };