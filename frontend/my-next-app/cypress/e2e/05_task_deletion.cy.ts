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

    cy.visit("/tasks/todo");
    cy.contains(title, { timeout: 10000 }).should("exist");
    cy.intercept('DELETE', '/task/*').as('deleteTask');
    cy.contains(title).parents('[data-cy="task-card"]').within(() => {
      cy.get('[data-cy="task-delete"]').should('exist').click();
    });
    cy.wait('@deleteTask');
    cy.reload()
    cy.contains(title, { timeout: 10000 }).should('not.exist');
  });
});

describe('Task-Delete (USER CANNOT DELETE)', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy="login-email"]').type('user@example.com'); // use a regular user email
    cy.get('[data-cy="login-password"]').type('test1234');
    cy.get('[data-cy="login-submit"]').click();
    cy.window().its('localStorage.role').should('not.eq', 'admin');
  });

  it('user cannot see delete button on any task', () => {
    cy.visit('/tasks/todo');
    cy.get('[data-cy="task-card"]').each(($el) => {
      cy.wrap($el).find('[data-cy="task-delete"]').should('not.exist');
    });
  });
});