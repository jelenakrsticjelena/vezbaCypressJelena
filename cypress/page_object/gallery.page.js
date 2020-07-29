export default class CreateGallery {
    get title() {
        return cy.get('#title')
    }

    get description() {
        return cy.get('#description')
    }

    get submitButton() {
        return cy.get("[type=submit]").contains('Submit')
    }

    get addImage() {
        return cy.get("[type=url]")
    }

    create(tajtl, opis, slike){
        this.title.type(tajtl)
        this.description.type(opis)
        this.addImage.type(slike)
        this.submitButton.click()
    }
}

export const createGallery = new CreateGallery()