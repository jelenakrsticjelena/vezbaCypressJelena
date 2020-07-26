const faker = require('faker');

let email = faker.internet.email();
let password = faker.internet.password();
let firstName = faker.name.firstName();

describe('Login module', () => {
    it('GA-19 : Login page layout', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.log(email)
      cy.get('#email').type(email)
      cy.get('form > :nth-child(2)').type(password)
      cy.get('[type=submit]').should('be.visible')
    })

    it('GA-28 : Login - valid data', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type('jelllenakrstic@gmail.com')
      cy.get('#password').type('jelenak1908')
      cy.get('[type=submit]').click()
      cy.wait(1000)
      cy.get('.nav-link').contains('Logout').should('be.visible')
    })

    it('GA-22 : Login - invalid data - username', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type(email)
      cy.get('#password').type('jelenak1908')
      cy.get('[type=submit]').click()
      cy.get('.alert').should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
    })

    it('GA-25 : Login - invalid data - password', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type('jelllenakrstic@gmail.com')
      cy.get('#password').type(password)
      cy.get('[type=submit]').click()
      cy.get('.alert').should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
    })

    it('GA-26 : Login - invalid data - username and password', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type(email)
      cy.get('#password').type(password)
      cy.get('[type=submit]').click()
      cy.get('.alert').should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
    })
    it.only('GA-32 : User is logged', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type('jelllenakrstic@gmail.com')
      cy.get('#password').type('jelenak1908')
      cy.get('[type=submit]').click()
      cy.wait(1000)
      cy.get('.nav-link').contains('Logout').should('be.visible')
      cy.get('.nav-link').contains('My Galleries')
      cy.get('.nav-link').contains('Create Gallery')
      cy.get('.nav-link').contains('Logout')
      cy.get('.title-style').contains('All Galleries')
      //PROBA cy.get('.form-control').contains('Search...')
      //PROBA cy.get('.form-control').type('neki tekst')
      cy.get('.form-control').should('have.attr', 'placeholder', 'Search...')
      cy.get('[type=button]').should('be.visible').click()
    })
  })
