describe('template spec', () => {
  it('new tasks', () => {
    cy.visit('http://localhost:3000/dashboard');

    cy.get('[data-cy="add-task-title"]').type("Enter a title")
    cy.get('[data-cy="add-task-status"]').select('todo')
    cy.get('[data-cy="add-task-desc"]').type('Description')
    cy.get('[data-cy="add-task-date"]').type('2025-04-29')
    cy.get('[data-cy="add-task-submit"]').click()
  

  })
})