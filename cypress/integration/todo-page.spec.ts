describe('todo page', () => {
    beforeEach(()=>{
        cy.visit('/todo')
    })

    it('todo page show', ()=>{
        cy.get('.btn btn-primary')
        cy.get('.btn btn-danger')
    })
})