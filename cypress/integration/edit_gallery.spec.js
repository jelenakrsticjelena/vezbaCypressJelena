
import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {createGallery} from '../page_object/gallery.page'
//import {GALLERY} from '../fixtures/constants'

//let Image1 = "https://www.e-know.ca/wp-content/uploads/2019/04/sunny.jpg";


describe('Create edit delte gallery', () => {
    beforeEach(() => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
    cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
    cy.wait('@galleries')
    cy.get('.nav-link').contains('Logout').should('be.visible')
    })

  it.only('Create and edit new gallery valid  ', () => {
      cy.visit('/create')
      createGallery.create('neki title', 'neki description', 'https://www.e-know.ca/wp-content/uploads/2019/04/sunny.jpg')
      cy.visit('/my-galleries')
      cy.get('.box-title').eq(0).click()
      cy.wait(2000)
      cy.get('.btn-custom').contains('Edit Gallery').click()
      cy.get('button[type="button"]').contains('Add image').click()
      cy.wait(2000)
      cy.get('.form-control').eq(3).type('https://r-cf.bstatic.com/images/hotel/max1024x768/222/222636340.jpg')
      cy.wait(2000)
      cy.get('button[type=submit]').contains('Submit').click()
    //pitati kako resiti .fus
      cy.get('.fas').eq(2).click()

  })

  
    
})
