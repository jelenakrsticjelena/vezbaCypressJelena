import { EMAIL } from '../fixtures/constants'
import {authPage} from  '../page_object/login.page'

const faker = require('faker');

let text = faker.random.words();

describe('Home page module', () => {

    before(() => {
      cy.visit('/login')
      authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
      cy.server()
      cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
      //cy.wait('@galleries')
      cy.get('.form-control').should('have.attr', 'placeholder', 'Search...')
      cy.get('[type=button]').should('be.visible').click()
    });

    
    it('GA-5 : Home page-filter ', () => {
        cy.wait('@galleries')
        cy.get('.form-control').type(text)
        cy.get('[type=button]').click()
        cy.get('h4').contains('No galleries found').should('be.visible')
        cy.wait('@galleries')
        cy.get('.form-control').type('Galerija No name7')
        cy.get('[type=button]').click()

    //     cy.get('.cell').should((.box-title) => {
        
    //         // expect($lis.eq(0)).to.contain('Walk the dog')
    //     cy.get('.cell').should('have.text('Galerija No name7'),
    //                    .should('be.visible'),
    // });
    })
})