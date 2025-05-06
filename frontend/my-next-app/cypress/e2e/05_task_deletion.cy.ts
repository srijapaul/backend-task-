describe('Task-Delete(ADMIN ONLY)',()=>{
    beforeEach(()=>{
        cy.visit('/login');
cy.get('[data-cy="login-email"]').type('admin@example.com');
cy.get('[data-cy="login-password"]').type('test1234');
cy.get('[data-cy="login-submit"]').click();

// Wait for role to be set in localStorage
cy.window().its('localStorage.role').should('eq', 'admin');
    })
    it('admin can only delete task',()=>{
        cy.visit('/dashboard')
        const title="Task 1 title"
        const desc="Description"
        const date="2025-05-06"
        const status="todo"
         cy.get('[data-cy="add-task-title"]').type(title)
    cy.get('[data-cy="add-task-status"]').select(status)
    cy.get('[data-cy="add-task-desc"]').type(desc)
    cy.get('[data-cy="add-task-date"]').type(date)
    cy.get('[data-cy="add-task-submit"]').click()
    //cy.contains(title,{timeout:10000}).should("exist")

    cy.visit("/tasks/all")
    cy.contains(title).should("exist")
    cy.contains(title).parents('[data-cy="task-card"]').within(() => {
  cy.get('[data-cy="task-delete"]').should('exist').click();
});
    cy.contains(title).should('not.exist')
  

    })
})