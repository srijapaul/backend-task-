describe('Login Form', () => {
  it('logs in with valid credentials', () => {
    cy.intercept('POST', '/auth/login').as('loginRequest');

    cy.visit('/login');

    cy.get('[data-cy="login-email"]').type('admin@example.com');
    cy.get('[data-cy="login-password"]').type('test1234');
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201); // or 200
    });

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
