describe('Kanban', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Add column workflow', () => {
    // Click "Add Column" button
    cy.get('button').contains('Add Column').click();

    // Maximum number of tasks default value should be 5
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .should('have.value', '5');

    // "Add" button should be disabled at open
    cy.get('button[type=submit]').should('be.disabled');

    // Should "Add" button be enabled if both inputs are filled
    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .type('ColumnName');
    cy.get('button[type=submit]').should('be.enabled');

    // Should "Add" button be disabled if both inputs are empty
    cy.get('[data-testid="column-name-input"]').find('input').clear();
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear();
    cy.get('button[type=submit]').should('be.disabled');

    // Should "Add" button be disabled if number of tasks is smaller than 1
    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .type('ColumnName');
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .type(`-${Math.floor(Math.random())}`);

    // Should create new column functionality work fine
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear()
      .type(`69`);
    cy.get('button[type=submit]').click();
    cy.get('div').contains('Column successfully added');
    cy.get('div').contains('ColumnName');
    cy.get('div').contains('0/69');
  });

  it('Edit column workflow', () => {
    // Click "Add Column" button
    cy.get('[data-testid="column-ColumnName-edit-icon"]').click();

    // Should values in edit modal be the same like in column
    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .should('have.value', 'ColumnName');
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .should('have.value', '69');

    // Should button be disabled at open because values are equals
    cy.get('button[type=submit]').should('be.disabled');

    // Should button be enabled if we change maximum number of tasks or name
    // Change maximum number of tasks and check if button is enabled
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear()
      .type(`100`);
    cy.get('button[type=submit]').should('be.enabled');

    // Go back to default value
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear()
      .type(`69`);
    cy.get('button[type=submit]').should('be.disabled');

    // Change name and check if button is enabled
    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .clear()
      .type(`EditedColumnName`);
    cy.get('button[type=submit]').should('be.enabled');

    // Should edit column functionality work fine
    cy.get('button[type=submit]').click();
    cy.get('div').contains('Column successfully edited');
    cy.get('div').contains('EditedColumnName');
    cy.get('div').contains('0/69');
  });

  it('Add task workflow', () => {
    // Click "Add Task" button
    cy.get('[data-testid="EditedColumnName-column-add-task"]').click();

    // Inputs should be empty at open
    cy.get('[data-testid="task-name-input"]')
      .find('input')
      .should('have.value', '');
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .should('have.value', '');

    // "Add" button should be disabled at open
    cy.get('button[type=submit]').should('be.disabled');

    // Should "Add" button be disabled if both inputs are empty
    cy.get('[data-testid="task-name-input"]').find('input').clear();
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .clear();
    cy.get('button[type=submit]').should('be.disabled');

    // Should "Add" button be enabled if both inputs are filled
    cy.get('[data-testid="task-name-input"]').find('input').type('TaskName');
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .type('TaskDescription');
    cy.get('button[type=submit]').should('be.enabled');

    // Should create new task functionality work fine
    cy.get('button[type=submit]').click();
    cy.get('div').contains('Task successfully added');
    cy.get('div').contains('TaskName');
    cy.get('div').contains('TaskDescription');
  });

  it('Edit task workflow', () => {
    // Click "Edit Task" button
    cy.get('[data-testid="task-TaskName-edit-icon"]').click();

    // Should values in edit modal be the same like in Task
    cy.get('[data-testid="task-name-input"]')
      .find('input')
      .should('have.value', 'TaskName');
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .should('have.value', 'TaskDescription');

    // "Edit" button should be disabled at open
    cy.get('button[type=submit]').should('be.disabled');

    // Should "Edit" button be enabled if we change one of inputs
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .clear()
      .type('EditedTaskDescription');
    cy.get('button[type=submit]').should('be.enabled');

    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .clear()
      .type('TaskDescription');
    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="task-name-input"]')
      .find('input')
      .clear()
      .type('EditedTaskName');
    cy.get('button[type=submit]').should('be.enabled');

    // Should edit task functionality work fine
    cy.get('button[type=submit]').click();
    cy.get('div').contains('Task successfully edited');
    cy.get('div').contains('EditedTaskName');
    cy.get('div').contains('TaskDescription');
  });

  it('Delete task workflow', () => {
    // Click "Delete Task" button
    cy.get('[data-testid="task-EditedTaskName-delete-icon"]').click();

    cy.get('div').contains('Task successfully deleted');
  });

  it('Delete column workflow', () => {
    // Click "Delete Column" button
    cy.get('[data-testid="column-EditedColumnName-delete-icon"]').click();

    cy.get('div').contains('Column successfully deleted');
  });
});
