describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');

    cy.get('[data-testId="cypress-title"]').should('exist')
    .should('have.text',"Task Manager")
  })
})