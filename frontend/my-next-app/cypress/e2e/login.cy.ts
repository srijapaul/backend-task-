describe('Login Form', () => {
  it('logs in with valid credentials', () => {
<<<<<<< HEAD
    cy.intercept('POST', '/auth/login').as('loginRequest');

    cy.visit('/login');
=======
    cy.visit('http://localhost:3000/login');

    // Intercept the login API call
    cy.intercept('POST', '/auth/login').as('loginRequest');
>>>>>>> fedef55 (update cypress tests)

    cy.get('[data-cy="login-email"]').type('admin@example.com');
    cy.get('[data-cy="login-password"]').type('test1234');
    cy.get('[data-cy="login-submit"]').click();

<<<<<<< HEAD
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201); // or 200
    });

=======
    // Wait for the login API call and log the response
    cy.wait('@loginRequest').then((interception) => {
      cy.log('Login API response:', JSON.stringify(interception.response));
      expect(interception.response?.statusCode).to.eq(201); // or 200, depending on your backend
    });

    // Optional: Screenshot after login attempt
    cy.screenshot('after-login-submit');

    // Check for error messages in the UI
    cy.get('body').then($body => {
      if ($body.text().toLowerCase().includes('invalid') || $body.text().toLowerCase().includes('error')) {
        cy.log('Login error message found');
      }
    });

    // Assert redirection to dashboard
>>>>>>> fedef55 (update cypress tests)
    cy.url({ timeout: 10000 }).should('include', '/dashboard');
  });

  it('shows error on invalid credentials', () => {
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type('wrong@example.com');
    cy.get('[data-cy="login-password"]').type('wrongpassword');
    cy.get('[data-cy="login-submit"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/invalid credentials/i);
    });
  });
});
