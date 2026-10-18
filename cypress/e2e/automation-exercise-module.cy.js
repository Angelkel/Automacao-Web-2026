/// <reference types="cypress" />

const cadastro = require('../modules/cadastro/index')

describe('Automation Exercise', () => {
  //Cadastro
  //cy.get() -> elementos baseados em css selector
  // cy.contains() -> elementod baseados em texto

  it('CT01 - Cadastrar um novo usuário com sucesso', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href*=login]').click()

    /** Iniciar cadastro */
    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-${Date.now()}@mail.com`)
    /** Iniciar cadastro */

    /** Preencher cadastro */
    cadastro.preencherCadastro()
    /** Preencher cadastro */

    /** Verificar cadastro efetuado */
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()
    /** Verificar cadastro efetuado */

  });

  it('CT02 - Efetuar o login de usuário com email e senha corretos', () => {
    // Arrange
    //Ter uma conta para efetuar o login: pgats-aut-test-1791939288941@mail.com / 1234
    
    // acesso a página de login
    cy.visit('https://www.automationexercise.com/login')

    // Act
    preencherLogin('pgats-aut-test-1791939288941@mail.com', '1234')

    // Assertion
    //verificarSeLoginFoiEfetuadoComSucesso   
    verificarSeLoginFoiEfetuadoComSucesso()
   });

  it('CT03 - Efetuar Login Usuário com email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    // Act
    preencherLogin('pgats-aut-test-1791939288941@mail.com', '5553')

    // Assertion
    // verificarSeMensagemDeErroFoiExibidaNoLogin()   
    verificarSeMensagemDeErroFoiExibidaNoLogin()
  });

  it('CT04 - Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    //Act
    preencherLogin('pgats-aut-test-1791939288941@mail.com', '1234')

    //efetuarLogout
    efetuarLogout()

    //verificarSeOUsuarioFoiDeslogado    
    verificarSeOUsuarioFoiDeslogado()
  });

  it.only('CT05 - Tentar cadastrar usuário com email já cadastrado', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href*=login]').click()

    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-1791939288941@mail.com`)

    //verificarSeMensagemDeCadastroExistenteFoiExibida
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
  });

});

// CADASTRO

// function iniciarCadastro(nome, email) {

//   // cy.get('[data-qa="signup-name"]').type('PGATS Aut')
//   // cy.get('[data-qa="signup-email"]').type(`pgats-aut-test-${Date.now()}@mail.com`)
//   cy.get('[data-qa="signup-name"]').type(nome)
//   cy.get('[data-qa="signup-email"]').type(email)

//   cy.get('[data-qa="signup-button"]').click()
// }

// function preencherCadastro() {
//   cy.get('#id_gender2').check()

//   cy.get('[data-qa="password"]').type('1234')

//   //Seletcs e Comboboxes -> select
//   cy.get('[data-qa="days"]').select('1')
//   cy.get('[data-qa="months"]').select('September')
//   cy.get('[data-qa="years"]').select('1990')

//   // checkboxes -> check
//   cy.get('#newsletter').check()
//   cy.get('#optin').check()
//   cy.get('[data-qa="first_name"]').type('PGATS')
//   cy.get('[data-qa="last_name"]').type('Aut')
//   cy.get('[data-qa="company"]').type('PGATS')
//   cy.get('[data-qa="address"]').type('Example adress')

//   cy.get('[data-qa="country"]').select('United States')
//   cy.get('[data-qa="state"]').type('California')
//   cy.get('[data-qa="city"]').type('San Francisco')
//   cy.get('[data-qa="zipcode"]').type('12345')

//   cy.get('[data-qa="mobile_number"]').type('999999999')

//   cy.get('[data-qa="create-account"]').click()
// }

// function verificarSeCadastroFoiEfetuadoComSucesso() {
//   cy.get('[data-qa="create-account"]').click()
//   cy.get('[data-qa="account-created"]')
//     .should('be.visible')
//     .and('contain', 'Account Created!')
// }

// LOGIN
function preencherLogin(email, senha) {
  /* preencherLogin*/

  // Act
  //cy.get('[data-qa="login-email"]').type('pgats-aut-test-1791939288941@mail.com')
  //cy.get('[data-qa="login-password"]').type('1234')

  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(senha)


  cy.get('[data-qa="login-button"]').click()
}

function verificarSeLoginFoiEfetuadoComSucesso() {
  // Assertion   
  cy.contains('.navbar-nav li', 'PGATS Aut')

  cy.get('.navbar-nav li')
    .contains('PGATS Aut')
    .should('be.visible')
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
  cy.get('form[action*="login"] > p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Your email or password is incorrect!')
    .and('contain.text', 'Your email or password is incorrect!')
}

function efetuarLogout() {
  cy.get('a[href*="logout"]')
    //.should('be.visible')
    .click()
}

function verificarSeOUsuarioFoiDeslogado() {
  cy.get('.login-form > h2').should('be.visible')
  cy.get('a[href*="logout"]').should('not.exist')
  cy.get('[action*="login"]').should('be.visible')
  cy.url().should('include', 'login')
}

// function verificarSeMensagemDeCadastroExistenteFoiExibida() {
//   cy.get('form[action*=signup] p')
//     .should('exist')
//     .should('be.visible')
//     .should('contain', 'Email Address already exist!')
//     .and('contain.text', 'Email Address already exist!')
// }

