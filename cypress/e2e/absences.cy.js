describe("Absences list", () => {
  beforeEach(() => {
    cy.login("user@example.com", "12345678");
    cy.visit("http://localhost:5173/afwezigheden");
  });

  it("should show the absences overview", () => {
    cy.get("[data-cy=stat-card]").should("have.length", 2);
    cy.get("[data-cy=stat-card]").eq(0).should("contain", "3");
    cy.get("[data-cy=stat-card]").eq(1).should("contain", "0");

    cy.get("[data-cy=absence-row]").should("have.length", 2);
    cy.get("[data-cy=absence-row]").eq(0).should("contain", "Vakantie");
    cy.get("[data-cy=absence-row]").eq(1).should("contain", "Ziekte");
  });

  it("should show validation errors when submitting an empty form", () => {
    cy.contains("button", "Vakantie aanvragen").click();
    cy.contains("button", "Aanvragen").click();

    cy.contains("Start datum is verplicht.").should("be.visible");
    cy.contains("Eind datum is verplicht.").should("be.visible");
    cy.contains("Reden is verplicht.").should("be.visible");
  });

  it("should show an error when selecting dates in the past", () => {
    cy.contains("button", "Vakantie aanvragen").click();

    cy.get("input[type='date']").eq(0).type("2020-01-01");
    cy.get("input[type='date']").eq(1).type("2020-01-05");
    cy.contains("button", "Aanvragen").click();

    cy.contains("Datum mag niet in het verleden liggen.").should("be.visible");
  });

  it("should successfully request a new vacation", () => {
    cy.contains("button", "Vakantie aanvragen").click();

    cy.get("input[type='date']").eq(0).type("2026-06-01");
    cy.get("input[type='date']").eq(1).type("2026-06-10");
    cy.get("textarea").type("Zomervakantie");
    cy.contains("button", "Aanvragen").click();

    cy.get("[data-cy=absence-row]").should("have.length", 3);
    cy.get("[data-cy=absence-row]").first().should("contain", "Vakantie");
    cy.get("[data-cy=absence-row]").first().should("contain", "In behandeling");
  });

  it("should cancel an absence request", () => {
    cy.get("[data-cy=absence-row]")
      .first()
      .contains("button", "Annuleren")
      .click();
    cy.contains("Afwezigheid annuleren").should("be.visible");

    cy.contains("button", "Ja, annuleren").click();

    cy.get("[data-cy=absence-row]").should("have.length", 1);
  });

  it("should show an error modal when trying to report sick while already sick", () => {
    cy.contains("button", "Ziekte melden").click();

    cy.get("input[type='date']").eq(0).type("2026-03-06");
    cy.get("input[type='date']").eq(1).type("2026-03-10");
    cy.get("textarea").type("Griep");
    cy.contains("button", "Aanvragen").click();

    cy.contains("button", "Ziekte melden").click();
    cy.contains("Ziekte melden gefaald").should("be.visible");
    cy.contains(
      "U bent al ziek gemeld. Het is daarom niet mogelijk om opnieuw ziek te melden.",
    ).should("be.visible");

    cy.contains("button", "OK").click();
    cy.contains("Ziekte melden gefaald").should("not.exist");
  });
});
