/// <reference types="cypress" />

describe('Automation Exercise', () => {
    //Cadastro
    //cy.get() -> elementos baseados em css selector
    // cy.contains() -> elementod baseados em texto

  it('CT01 - Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href*=login]').click()

    //const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type('PGATS Aut')
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)
    
    cy.get('[data-qa="signup-button"]').click()

    // radio buttons -> check
    cy.get('#id_gender2').check()
    
    cy.get('[data-qa="password"]').type('1234')

    //Seletcs e Comboboxes -> select
    cy.get('[data-qa="days"]').select('1')
    cy.get('[data-qa="months"]').select('September')
    cy.get('[data-qa="years"]').select('1990')

    // checkboxes -> check
    cy.get('#newsletter').check()
    cy.get('#optin').check()
    cy.get('[data-qa="first_name"]').type('PGATS')
    cy.get('[data-qa="last_name"]').type('Aut')
    cy.get('[data-qa="company"]').type('PGATS')
    cy.get('[data-qa="address"]').type('Example adress')
    
    cy.get('[data-qa="country"]').select('United States')
    cy.get('[data-qa="state"]').type('California')
    cy.get('[data-qa="city"]').type('San Francisco')
    cy.get('[data-qa="zipcode"]').type('12345')

    cy.get('[data-qa="mobile_number"]').type('999999999')

    cy.get('[data-qa="create-account"]').click()


    /**
     *  1 - IA Gerando asserções tradicionais
     */

    cy.get('[data-qa="create-account"]').click()
    cy.get('[data-qa="account-created"]')
      .should('be.visible')
      .and('contain', 'Account Created!')


  });

  it('CT02 - Efetuar o login de usuário com email e senha corretos', () => {
    // Arrange
    /**
     * Ter uma conta para efetuar o login
     * pgats-aut-test-1791939288941@mail.com / 1234
     */

    // acesso a página de login
    cy.visit('https://www.automationexercise.com/login')

    // Act
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791939288941@mail.com')
    cy.get('[data-qa="login-password"]').type('1234')

    cy.get('[data-qa="login-button"]').click()
    // cy.contains('Login')

    // Assertion
    cy.get('a > b').should('contain', 'PGATS Aut')
  });

  it('CT03 - Efetuar Login Usuário com email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    // Act
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791939288941@mail.com')
    cy.get('[data-qa="login-password"]').type('5553')

    cy.get('[data-qa="login-button"]').click()
    // Assertion
    cy.get('form[action*="login"] > p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Your email or password is incorrect!')
      .and('contain.text','Your email or password is incorrect!')
  });

  it('CT04 - Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    // Act
    cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791939288941@mail.com')
    cy.get('[data-qa="login-password"]').type('1234')

    cy.get('[data-qa="login-button"]').click()
    // Assert do Login
    cy.get('a[href*="logout"]')
      //.should('be.visible')
      .click()

    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="logout"]').should('not.exist')
    cy.get('[action*="login"]').should('be.visible')
    cy.url().should('include', 'login')
  });

  it('CT05 - Tentar cadastrar usuário com email já cdastrado', () => {
     cy.visit('https://www.automationexercise.com/')
    cy.get('a[href*=login]').click()

    //const timestamp = new Date().getTime()

    cy.get('[data-qa="signup-name"]').type('PGATS Aut')
    cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-1791939288941@mail.com`)
    
    cy.get('[data-qa="signup-button"]').click()

    cy.get('form[action*=signup] p')
      .should('exist')
      .should('be.visible')
      .should('contain', 'Email Address already exist!')
      .and('contain.text','Email Address already exist!')
  });

});