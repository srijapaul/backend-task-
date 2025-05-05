import { faker } from '@faker-js/faker';

describe('Register Form', () => {
  it('registers a new user', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/register').as('registerRequest');
    cy.intercept('*',(req)=>{
      console.log('request',req)
    })
    cy.visit('http://localhost:3000/register'); // Uses baseUrl from config
    const email = faker.internet.email();
    const password = faker.internet.password();
    const roles = ['user', 'admin'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    cy.get('[data-cy="register-email"]').type(email);
    cy.get('[data-cy="register-password"]').type(password);
    cy.get('[data-cy="register-confirm"]').type(password);
    cy.get('[data-cy="register-role"]').select(randomRole);
    cy.get('[data-cy="register-submit"]').click();



    // Ensure the request succeeds with a valid status code
   // cy.wait('@registerRequest',{timeout:10000}).its('response.statusCode').should('eq', 201);

    // Verify the redirection URL includes '/login'
    cy.url({ timeout: 10000 }).should('include', '/login');
  });
});
