//import { INVALIDEMAIL } from '../fixtures/constants'
//import { INVALIDPASSWORD } from '../fixtures/constants'

const faker = require('faker');

let email = faker.internet.email();
let password = faker.internet.password();
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password2 = faker.internet.password();


describe('Register module', () => {

  before(() => {
    cy.visit('/')
  });

  beforeEach(() => {
    cy.visit('/register')
  });

    it('GA-9 : Register page test ', () => {
      cy.get('.nav-link').contains('Register').click()
      cy.get('#first-name').should('be.visible').click()
      cy.get('#last-name').should('be.visible').click()
      cy.get('#email').should('be.visible').click()
      cy.get('#password').should('be.visible').click()
      cy.get('#password-confirmation').should('be.visible').click()
      cy.get('[type="checkbox"]').should('be.visible')
      cy.get('[type="checkbox"]').check() 
      cy.get('[type=submit]').should('be.visible')
    })

    it('GA-14 : Register page positive test - valid data', () => { 
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
      })

      it('GA-23 : Register page - visibility as logged in user', () => {
        cy.get('#first-name').type(firstName)
        cy.get('#last-name').type(lastName)
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#password-confirmation').type(password)
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
        cy.wait(1000)
        cy.get('.nav-link').contains('Register').should('not.be.visible')
      })


    // ucili na casu 27.07.2020. Pitati kako uraditi za Register da bude nevidljivo
    it('GA-40 : Register page test - First name input field: required', () => {
    cy.get('#first-name').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type(password)
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.nav-link').contains('Register').should('not.be.visible')
    })

// ucili na casu 27.07.2020.
it.only('GA-46 : Register page test - Last name input field: required ', () => {
     cy.get('#first-name').type(firstName)
     cy.get('#last-name').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
     cy.get('#email').type(email)
     cy.get('#password').type(password)
     cy.get('#password-confirmation').type(password)
     cy.get('[type="checkbox"]').check()
     cy.wait(1000)
     cy.get('[type=submit]').click() 
     cy.wait(1000)
     //cy.get('.nav-link').contains('Register').should('not.be.visible')
   })

//   ucili na casu 27.07.2020.  
it('GA-54 : Register page test - Email field required', () => { 
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type(password)
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
  })

  it('GA-55 : Register page test - Email field format invalid', () => {
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type('invalidemail.com@com')  
    cy.get('#password').type(password).click()
    cy.get('#password-confirmation').type(password)
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The email must be a valid email address.')
                  .should('have.class', 'alert')
  })

  
    // ucili na casu 27.07.2020.  
  it('GA-59 : Register page test - Password input field empty', () => { 
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#password').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
    cy.get('#password-confirmation').type(password)
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
  })

   // ucili na casu 27.07.2020.  
   it('GA-60 : Register page test - Password Confirm input field empty', () => { 
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#password').type(password)
    cy.get('#password-confirmation').then(($input) => {
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    })
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)

  })

  it('GA-81 : Confirmation password doesnt match', () => { 
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type(password2)
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The password confirmation does not match.')
                  .should('have.class', 'alert')
  })

  it('GA-82 : Password form - invalid', () => {
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#password').type('testetest')
    cy.get('#password-confirmation').type('testetest')
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The password format is invalid.')
                  .should('have.class', 'alert')
  })

  it('GA-83 : Password form - password has less then 8 characters ', () => {
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#password').type('test2')
    cy.get('#password-confirmation').type('test2')
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The password must be at least 8 characters.')
                  .should('have.class', 'alert')
  })

  it('GA-84 : User can not register twice', () => { 
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type('jelllenakrstic@gmail.com')  
    cy.get('#password').type('testtest2')
    cy.get('#password-confirmation').type('testtest2')
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The email has already been taken.')
                  .should('have.class', 'alert')
  })
})

