import {faker} from '@faker-js/faker'
describe('Register Form', () => {
  it('registers a new user', () => {
    cy.visit('http://localhost:3000/register');
    //`admin+${Date.now()}@example.com`
    const email= faker.internet.email()
    const password= faker.internet.password()
    const roles=['user','admin']
    const randomroles=roles[Math.floor(Math.random()*roles.length)]
    cy.get('[data-cy="register-email"]').type(email);
    cy.get('[data-cy="register-password"]').type(password);
    cy.get('[data-cy="register-confirm"]').type(password);
    cy.get('[data-cy="register-role"]').select(randomroles);
    cy.get('[data-cy="register-submit"]').click()
    cy.url().should('include', '/login');
 
  });
});