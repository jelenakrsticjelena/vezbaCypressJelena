describe('Route all', () => {
    beforeEach(() => {
        cy.server()
        cy.route('GET', Cypress.env('apiUrl')+'/galleries?page=1&term=', 'fixture:all.json').as('jelena')
        cy.route('GET', Cypress.env('apiUrl')+'/my-galleries?page=1&term=').as('jelena2')
    })
    it.only('Wait for request to load', () => {
        cy.loginBe('jelllenakrstic@gmail.com', 'jelenak1908')
    //     cy.request('POST',Cypress.env('apiUrl') + '/auth/login', 
    //     {"email":"jelllenakrstic@gmail.com","password":"jelenak1908"})
    //    .then((resp)=>{
    //        expect(resp.body).to.have.property('access_token')
    //        expect(resp.body).to.have.property('token_type')
    //        localStorage.setItem('token', resp.body.access_token)
    //    })
        //cy.visit('/')
        cy.wait('@jelena')

        cy.get('.nav-link').contains('My Galleries').click()
        cy.wait('@jelena2')
        cy.get('@jelena2').
        its('response').then((resp)=> {
            //cy.log(resp.body.galleries[0].id)
            cy.request({
                method: 'DELETE',
                url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[0].id,
                form: true,
                followRedirect: true,
                headers: {
                  authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            })
        })
  })
})