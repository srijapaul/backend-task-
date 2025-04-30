describe('Tasks Dynamic Routing', () => {
  const categories = ['todo', 'doing', 'done'];

  categories.forEach(category => {
    it(`shows tasks for category: ${category}`, () => {
      //task for this category in the backend
      cy.request('POST', 'http://localhost:4000/task/add', {
        title: `Cypress ${category} task`,
        description: 'Test task',
        status: category,
        dueDate: '2025-05-01'
        
      });
      cy.intercept('GET','/task*').as('getTasks');


      // frontend
      cy.visit(`http://localhost:3000/tasks/${category}`);
      cy.wait('@getTasks').its('response.statusCode').should('exist',200)
      cy.get('[data-cy="task-card"]', { timeout: 10000 }).should('exist');
      cy.get('[data-cy="task-title"]').should('exist');
    });
  });

  it('can change task status', () => {
    // task first at backend
    cy.request('POST', 'http://localhost:4000/task/add', {
      title: `Cypress status change task`,
      description: 'Test task',
      status: 'todo',
      dueDate: '2025-05-01'
    });
    cy.intercept('PATCH', '/task/*').as('updateTasks');
    cy.visit('http://localhost:3000/tasks/todo');
    cy.get('[data-cy="task-card"]').first().within(() => {
      cy.get('[data-cy="task-doing"]').click();
    });
cy.wait('@updateTasks');
  });
});