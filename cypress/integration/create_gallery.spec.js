import { EMAIL } from '../fixtures/constants'
import {authPage} from  '../page_object/login.page'
import {createGallery} from '../page_object/gallery.page'

let url1 = "https://gallery-app.vivifyideas.com/";
let image1 = "https://18ogess18pg1ptgub1nm316t-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/21333414_web1_200420-CRM-earth-day-EARTHDAY_1.jpg";
let image2 = "https://www.e-know.ca/wp-content/uploads/2019/04/sunny.jpg";
let image3 = "https://webcomicms.net/sites/default/files/clipart/172845/picture-sunny-day-172845-7790010.jpg"

describe('Create new gallery module', () => {

    before(() => {
      cy.visit('/login')
      authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
      cy.server()
      cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
      cy.wait('@galleries')
      cy.get('.nav-link').contains('Create Gallery').click()
    });

    
      it('GA-12 : Create New Gallery Page', () => {
        createGallery.create('new gallery', 'description of new gallery', image1)
        // cy.get('#title').type('new gallery')
        // cy.get('#description').type('description of new gallery')
        // cy.get("[type=url]").type(image1)
        // cy.get("[type=button]").contains('Add image').click()
        // cy.get("[type=url]").eq(1).type(image2)
        // cy.get("[type=button]").contains('Add image').click()
        // cy.get("[type=url]").eq(2).type(image3)
        // cy.get("[type=submit]").contains('Submit').click()
        cy.url().should('eq', url1)
      })


      it.only('GA-12 : Create New Gallery Page - provera paginacije', () => {
        
        for (var i = 0; i <= 10; i++) {
          cy.visit('/create')
        createGallery.create('test gallery', 'description of test gallery', image1)
        }
        cy.visit('/my-galleries')
        cy.get('.grid').children().should('have.length', 10)
        // OVO NE   createGallery.create('new gallery','description of new gallery', image1)

      // delete galleries
      //  for (var i = 0; i < 10; i++) {
      //   cy.visit('/my-galleries')
      //   cy.get('.box-title').eq(0).click()
      //   cy.wait(1000)
      //   cy.get('.btn').contains('Delete Gallery').click()
      // }
        
    })
     
    })

  
       