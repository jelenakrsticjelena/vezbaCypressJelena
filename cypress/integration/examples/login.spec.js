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

    it(' Login - invalid data - password', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type('jelllenakrstic@gmail.com')
      cy.get('#password').type(password)
      cy.get('[type=submit]').click()
      cy.get('.alert').should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
    })
  })