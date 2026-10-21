// PRODUTOS

/// <reference types="cypress" />

// Acessar a página de produtos
function acessarProdutos() {
    cy.contains('a', 'Products').click()

    cy.url().should('include', '/products')
}

// Verificar se chegou à página de todos os produtos
function verificarPaginaProdutos() {
    cy.contains('All Products').should('be.visible')
}

// Verificar se a lista de produtos está disponível
function verificarListaProdutos() {
    cy.get('.features_items')
        .should('be.visible')

    cy.get('.features_items .product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .and('be.visible')
}

// Abrir os detalhes do primeiro produto
function abrirDetalhesProduto() {
    cy.get('.features_items a[href*="/product_details/"]')
        .first()
        .click()

    // Verificar se foi direcionado para os detalhes
    cy.url().should('include', '/product_details/')

    // Verificar se o nome do produto está visível
    cy.get('.product-information h2')
        .should('be.visible')
        .and('not.be.empty')
}

// Pesquisar um produto pelo nome
function pesquisarProduto(nomeProduto) {
    // Preencher o campo de pesquisa
    cy.get('#search_product')
        .should('be.visible')
        .clear()
        .type(nomeProduto)

    // Clicar no botão de pesquisa
    cy.get('#submit_search').click()

    // Verificar a seção de produtos pesquisados
    cy.contains('h2', 'Searched Products')
        .should('be.visible')

    // Verificar se existem produtos nos resultados
    cy.get('.features_items .product-image-wrapper')
        .should('have.length.greaterThan', 0)
        .each(($produto) => {
            cy.wrap($produto).should('be.visible')
        })

    // Verificar se os resultados correspondem à pesquisa
    cy.get('.features_items')
        .should('contain.text', nomeProduto)
}

module.exports = {
    acessarProdutos,
    verificarPaginaProdutos,
    verificarListaProdutos,
    abrirDetalhesProduto,
    pesquisarProduto
}
