// CHECKOUT

/// <reference types="cypress" />

// Adicionar o primeiro produto ao carrinho
function adicionarProdutoAoCarrinho() {
    cy.get('.features_items .product-image-wrapper')
        .first()
        .find('a.add-to-cart')
        .first()
        .click({ force: true })

    cy.contains('Added!', { timeout: 10000 })
        .should('be.visible')
}

// Acessar o carrinho após adicionar o produto
function acessarCarrinho() {
    cy.contains('.modal-body a', 'View Cart')
        .should('be.visible')
        .click()
}

// Validar se o carrinho contém produtos
function verificarCarrinho() {
    cy.url().should('include', 'view_cart')

    cy.get('#cart_info')
        .should('be.visible')

    cy.get('#cart_info tbody tr')
        .should('have.length.greaterThan', 0)
}

// Prosseguir para o checkout
function prosseguirParaCheckout() {
    cy.contains('a', 'Proceed To Checkout')
        .should('be.visible')
        .click()
}

// Validar as informações apresentadas no checkout
function verificarDadosCheckout() {
    cy.contains('Address Details')
        .should('be.visible')

    cy.contains('Review Your Order')
        .should('be.visible')
}

// Preencher o comentário do pedido
function preencherComentario() {
    cy.get('textarea[name="message"]')
        .should('be.visible')
        .type('Pedido realizado para teste de automação.')
}

// Clicar em Place Order
function acessarPagamento() {
    cy.contains('a', 'Place Order')
        .should('be.visible')
        .click()
}

// Preencher os dados de pagamento
function realizarPagamento() {
    cy.get('[data-qa="name-on-card"]')
        .should('be.visible')
        .type('PGATS Aut')

    cy.get('[data-qa="card-number"]')
        .type('4111111111111111')

    cy.get('[data-qa="cvc"]')
        .type('123')

    cy.get('[data-qa="expiry-month"]')
        .type('12')

    cy.get('[data-qa="expiry-year"]')
        .type('2030')

    cy.get('[data-qa="pay-button"]')
        .click()
}

// Validar a confirmação do pedido
function verificarPedidoRealizado() {
    cy.contains(
        /order has been (placed successfully|confirmed)/i,
        { timeout: 10000 }
    ).should('be.visible')
}

module.exports = {
    adicionarProdutoAoCarrinho,
    acessarCarrinho,
    verificarCarrinho,
    prosseguirParaCheckout,
    verificarDadosCheckout,
    preencherComentario,
    acessarPagamento,
    realizarPagamento,
    verificarPedidoRealizado
}