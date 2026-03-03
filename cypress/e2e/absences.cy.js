describe("Absences list", () => {
  beforeEach(() => {
    cy.login("user@example.com", "12345678");
  });

  it("should show the absences overview", () => {
    cy.visit("http://localhost:5173/afwezigheden");

    cy.get("[data-cy=stat-card]").should("have.length", 2);
    cy.get("[data-cy=stat-card]").eq(0).should("contain", "3");
    cy.get("[data-cy=stat-card]").eq(1).should("contain", "0");

    cy.get("[data-cy=absence-row]").should("have.length", 2);
    cy.get("[data-cy=absence-row]").eq(0).should("contain", "Vakantie");
    cy.get("[data-cy=absence-row]").eq(1).should("contain", "Ziekte");
  });
});
