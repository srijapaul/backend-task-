import { faker } from '@faker-js/faker';

describe('Register Form', () => {
     it('registers without an email format', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/register').as('registerRequest');
    cy.intercept('*',(req)=>{
      console.log('request',req)
    })
    cy.visit('http://localhost:3000/register'); // Uses baseUrl from config

    cy.get('[data-cy="register-email"]').type('admin@example.com');
    cy.get('[data-cy="register-password"]').type('test1234');
    cy.get('[data-cy="register-confirm"]').type('test1234');
    cy.get('[data-cy="register-role"]').select('admin');
    cy.get('[data-cy="register-submit"]').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/wrong email/i);
    });
});

   it('registers without confirming the password', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/register').as('registerRequest');
    cy.intercept('*',(req)=>{
      console.log('request',req)
    })
    cy.visit('http://localhost:3000/register'); // Uses baseUrl from config

    cy.get('[data-cy="register-email"]').type('admin@example.com');
    cy.get('[data-cy="register-password"]').type('test1234');
    cy.get('[data-cy="register-confirm"]').type('test2234');
    cy.get('[data-cy="register-role"]').select('admin');
    cy.get('[data-cy="register-submit"]').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/passwords are not matching/i);
    });
});
   it('registers with unique email ids', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/register').as('registerRequest');
    cy.intercept('*',(req)=>{
      console.log('request',req)
    })
    cy.visit('http://localhost:3000/register'); // Uses baseUrl from config
//for same email id testing
    const email = faker.internet.email();
     const password = faker.internet.password();
     const roles = ['user', 'admin'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    cy.get('[data-cy="register-email"]').type(email);
    cy.get('[data-cy="register-password"]').type(password);
    cy.get('[data-cy="register-confirm"]').type(password);
    cy.get('[data-cy="register-role"]').select(randomRole);
    cy.get('[data-cy="register-submit"]').click();
      cy.url({ timeout: 10000 }).should('include', '/login');
});


  it('registers a new user', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/register').as('registerRequest');
    cy.intercept('*',(req)=>{
      console.log('request',req)
    })
    cy.visit('http://localhost:3000/register'); // Uses baseUrl from config
    //for same email id testing
    // const email = faker.internet.email();
    // const password = faker.internet.password();
    // const roles = ['user', 'admin'];
    // const randomRole = roles[Math.floor(Math.random() * roles.length)];

    cy.get('[data-cy="register-email"]').type('admin@example.com');
    cy.get('[data-cy="register-password"]').type('test1234');
    cy.get('[data-cy="register-confirm"]').type('test1234');
    cy.get('[data-cy="register-role"]').select('admin');
    cy.get('[data-cy="register-submit"]').click();


     cy.on('window:alert', (txt) => {
      expect(txt).to.match(/email already exists/i);
    });
  
  });

})