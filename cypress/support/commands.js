// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('headerAdding', () => {

    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    return config;
})

Cypress.Commands.add('login', () => { 
    cy.request({
      method: 'POST',
      url: 'https://api-nodejs-todolist.herokuapp.com/user/login',
      body: {
        user: {
          email: 'xmsquared77@gmail.com',
          password: '12345678',
        }
      }
    })
    .then(response => {
        localStorage.setItem('token', JSON.stringify(response.data.token))
    })
  
})

Cypress.Commands.add('getUser', () => { 
    const config = Cypress.headerAdding();

    cy.request({
      method: 'POST',
      url: 'https://api-nodejs-todolist.herokuapp.com/user/me',
      header: config,
      body: {
        user: {
          email: 'xmsquared77@gmail.com',
          password: '12345678',
        }
      }
    })
    .then(response => {
        return {
            name: response.data.name,
            age: response.data.age,
            email: response.data.email,
        }
    })
  
})