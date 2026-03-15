describe('Show list of task templates', () => {
  beforeEach(() => {
    cy.login("Pieter.DeBakker@example.com", "12345678");
    cy.visit("http://localhost:5173/planning");
  });

  it("should show a list of all task templates", () => {
    cy.get("[data-cy=taskTemplateOmschrijving]").should("have.text", "omschrijving");
    cy.get("[data-cy=taskTemplateMinutenTitel]").should("have.text", "geschatte tijd");
    cy.get("[data-cy=taskTemplateTypeTitel]").should("have.text", "type");
    cy.get("[data-cy=taskTemplateOmschrijving]").first().should("have.text", "Onderhoud machine");
    cy.get("[data-cy=taskTemplateMinuten]").first().should("have.text", "60 min");
    cy.get("[data-cy=taskTemplateType]").first().should("have.text", "onderhoud");
  })

  it("should show a filtered list of task templates", () => {
    cy.get("[data-cy=taskTemplateItem]").should("have.length", "9");
    cy.get("[data-cy=taskTemplateSearch]").type("machine");
    cy.get("[data-cy=taskTemplateItem]").should("have.length", "5");
    cy.get("[data-cy=taskTemplateOmschrijving]").first().should("have.text", "Onderhoud machine");
    cy.get("[data-cy=taskTemplateSearch]").type("hallo");
    cy.get("[data-cy=taskTemplateItem]").should("have.length", "0");
  })
})