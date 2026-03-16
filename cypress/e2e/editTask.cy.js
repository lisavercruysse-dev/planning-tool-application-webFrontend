describe('Edit task', () => {

  beforeEach(() => {
    cy.login("Pieter.DeBakker@example.com", "12345678").then(() => {
      cy.visit("http://localhost:5173/planning");
    })
  })

  it("should show a modal to edit a task", () => {

    cy.get('[data-cy=teamSelector]').select('Team B')
    cy.get('[data-cy=dateSelector]').type('2026-03-06')
    cy.get('[data-cy=editTaskButton]').first().click()
    cy.get('[data-cy=taakWijzigenTitel]').should('have.text', 'Taak Wijzigen')
    cy.get('[data-cy=taakBewerkenWerknemer] option:selected').should('have.text', 'Tom Claes')
    cy.get('[data-cy=taakBewerkenDatum]').should('have.value', '2026-03-06')
    cy.get('[data-cy=taakBewerkenStarttijd]').should('have.value', '10:30')
    cy.get('[data-cy=taakBewerkenEindtijd]').should('have.value', '12:00')
    cy.get('[data-cy=taakBewerkenSpecificaties]')
    .should('have.value', 'Diagnosticeer sensor E17, vervang defecte componenten en voer kalibratie uit om correcte werking te garanderen.')
  })

})