
import {EMAIL} from '../fixtures/constants'
import {authPage} from '../page_object/login.page'
import {createGallery} from '../page_object/gallery.page'
//import {GALLERY} from '../fixtures/constants'

let image1 = "https://s10443.pcdn.co/wp-content/uploads/2012/08/iStock_000013029060Large.jpg";
let image2 = "https://r-cf.bstatic.com/images/hotel/max1024x768/222/222636340.jpg";


describe('Create edit delete gallery', () => {
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
      createGallery.create('neki title', 'neki description', image1)
      cy.visit('/my-galleries')
      cy.get('.box-title').eq(0).click()
      cy.wait(2000)
      cy.get('.btn-custom').contains('Edit Gallery').click()
      cy.wait(2000)
      cy.get('button[type="button"]').contains('Add image').click()
      cy.wait(2000)
      cy.get('.form-control').eq(3).type(image2)
      cy.wait(2000)
      cy.get('.form-control').eq(0).clear()
      cy.wait(1000)
      cy.get('.form-control').eq(0).type('- promenjeni title')

      cy.get('.fa-chevron-circle-up').eq(1).click()
      cy.wait(2000)
      cy.get('.fa-chevron-circle-down').eq(0).click()
      cy.wait(2000)
      cy.get('button[type=submit]').contains('Submit').click()

      cy.wait(1000)
      cy.visit('/my-galleries')
      cy.get('.box-title').eq(0).click()

      cy.wait(1000)
      cy.get('.carousel-control-next-icon').click()

      cy.wait(1000)
      cy.get('.carousel-control-prev-icon').click()
  })

  
    
})
