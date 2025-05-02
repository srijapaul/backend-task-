import { faker } from '@faker-js/faker';

describe('Register Form', () => {
  it('registers a new user', () => {
    cy.intercept('POST', '/auth/register').as('registerRequest');

    cy.visit('/register'); // Uses baseUrl from config
    const email = faker.internet.email();
    const password = faker.internet.password();
    const roles = ['user', 'admin'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    cy.get('[data-cy="register-email"]').type(email);
    cy.get('[data-cy="register-password"]').type(password);
    cy.get('[data-cy="register-confirm"]').type(password);
<<<<<<< HEAD
    cy.get('[data-cy="register-role"]').select(randomRole);
    cy.get('[data-cy="register-submit"]').click();

    cy.wait('@registerRequest').its('response.statusCode').should('eq', 201); // or 200
    cy.url({ timeout: 10000 }).should('include', '/login');
=======
    cy.get('[data-cy="register-role"]').select(randomroles);
    cy.get('[data-cy="register-submit"]').click()
    cy.wait(2000)
    cy.url().should('include', '/login');
 
>>>>>>> fedef55 (update cypress tests)
  });
});
