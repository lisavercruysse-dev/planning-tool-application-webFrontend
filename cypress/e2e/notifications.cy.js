describe("Meldingen list", () => {
  beforeEach(() => {
    cy.login("user@example.com", "12345678");
  });

  it("should show the notifications overview", () => {
    cy.visit("http://localhost:5173/meldingen");

    cy.get("h1").should("contain", "Meldingen");
    cy.get("[data-cy=notification-card]").should("have.length", 2);
    cy.get("[data-cy=notification-card]")
      .eq(0)
      .should("contain", "Nieuwe taak toegewezen");
    cy.get("[data-cy=notification-card]")
      .eq(0)
      .should("contain", "14:00 - 17:00 (3 uur)");
  });
});
