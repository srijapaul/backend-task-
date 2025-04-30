describe('Login Form', () => {
  it('logs in with valid credentials', () => {
    cy.visit('http://localhost:3000/login');
    // const email= faker.internet.email()
    // const password= faker.internet.password()
    cy.get('[data-cy="login-email"]').type('admin@example.com'); 
    cy.get('[data-cy="login-password"]').type('test1234');   
    cy.get('[data-cy="login-submit"]').click();
   // cy.wait(2000)
    // redirect to dashboard
    cy.url().should('include', '/dashboard');
    
  });

  it('shows error on invalid credentials', () => {
    cy.visit('http://localhost:3000/login');

    cy.get('[data-cy="login-email"]').type('wrong@example.com');
    cy.get('[data-cy="login-password"]').type('wrongpassword');
    cy.get('[data-cy="login-submit"]').click();

    // error alert or message
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/invalid credentials/i);
    });
  });
});