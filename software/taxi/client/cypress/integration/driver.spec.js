import { tripResponse } from "../support/driver.test.data";
const { webSocket } = require("rxjs/webSocket");

const faker = require("faker");

const driverEmail = faker.internet.email();
const driverFirstName = faker.name.firstName();
const driverLastName = faker.name.lastName();
const riderEmail = faker.internet.email();
const riderFirstName = faker.name.firstName();
const riderLastName = faker.name.lastName();

describe("The driver dashboard", function () {
  before(function () {
    cy.addUser(riderEmail, riderFirstName, riderLastName, "rider");
    cy.addUser(driverEmail, driverFirstName, driverLastName, "driver");
  });

  it("Displays current, requested, and completed trips", function () {
    cy.intercept("trip", {
      statusCode: 200,
      body: tripResponse,
    }).as("getTrips");

    cy.logIn(driverEmail);

    cy.visit("/#/driver");
    cy.wait("@getTrips");

    // Current trips.
    cy.get("[data-cy=trip-card]").eq(0).contains("STARTED");

    // Requested trips.
    cy.get("[data-cy=trip-card]").eq(1).contains("REQUESTED");

    // Completed trips.
    cy.get("[data-cy=trip-card]").eq(2).contains("COMPLETED");
  });

  it("Cannot be visited if the user is not a driver", function () {
    cy.intercept("POST", "log_in").as("logIn");

    cy.logIn(riderEmail);
    cy.visit("/#/driver");
    cy.hash().should("eq", "#/");
  });

  it("Can be visited if the user is a driver", function () {
    cy.intercept("POST", "log_in").as("logIn");

    cy.logIn(driverEmail);

    cy.visit("/#/driver");
    cy.hash().should("eq", "#/driver");
  });
  it("Displays messages for no trips", function () {
    cy.intercept("trip", {
      statusCode: 200,
      body: [],
    }).as("getTrips");

    cy.logIn(riderEmail);

    cy.visit("/#/rider");
    cy.wait("@getTrips");

    // Current trips.
    cy.get("[data-cy=trip-card]").eq(0).contains("No trips.");

    // Completed trips.
    cy.get("[data-cy=trip-card]").eq(1).contains("No trips.");
  });
  it("Shows details about a trip", () => {
    cy.intercept("/api/trip/*", {
      statusCode: 200,
      body: tripResponse[0],
    }).as("getTrip");

    cy.logIn(driverEmail);

    cy.visit(`/#/driver/${tripResponse[0].id}`);
    cy.wait("@getTrip");

    cy.get("[data-cy=trip-card]")
      .should("have.length", 1)
      .and("contain.text", "STARTED");
  });
});
