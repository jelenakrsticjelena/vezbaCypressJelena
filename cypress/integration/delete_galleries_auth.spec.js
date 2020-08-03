let image1 = "https://18ogess18pg1ptgub1nm316t-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/21333414_web1_200420-CRM-earth-day-EARTHDAY_1.jpg";
import {createGallery} from '../page_object/gallery.page'

describe ('Delete galeries', () => {
    beforeEach(() => {
        cy.server()
        cy.route('GET', Cypress.env('apiUrl')+'/my-galleries?page=1&term=').as('jelena')
    })

    it.only('kreiranje i brisanje galerija', () => {
        cy.loginBe('jelllenakrstic@gmail.com', 'jelenak1908')
        for (var i = 0; i <= 10; i++) {
          cy.visit('/create')
        createGallery.create('test gallery', 'description of test gallery', image1)
        }
        cy.visit('/my-galleries')
        cy.get('.grid').children().should('have.length', 10)
        
        cy.visit('/my-galleries')
        cy.wait(5000)
        cy.wait('@jelena')
        cy.get('@jelena').
        its('response').then ((resp)=> {

            for(var i=0; i<10; i++){
                let useCaseID = resp.body.galleries[i].id
                cy.request({
                    method: 'DELETE',
                    url:`${Cypress.env('apiUrl')}/galleries/${useCaseID}`,
                    form: true,
                    followRedirect: true,
                    headers: {
                        authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                    })
            }
        })
        

      });


    it('Wait for request to load', () => {
        cy.loginBe('jelllenakrstic@gmail.com', 'jelenak1908')
    //     cy.request('POST',Cypress.env('apiUrl') + '/auth/login', 
    //     {"email":"jelllenakrstic@gmail.com","password":"jelenak1908"})
    //    .then((resp)=>{
    //        expect(resp.body).to.have.property('access_token')
    //        expect(resp.body).to.have.property('token_type')
    //        localStorage.setItem('token', resp.body.access_token)
       
    // })
        cy.visit('/my-galleries')
        cy.wait(5000)
        cy.wait('@jelena')
        cy.get('@jelena').
        its('response').then ((resp)=> {
            //cy.log(resp.body.galleries[0].id)
            cy.request({
                method: 'DELETE',
                url: Cypress.env('apiUrl') + '/galleries/' + resp.body.galleries[i].id,
                form: true,
                followRedirect: true,
                headers: {
                  authorization: `Bearer ${window.localStorage.getItem('token')}`,
                },
            })
        })




  })
})