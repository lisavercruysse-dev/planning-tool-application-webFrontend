describe("Task list", () => {
  beforeEach(() => {
    cy.login("user@example.com", "12345678"); // nog toevoegen aan seeding in api
  });

  it("should show the tasks", () => {
    cy.intercept("GET", "http://localhost:3000/api/tasks", {
      fixture: "tasks.json",
    });

    cy.visit("http://localhost:5173/planning");
    cy.get("[data-cy=task]").should("have.length", 4);
    cy.get("[data-cy=task_description]")
      .eq(0)
      .contains("Kwaliteitscontrole lijn B");
    cy.get("[data-cy=task_time]").eq(0).should("contain", "09:00 - 10:00");
    cy.get("[data-cy=task_type]").eq(0).should("contain", "Inspectie");
  });

  it("should filter tasks by description", () => {
    cy.intercept("GET", "http://localhost:3000/api/tasks", {
      fixture: "tasks.json",
    });
    cy.visit("http://localhost:5173/planning");
    cy.get("input[placeholder='omschrijving']").type("onderhoud");
    cy.get("[data-cy=task]").should("have.length", 1);
    cy.get("[data-cy=task_description]").should(
      "contain",
      "Preventief onderhoud machine A1",
    );
  });

  it("should filter tasks by date", () => {
    cy.intercept("GET", "http://localhost:3000/api/tasks", {
      fixture: "tasks.json",
    });
    cy.visit("http://localhost:5173/planning");
    cy.get("input[type='date']").type("2026-03-04");
    cy.get("[data-cy=task]").should("have.length", 1);
    cy.get("[data-cy=task_description]").should(
      "contain",
      "Preventief onderhoud machine A1",
    );
  });

  it("should show a loading indicator for a very slow response", () => {
    cy.intercept("http://localhost:3000/api/tasks", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
    }).as("slowResponse");
    cy.visit("http://localhost:5173/planning");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loader]").should("not.exist");
  });

  it("should show a message when no tasks are found", () => {
    cy.intercept("GET", "http://localhost:3000/api/tasks", {
      statusCode: 200,
      body: { items: [] },
    });
    cy.visit("http://localhost:5173/tasks");
    cy.get("[data-cy=empty]").should("be.visible");
  });

  it("should show an error if the API call fails", () => {
    cy.intercept("GET", "http://localhost:3000/api/tasks", {
      statusCode: 500,
      body: {
        error: "Internal server error",
      },
    });
    cy.visit("http://localhost:5173/tasks");

    cy.get("[data-cy=axios_error_message]").should("exist");
  });
});
