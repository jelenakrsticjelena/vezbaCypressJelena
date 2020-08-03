import { EMAIL } from '../fixtures/constants'
import {authPage} from  '../page_object/login.page'
import {createGallery} from '../page_object/gallery.page'
import {GALLERY} from '../fixtures/constants'

let url1 = "https://gallery-app.vivifyideas.com/";
let image1 = "https://18ogess18pg1ptgub1nm316t-wpengine.netdna-ssl.com/wp-content/uploads/2020/04/21333414_web1_200420-CRM-earth-day-EARTHDAY_1.jpg";
let image2 = "https://www.e-know.ca/wp-content/uploads/2019/04/sunny.jpg";
let image3 = "https://webcomicms.net/sites/default/files/clipart/172845/picture-sunny-day-172845-7790010.jpg";

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
        createGallery.create('new gallery test', 'description of new gallery test', image1)
        // cy.get('#title').type('new gallery')
        // cy.get('#description').type('description of new gallery')
        // cy.get("[type=url]").type(image1)
        // cy.get("[type=button]").contains('Add image').click()
        // cy.get("[type=url]").eq(1).type(image2)
        // cy.get("[type=button]").contains('Add image').click()
        // cy.get("[type=url]").eq(2).type(image3)
        // cy.get("[type=submit]").contains('Submit').click()
        cy.url().should('eq', url1)
      });


      it('GA-12 : Create New Gallery Page - provera paginacije', () => {
        
        for (var i = 0; i <= 10; i++) {
          cy.visit('/create')
        createGallery.create('test gallery', 'description of test gallery', image1)
        }
        cy.visit('/my-galleries')
        cy.get('.grid').children().should('have.length', 10)
        //OVO NE   createGallery.create('new gallery','description of new gallery', image1)
      });
        
      it('GA-delete : Delete galleries from My galleries', () => {
      
       for (var i = 0; i < 10; i++) {
        cy.visit('/my-galleries')
        cy.get('.box-title').eq(0).click()
        cy.wait(1000)
        cy.get('.btn').contains('Delete Gallery').click()
      }   
      });

     
      it('GA-33 : Home Page - paginacija Logged in user 20 galleries', () => {
       
        cy.get('.nav-link').contains('Create Gallery').click();
        for (var i = 1; i < 11; i++) {
          cy.get('.nav-link').contains('Create Gallery').click();
          createGallery.create(GALLERY.NAME + i,'Description of No name gallery','https://www.kualitee.com/wp-content/uploads/2020/07/Importance-of-test-case-management-tools-for-startups.jpg');
          cy.wait('@galleries');
        }
        
        cy.get('.nav-link').contains('My Galleries').click();
        cy.get('div.grid').children().its('length').should('eq', 10);
        cy.get('.nav-link').contains('Create Gallery').click();
        createGallery.create('Galerija No name ++','Description of No name ++ gallery','https://jamiewright.dev/wp-content/uploads/2019/02/test.jpg');
        cy.wait(1000);

        cy.get('.nav-link').contains('My Galleries').click();
        cy.wait(1000);
        cy.get('button')
          .contains('Load More')
          .scrollIntoView()
          .should('be.visible');
          
        cy.get('button').contains('Load More').click();
        cy.get('div.grid').children().its('length').should('eq', 11);
        cy.get('.grid')
        .find('.cell')
        .then(listing => {

          cy.get('.listings-grid')
          .find('.listing')
          .then(listing => {
            const listingCount = Cypress.$(listing).length;
            expect(listing).to.have.length(listingCount);
          });


          // const listingCount = Cypress.$(listing).length;
          // expect(listing).to.have.length(listingCount);
          for (let i = 0; i < listingCount; i++) {
            cy.get('a')
              .contains(GALLERY.NAME)
              .click();
            cy.wait(1000);
        
            cy.get('button').contains('Delete Gallery').click();
            cy.wait('@galleries');
            cy.get('.nav-link').contains('My Galleries').click();
            cy.wait('@my-galleries');
          }
        });
        cy.get('h4').contains('No galleries found').should('be.visible')
      });

})