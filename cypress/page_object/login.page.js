//const buttonslocator = '.ca-c-button'

export default class AuthPage {
    get email() {
        return cy.get('#email')
    }

    get password() {
        return cy.get('#password')
    }

    get loginButton() {
        return cy.get('button[type="submit"]')
    }

    // pipati da li smo ovo koristili
    // // get alert() {
    // //     return cy.get('.alert-danger')
    // }

    login(mejl, sifra) {
        this.email.type(mejl)
        this.password.type(sifra)
        this.loginButton.click()
    }
}

export const authPage = new AuthPage()