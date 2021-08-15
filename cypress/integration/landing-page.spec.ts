describe('Landing Page test', ()=>{

    const typedEmail = 'xmsquared77@gmail.com'; 
    const typedPassword = '12345678';
    const userName = 'Muchun Xu';
    const age = 21;

    beforeEach(()=>{
        cy.visit('/')
    })

    it('login page takes input', () =>{

        cy.get('#loginEmail')
          .type(typedEmail)
          .should('have.value', typedEmail)

        cy.get('#loginPassword')
          .type(typedPassword)
          .should('have.value', typedPassword)
    })

    it('loggin in on submit and shows right information', () => {
        cy.get('#loginEmail')
          .type(typedEmail)

        cy.get('#loginPassword')
          .type(typedPassword)
          .type('{enter}')

        // cy.server()

        // cy.route('POST', 'https://api-nodejs-todolist.herokuapp.com/user/login') 
        //   .as('getDetail')

        // cy.wait('@getDetail')
        cy.wait(5000)


        cy.get('#ProfileUsername')
        .should('have.value', userName)
    
        cy.get('#ProfileEmail')
            .should('have.value', typedEmail)

        cy.get('#ProfilePassword')
            .should('have.value', '')

        cy.get('#ProfileAge')
            .should('have.value', age)
    })

})