describe('Task-Delete(ADMIN ONLY)', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type('admin@example.com');
    cy.get('[data-cy="login-password"]').type('test1234');
    cy.get('[data-cy="login-submit"]').click();
    cy.window().its('localStorage.role').should('eq', 'admin');
  });

  it('admin can only delete task', () => {
    cy.visit('/dashboard');
    const title = "Task 1 title";
    const desc = "Description";
    const date = "2025-05-06";
    const status = "todo";
    cy.get('[data-cy="add-task-title"]').type(title);
    cy.get('[data-cy="add-task-status"]').select(status);
    cy.get('[data-cy="add-task-desc"]').type(desc);
    cy.get('[data-cy="add-task-date"]').type(date);
    cy.get('[data-cy="add-task-submit"]').click();

    cy.visit("/tasks/all");
    cy.contains(title, { timeout: 10000 }).should("exist");

    // Intercept the DELETE request
    cy.intercept('DELETE', '/task/*').as('deleteTask');

    cy.contains(title).parents('[data-cy="task-card"]').within(() => {
      cy.get('[data-cy="task-delete"]').should('exist').click();
    });

    // Wait for the delete API call to finish
    cy.wait('@deleteTask');
    cy.reload()

    // Now check that the task is gone
    cy.contains(title, { timeout: 10000 }).should('not.exist');
  });
});