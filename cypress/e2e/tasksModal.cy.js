describe('Show modal of and update task', () => {
  beforeEach(() => {
    cy.login("Jonas.VanAert@example.com", "12345678");
    cy.visit("http://localhost:5173/planning");
  });

  it("should show a modal with details of that task", () => {
    cy.get('[data-cy=detail_button]').first().click();
    cy.get('[data-cy=task_modal]').should('exist');
    cy.get('[data-cy=task_modal_title]').should('have.text', 'Details taak');
    cy.get('[data-cy=taak_omschrijving]').should('have.text', 'Kwaliteitscontrole lijn B');
    cy.get('[data-cy=taak_specificaties]').should('have.text', 'Start en controleer assemblagelijn AL-07 en voer een korte testrun uit.');
    cy.get('[data-cy=taak_startdatum]').should('have.text', '2026-03-02');
    cy.get('[data-cy=taak_starttijd]').should('have.text', '09:00')
    cy.get('[data-cy=taak_type]').should('have.text', 'Inspectie')
    cy.get('[data-cy=taak_duurtijd]').should('have.text', '60 minuten')
    cy.get('[data-cy=taak_machine]').should('have.text', 'MC-PLT-001')
  });

  it("should show a modal to complete a task", () => {
    cy.get('[data-cy=complete_button]').eq(1).click();
    cy.get('[data-cy=task_modal]').should('exist');
    cy.get('[data-cy=task_modal_title]').should('have.text', 'Markeer taak als afgewerkt');
    cy.get('[data-cy=task_complete_input]').should('exist');
  })

  it("should show task as completed", () => {
    cy.get('[data-cy=complete_button]').eq(1).click();
    cy.get('[data-cy=task_complete_input]').type('50');
    cy.get('[data-cy=task_complete_bevestig_button]').click();
    cy.get('[data-cy=complete_button]').should('have.text', 'x')
  })

  it("should show task as uncompleted", () => {
    cy.get('[data-cy=complete_button]').eq(1).click();
    cy.get('[data-cy=task_modal]').should('exist');
    cy.get('[data-cy=task_complete_input]').type('50');
    cy.get('[data-cy=task_complete_bevestig_button]').click();
    cy.get('[data-cy=complete_button]').first().click();
    cy.get('[data-cy=task_modal_title]').should('have.text', 'Markeer als onafgewerkt');
    cy.get('[data-cy=task_markeer_onafgewerkt]').click();
    cy.get('[data-cy=complete_button]').should('have.text', '')
  })

  it("should not show task as uncompleted", () => {
    cy.get('[data-cy=complete_button]').eq(1).click();
    cy.get('[data-cy=task_modal]').should('exist');
    cy.get('[data-cy=task_complete_input]').type('50');
    cy.get('[data-cy=task_complete_bevestig_button]').click();
    cy.get('[data-cy=complete_button]').first().click();
    cy.get('[data-cy=task_modal_title]').should('have.text', 'Markeer als onafgewerkt');
    cy.get('[data-cy=task_cancel_markeer_onafgewerkt]').click();
    cy.get('[data-cy=complete_button]').should('have.text', 'x')
  })

  it("should show error message when incorrect value", () => {
    it("should show task as completed", () => {
    cy.get('[data-cy=complete_button]').first().click();
    cy.get('[data-cy=task_complete_input]').type('0');
    cy.get('[data-cy=task_complete_bevestig_button]').click();
    cy-get('[data-cy=task_below_15]').should('exist')
  });

  })
});