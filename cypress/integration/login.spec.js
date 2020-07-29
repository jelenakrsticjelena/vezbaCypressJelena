
import { EMAIL } from '../fixtures/constants'
import {authPage} from  '../page_object/login.page'


const faker = require('faker');

//let email = faker.internet.email();
let password = faker.internet.password();
let firstName = faker.name.firstName();

describe('Login module', () => {

    before(() => {
      cy.visit('/')
    });

    beforeEach(() => {
      cy.visit('/login')
      cy.get('.nav-link').contains('Login').click()
      cy.server()
      cy.route('https://gallery-api.vivifyideas.com/api/galleries?page=1&term=').as('galleries')
    });

    afterEach(() => {
      cy.visit('/')
    });

    after(() => {
      cy.visit('/login')
    });
    
    // it.only('GA-19 : Login page layout', () => {
      
    //   cy.get('.nav-link').contains('Login').click()
    //   cy.log(email)
    //   cy.get('#email').type(email)
    //   cy.get('form > :nth-child(2)').type(password)
    //   cy.get('[type=submit]').should('be.visible')
    // })

    it.only('GA-28 : Login - valid data', () => { 
      authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
      cy.server()
      cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
      cy.wait('@galleries')

      // ova linija koda zamenjuje 3 linije koda ispod ovog komentara
      // authPage.email.type(EMAIL.EXISTING)
      // authPage.password.type(EMAIL.PASSWORD)
      // authPage.loginButton.click()
      //cy.wait(1000)
    
      cy.get('.nav-link').contains('Logout').should('be.visible')
    })

    it('GA-22 : Login - invalid data - username', () => {  
      authPage.login('test', EMAIL.PASSWORD)
      // authPage.email.type('test')
      // authPage.password.type('jelenak1908')
      // authPage.loginButton.click()
      authPage.email.then(($input) => {
        expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.')
      })
      
      // cy.get('.alert').should('be.visible')
      //                 .should('have.text', 'Bad Credentials')
      //                 .should('have.class', 'alert')
    })

    it('GA-25 : Login - invalid data - passwordpassword', () => {
      authPage.login(EMAIL.EXISTING, password)
      // authPage.email.type(EMAIL.EXISTING)
      // authPage.password.type(password)
      // authPage.loginButton.click()
      cy.get('.alert').should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
    })

    it('GA-26 : Login - invalid data - username and password', () => {
      authPage.email.type(EMAIL.EXISTING)
      cy.get('#password').type(password)
      authPage.loginButton.click()
      cy.get('.alert').should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
    })
    it('GA-32 : User is logged', () => {
      authPage.email.type(EMAIL.EXISTING)
      authPage.password.type(EMAIL.PASSWORD)
      authPage.loginButton.click()
      cy.wait(1000)
      cy.get('.nav-link').contains('Logout').should('be.visible')
      cy.get('.nav-link').contains('My Galleries')
      cy.get('.nav-link').contains('Create Gallery')
      cy.get('.nav-link').contains('Logout')
      cy.get('.title-style').contains('All Galleries')
      cy.get('.form-control').should('have.attr', 'placeholder', 'Search...')
      cy.get('[type=button]').should('be.visible').click()
    })
  })
