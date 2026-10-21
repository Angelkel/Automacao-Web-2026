
// LOGIN

function preencherLogin(email, senha) {

    // Preencher os campos de login
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)

    cy.get('[data-qa="login-button"]').click()
}


function verificarSeLoginFoiEfetuadoComSucesso(nomeUsuario = 'PGATS Aut') {

    // Validar se a mensagem de usuário conectado aparece no menu
    cy.contains('.navbar-nav a', 'Logged in as')
        .should('be.visible')
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
        .should('be.visible')
        .click()
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
