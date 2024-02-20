describe("LoginPage", () => {
    beforeEach(() => {
        cy.visit("/login"); // Assuming your login page route is '/login'
    });

    it("should display error message if username or password is not provided", () => {
        cy.get("form").submit();
        cy.contains("Please fill in all fields");
    });

    it("should display error message if login fails", () => {
        cy.intercept("POST", `${Cypress.env("BACKEND_URL")}/api/users/login`, {
            statusCode: 401,
            body: { error: "Invalid credentials" },
        }).as("loginRequest");

        cy.get("#username").type("callisto");
        cy.get("#password").type("wrongpassword");
        cy.get("form").submit();

        cy.wait("@loginRequest");

        cy.contains("Invalid credentials");
    });

    it("should redirect to /destinations on successful login", () => {
        cy.intercept("POST", `${Cypress.env("BACKEND_URL")}/api/users/login`, {
            statusCode: 200,
            body: { username: "testuser" },
        }).as("loginRequest");

        cy.get("#username").type("callisto");
        cy.get("#password").type("123");
        cy.get("form").submit();

        cy.wait("@loginRequest");

        cy.url().should("include", "/destinations");
    });
});
