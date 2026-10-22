
// LOGIN

function preencherLogin(email, senha) {

    // Preencher os campos de login
    cy.get('[data-qa="login-email"]')
        .should('be.visible')
        .clear()
        .type(email)

    cy.get('[data-qa="login-password"]')
        .should('be.visible')
        .clear()
        .type(senha)

    // Clicar no botão de login
    cy.get('[data-qa="login-button"]')
        .should('be.visible')
        .click()
}

function verificarSeLoginFoiEfetuadoComSucesso(nomeUsuario = 'PGATS Aut') {

    // Validar o nome do usuário conectado
    cy.get('.navbar-nav', { timeout: 10000 })
        .should('be.visible')
        .and('contain.text', 'Logged in as')
        .and('contain.text', nomeUsuario)
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {

    // Validar a mensagem de erro
    cy.get('form[action*="login"] > p')
        .should('be.visible')
        .and('contain.text', 'Your email or password is incorrect!')
}

function efetuarLogout() {

    // Sair da conta
    cy.get('a[href*="logout"]')
        .should('be.visible').click()
        //.click()
}

function verificarSeOUsuarioFoiDeslogado() {

    // Verificar se voltou para a tela de login
    cy.get('.login-form > h2')
        .should('be.visible')

    cy.get('a[href*="logout"]')
        .should('not.exist')

    cy.get('[action*="login"]')
        .should('be.visible')

    cy.url().should('include', 'login')
}

module.exports = {
    preencherLogin,
    verificarSeLoginFoiEfetuadoComSucesso,
    verificarSeMensagemDeErroFoiExibidaNoLogin,
    efetuarLogout,
    verificarSeOUsuarioFoiDeslogado
}
