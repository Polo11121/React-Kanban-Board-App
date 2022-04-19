describe('Kanban', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Register user', () => {
    // Click "Register" button
    cy.get('button').contains('Register').click();

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="register-email-input"]').type('atestemail');

    cy.get('[data-testid="register-email-input-error"]').should(
      'have.text',
      'Invalid email'
    );

    cy.get('[data-testid="register-email-input"]').type('@poczta.com');

    cy.get('[data-testid="register-email-input-error"]').should(
      'not.be.visible'
    );

    cy.get('[data-testid="register-login-input"]').type('atestlogin');
    cy.get('[data-testid="register-password-input"]').type('atest');

    cy.get('[data-testid="register-password-input-error"]').should(
      'have.text',
      'Invalid password (min. 6 characters)'
    );

    cy.get('[data-testid="register-password-input"]').type('haslo');

    cy.get('[data-testid="register-password-input-error"]').should(
      'not.be.visible'
    );
    cy.get('[data-testid="register-repeatPassword-input-error"]').should(
      'have.text',
      'Passwords must be equals'
    );

    cy.get('[data-testid="register-repeatPassword-input"]').type('atesthaslo');

    cy.get('[data-testid="register-repeatPassword-input-error"]').should(
      'not.be.visible'
    );

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('button[type=submit]').click();

    cy.get('div').contains('Welcome atestlogin').should('be.visible');

    cy.get('[data-testid="header-user-avatar"]').click();
    cy.get('[data-testid="header-logout-button"]').click();

    cy.get('[data-testid="main-logo"]').should('be.visible');
  });

  it('Login user', () => {
    Cypress.on('uncaught:exception', () => {
      return false;
    });

    cy.get('button').contains('Login').click();

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('button[type=submit]').click();

    cy.get('[data-testid="login-error"]').should(
      'have.text',
      'Invalid login or password!'
    );

    cy.get('[data-testid="login-email-input"]').type('atestemail@poczta.com');

    cy.get('[data-testid="login-error"]').should('not.be.visible');

    cy.get('[data-testid="login-password-input"]').type('atesthaslo');

    cy.get('button').contains('Login').click();

    cy.get('div').contains('Welcome atestlogin').should('be.visible');
  });

  it('Members list', () => {
    cy.get('[data-testid="header-members-button"]').click();

    cy.get('h1').contains('MEMBERS').should('be.visible');
    cy.get('[data-testid="members-list-task-button"]').should('be.disabled');

    cy.get('[data-testid="members-list-task-input"]').clear();
    cy.get('[data-testid="members-list-task-input"]').type('3131231');

    cy.get('[data-testid="members-list-task-button"]').should('be.enabled');

    cy.get('[data-testid="members-list-task-button"]').click();

    cy.get('div').contains('Number of tasks changed').should('be.visible');

    cy.get('[data-testid="members-modal-close-icon"]').click();

    cy.get('[data-testid="bench-task-limit-31312310"]').should('be.visible');

    cy.get('[data-testid="header-members-button"]').click();
    cy.get('[data-testid="members-list-task-input"]').clear();
    cy.get('[data-testid="members-list-task-button"]').click();

    cy.get('div').contains('Number of tasks changed').should('be.visible');

    cy.get('[data-testid="members-modal-close-icon"]').click();

    cy.get('[data-testid="bench-task-limit-infinity"]').should('be.visible');
  });

  it('Section Workflow', () => {
    cy.get('[data-testid="header-section-button"]').click();

    cy.get('h1').contains('ADD SECTION').should('be.visible');
    cy.get('button[type=submit]').should('be.disabled');
    cy.get('[data-testid="section-name-input"]')
      .find('input')
      .should('have.value', '');
    cy.get('[data-testid="section-task-limit-input"]')
      .find('input')
      .should('have.value', '');

    cy.get('[data-testid="section-name-input"]').type('     ');

    cy.contains('Section name cannot be empty').should('be.visible');

    cy.get('[data-testid="section-name-input"]').clear().type('testsection');
    cy.get('[data-testid="section-task-limit-input"]').type('siuu');

    cy.contains('Invalid number of tasks').should('be.visible');

    cy.get('[data-testid="section-task-limit-input"]').clear().type('10');

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('button[type=submit]').click();

    cy.get('div')
      .contains('Section testsection successfully added')
      .should('be.visible');
    cy.get('[data-testid="section-name-testsection"]').should('be.visible');

    cy.get('[data-testid="section-name-testsection-delete-icon"]').click();

    cy.get('h1').contains('DELETE Section').should('be.visible');
    cy.get('[data-testid="delete-button"]').should('be.enabled');

    cy.get('[data-testid="delete-button"]').click();

    cy.get('div').contains('Section successfully removed').should('be.visible');
  });

  it('Add column workflow', () => {
    cy.get('[data-testid="add-column-button"]').click();

    cy.get('h1').contains('add column').should('be.visible');
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .should('have.value', '');
    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .should('have.value', '');
    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .type('ColumnName');
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .type('5');

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('[data-testid="column-name-input"]').find('input').clear();
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear();

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .type('ColumnName');
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .type(`-${Math.floor(Math.random())}`);

    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear()
      .type(`69`);

    cy.get('button[type=submit]').click();

    cy.get('div').contains('Column successfully added').should('be.visible');
    cy.get('div').contains('ColumnName').should('be.visible');
    cy.get('div').contains('0/69').should('be.visible');
  });

  it('Edit column workflow', () => {
    cy.get('[data-testid="column-ColumnName-edit-icon"]').click();

    cy.get('h1').contains('edit column').should('be.visible');
    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .should('have.value', 'ColumnName');
    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .should('have.value', '69');
    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear()
      .type(`100`);

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('[data-testid="column-number-of-tasks-input"]')
      .find('input')
      .clear()
      .type(`69`);

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="column-name-input"]')
      .find('input')
      .clear()
      .type(`EditedColumnName`);

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('button[type=submit]').click();

    cy.get('div').contains('Column successfully edited').should('be.visible');
    cy.get('div').contains('EditedColumnNam...').should('be.visible');
    cy.get('div').contains('0/69').should('be.visible');
  });

  it('Add task workflow', () => {
    cy.get('[data-testid="EditedColumnName-column-add-task"]').click();

    cy.get('h1').contains('add task').should('be.visible');
    cy.get('[data-testid="task-name-input"]')
      .find('input')
      .should('have.value', '');
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .should('have.value', '');
    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="task-name-input"]').find('input').clear();
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .clear();

    cy.get('button[type=submit]').should('be.disabled');

    cy.get('[data-testid="task-name-input"]').find('input').type('TaskName');
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .type('TaskDescription');

    cy.get('[class*="-control"]')
      .click(0, 0, { force: true })
      .get('[class*="-menu"]')
      .find('[class*="-option"]')
      .eq(2)
      .click(0, 0, { force: true });
    cy.get('h1').contains('add task').click();

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('button[type=submit]').click();

    cy.get('div').contains('Task successfully added').should('be.visible');
    cy.get('div').contains('TaskName').should('be.visible');
    cy.get('div').contains('TaskDescription').should('be.visible');
  });

  it('Edit task workflow', () => {
    cy.get('[data-testid="task-TaskName-edit-icon"]').click();

    cy.get('[data-testid="task-name-input"]')
      .find('input')
      .should('have.value', 'TaskName');
    cy.get('[data-testid="task-description-input"]')
      .find('textarea')
      .first()
      .should('have.value', 'TaskDescription');
    cy.get('button[type=submit]').should('be.disabled');

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
    cy.get(`[aria-label^=Remove]`).click();

    cy.get('button[type=submit]').should('be.enabled');

    cy.get('button[type=submit]').click();
    cy.get('div').contains('Task successfully edited').should('be.visible');
    cy.get('div').contains('EditedTask...').should('be.visible');
    cy.get('div').contains('TaskDescription').should('be.visible');
  });

  it('Delete column with tasks workflow', () => {
    cy.get('[data-testid="column-EditedColumnName-delete-icon"]').click();

    cy.get('h1').contains('DELETE Column').should('be.visible');
    cy.get('[data-testid="delete-button"]').should('be.disabled');

    cy.get('[data-testid="close-delete-modal-icon"]').click();
  });

  it('Delete Task workflow', () => {
    cy.get('[data-testid="task-EditedTaskName-delete-icon"]').click();

    cy.get('h1').contains('DELETE Task').should('be.visible');
    cy.get('[data-testid="delete-button"]').should('be.enabled');

    cy.get('[data-testid="delete-button"]').click();

    cy.get('div').contains('Task successfully removed').should('be.visible');
  });

  it('Delete Column workflow', () => {
    cy.get('[data-testid="column-EditedColumnName-delete-icon"]').click();

    cy.get('h1').contains('DELETE Column').should('be.visible');
    cy.get('[data-testid="delete-button"]').should('be.enabled');

    cy.get('[data-testid="delete-button"]').click();

    cy.get('div').contains('Column successfully removed').should('be.visible');
  });

  it('Delete User workflow', () => {
    cy.get('[data-testid="header-user-avatar"]').click();
    cy.get('[data-testid="header-logout-button"]').click();

    cy.get('[data-testid="main-logo"]').should('be.visible');

    cy.get('button').contains('Login').click();
    cy.get('[data-testid="login-email-input"]').type('Mariusz@poczta.com');
    cy.get('[data-testid="login-password-input"]').type('mariusz123');
    cy.get('button').contains('Login').click();

    cy.get('div').contains('Welcome Mariuszek').should('be.visible');

    cy.get('[data-testid="header-members-button"]').click();
    cy.get('[data-testid="atestlogin-delete-icon"]').click();

    cy.get('h1').contains('DELETE Member').should('be.visible');
    cy.get('[data-testid="delete-button"]').should('be.enabled');

    cy.get('[data-testid="delete-button"]').click();

    cy.get('div').contains('Member successfully removed').should('be.visible');

    cy.get('[data-testid="members-modal-close-icon"]').click();
    cy.get('[data-testid="header-user-avatar"]').click();
    cy.get('[data-testid="header-logout-button"]').click();

    cy.get('[data-testid="main-logo"]').should('be.visible');
  });
});
