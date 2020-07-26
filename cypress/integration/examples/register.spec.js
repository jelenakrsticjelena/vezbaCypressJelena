const faker = require('faker');

let email = faker.internet.email();
let password = faker.internet.password();
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let password2 = faker.internet.password();
let testPassword = faker.internet.password({min_length = 4, max_length = 7, mix_case = true, special_chars = false});

describe('Register module', () => {
    it('GA-9 : Register page test ', () => {
      cy.visit('/')
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
        cy.visit('/register')  
        cy.get('#first-name').type(firstName).click()
        cy.get('#last-name').type(lastName).click()
        cy.get('#email').type(email).click()
        cy.get('#password').type(password).click()
        cy.get('#password-confirmation').type(password).click()
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
      })

      it('GA-23 : Register page - visibility as logged in user', () => {
        cy.visit('/register')  
        cy.get('#first-name').type(firstName).click()
        cy.get('#last-name').type(lastName).click()
        cy.get('#email').type(email).click()
        cy.get('#password').type(password).click()
        cy.get('#password-confirmation').type(password).click()
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
        cy.wait(1000)
        cy.get('.nav-link').contains('Register').should('not.be.visible')
      })


    // ovo nismo Radili  
        it('GA-40 : Register page test - First name input field: required', () => {
        cy.visit('/register')  
        cy.get('#first-name').type('').click()
        cy.get('.alert').should('be.visible')
                      .should('have.text', 'Please fill out this field')
                      .should('have.class', 'alert')
        cy.get('#last-name').type(lastName).click()
        cy.get('#email').type(email).click()
        cy.get('#password').type(password).click()
        cy.get('#password-confirmation').type(password).click()
        cy.get('[type="checkbox"]').check()
        cy.wait(1000)
        cy.get('[type=submit]').click() 
        cy.wait(1000)
        cy.get('.nav-link').contains('Register').should('not.be.visible')
      })

// ovo nismo Radili  
it('GA-46 : Register page test - Last name input field: required ', () => {
    cy.visit('/register')  
    cy.get('#first-name').type(firstName).click()
    cy.get('#last-name').type('').click()
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'Please fill out this field')
                  .should('have.class', 'alert')
    cy.get('#email').type(email).click()
    cy.get('#password').type(password).click()
    cy.get('#password-confirmation').type(password).click()
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.nav-link').contains('Register').should('not.be.visible')
  })

  // ovo nismo Radili  
it('GA-54 : Register page test - Email field required', () => {
    cy.visit('/register')  
    cy.get('#first-name').type(firstName).click()
    cy.get('#last-name').type(lastName).click()
    cy.get('#email').type('').click()
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'Please fill out this field')
                  .should('have.class', 'alert')
    cy.get('#password').type(password).click()
    cy.get('#password-confirmation').type(password).click()
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.nav-link').contains('Register').should('not.be.visible')
  })

  it('GA-55 : Register page test - Email field format invalid', () => {
    cy.visit('/register')  
    cy.get('#first-name').type(firstName).click()
    cy.get('#last-name').type(lastName).click()
    cy.get('#email').type('invalidemail.com@com').click()   
    cy.get('#password').type(password).click()
    cy.get('#password-confirmation').type(password).click()
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The email must be a valid email address.')
                  .should('have.class', 'alert')
  })

  
    // ovo nismo Radili  
  it('GA-59 : Register page test - Password input field empty', () => {
    cy.visit('/register')  
    cy.get('#first-name').type(firstName).click()
    cy.get('#last-name').type(lastName).click()
    cy.get('#email').type(email).click()   
    cy.get('#password').type('').click()
    cy.get('#password-confirmation').type(password).click()
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The email must be a valid email address.')
                  .should('have.class', 'alert')
  })

   // ovo nismo Radili  
   it('GA-60 : Register page test - Password Confirm input field empty', () => {
    cy.visit('/register')  
    cy.get('#first-name').type(firstName).click()
    cy.get('#last-name').type(lastName).click()
    cy.get('#email').type(email).click()   
    cy.get('#password').type(password).click()
    cy.get('#password-confirmation').type('').click()
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'Please fill out this field')
                  .should('have.class', 'alert')
  })

  it('GA-81 : Confirmation password doesnt match', () => {
    cy.visit('/register')  
    cy.get('#first-name').type(firstName).click()
    cy.get('#last-name').type(lastName).click()
    cy.get('#email').type(email).click()   
    cy.get('#password').type(password).click()
    cy.get('#password-confirmation').type(password2).click()
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The password confirmation does not match.')
                  .should('have.class', 'alert')
  })

  it.only('GA-82 : Password form - invalid', () => {
    cy.visit('/register')  
    cy.get('#first-name').type(firstName)
    cy.get('#last-name').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type(testPassword)
    cy.get('[type="checkbox"]').check()
    cy.wait(1000)
    cy.get('[type=submit]').click() 
    cy.wait(1000)
    cy.get('.alert').should('be.visible')
                  .should('have.text', 'The password format is invalid.')
                  .should('have.class', 'alert')
  })

})

