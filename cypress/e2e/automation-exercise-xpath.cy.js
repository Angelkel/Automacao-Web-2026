
/// <reference types="cypress" />

describe('Automation Exercise Xpath', () => {

    const senha = '1234'

    const acessarLogin = () => {
        cy.visit('https://www.automationexercise.com')
        cy.xpath('//a[contains(@href, "login")]').click()
    }

    const cadastrarUsuario = (email) => {
        acessarLogin()

        cy.xpath('//*[@data-qa="signup-name"]').type('PGATS Aut')
        cy.xpath('//*[@data-qa="signup-email"]').type(email)
        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.xpath('//*[@id="id_gender2"]').check()
        cy.xpath('//*[@data-qa="password"]').type(senha)
        cy.xpath('//*[@data-qa="days"]').select('10')
        cy.xpath('//*[@data-qa="months"]').select('May')
        cy.xpath('//*[@data-qa="years"]').select('1995')

        cy.xpath('//*[@id="newsletter"]').check()
        cy.xpath('//*[@id="optin"]').check()

        cy.xpath('//*[@data-qa="first_name"]').type('Angelica')
        cy.xpath('//*[@data-qa="last_name"]').type('Oliveira')
        cy.xpath('//*[@data-qa="company"]').type('Empresa QA')
        cy.xpath('//*[@data-qa="address"]').type('Rua das Flores, 120')
        cy.xpath('//*[@data-qa="country"]').select('Canada')
        cy.xpath('//*[@data-qa="state"]').type('Ontario')
        cy.xpath('//*[@data-qa="city"]').type('Toronto')
        cy.xpath('//*[@data-qa="zipcode"]').type('12345')
        cy.xpath('//*[@data-qa="mobile_number"]').type('999999999')

        cy.xpath('//*[@data-qa="create-account"]').click()

        cy.contains('Account Created!').should('be.visible')
        cy.xpath('//*[@data-qa="continue-button"]').click()

        cy.contains('Logged in as PGATS Aut').should('be.visible')
    }

    it('Caso de Teste 01: Cadastrar um usuário', () => {
        const email = `angelica.cadastro.${Date.now()}@example.com`

        cadastrarUsuario(email)
    })

    it('Caso de Teste 02: Login com email e senha corretos', () => {
        const email = `angelica.login.${Date.now()}@example.com`

        cadastrarUsuario(email)

        cy.xpath('//a[contains(@href, "logout")]').click()
        acessarLogin()

        cy.xpath('//*[@data-qa="login-email"]').type(email)
        cy.xpath('//*[@data-qa="login-password"]').type(senha)
        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.contains('Logged in as PGATS Aut').should('be.visible')
    })

    it('Caso de Teste 03: Login com email e senha incorretos', () => {
        acessarLogin()

        cy.xpath('//*[@data-qa="login-email"]')
            .type(`usuario.invalido.${Date.now()}@example.com`)

        cy.xpath('//*[@data-qa="login-password"]').type('SenhaErrada123')
        cy.xpath('//*[@data-qa="login-button"]').click()

        cy.contains('Your email or password is incorrect!')
            .should('be.visible')
    })

    it('Caso de Teste 04: Deslogar usuário', () => {
        const email = `angelica.logout.${Date.now()}@example.com`

        cadastrarUsuario(email)

        cy.xpath('//a[contains(@href, "logout")]').click()

        cy.url().should('include', '/login')
        cy.contains('Login to your account').should('be.visible')
    })

    it('Caso de Teste 05: Cadastrar usuário com email já existente', () => {
        const email = `angelica.duplicado.${Date.now()}@example.com`

        cadastrarUsuario(email)

        cy.xpath('//a[contains(@href, "logout")]').click()
        acessarLogin()

        cy.xpath('//*[@data-qa="signup-name"]').type('PGATS Aut')
        cy.xpath('//*[@data-qa="signup-email"]').type(email)
        cy.xpath('//*[@data-qa="signup-button"]').click()

        cy.contains('Email Address already exist!')
            .should('be.visible')
    })

})
