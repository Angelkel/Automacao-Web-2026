/// <reference types="cypress" />

const cadastro = require('../modules/cadastro/index')
const login = require('../modules/login/index')
const produtos = require('../modules/produtos/index')
const checkout = require('../modules/checkout/index')

describe('Automation Exercise', () => {

  it
    ('CT01 - Cadastrar um novo usuário com sucesso', () => {
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
    login.preencherLogin('pgats-aut-test-1791939288941@mail.com', '1234')

    // Assertion
    //verificarSeLoginFoiEfetuadoComSucesso   
    login.verificarSeLoginFoiEfetuadoComSucesso()
  });

  it('CT03 - Efetuar Login Usuário com email e senha INCORRETOS', () => {
    cy.visit('https://www.automationexercise.com/login')

    // Act
    login.preencherLogin('pgats-aut-test-1791939288941@mail.com', '5553')

    // Assertion
    // verificarSeMensagemDeErroFoiExibidaNoLogin()   
    login.verificarSeMensagemDeErroFoiExibidaNoLogin()
  });

  it('CT04 - Efetuar Logout', () => {
    cy.visit('https://www.automationexercise.com/login')

    //Act
    login.preencherLogin('pgats-aut-test-1791939288941@mail.com', '1234')

    //efetuarLogout
    login.efetuarLogout()

    //verificarSeOUsuarioFoiDeslogado    
    login.verificarSeOUsuarioFoiDeslogado()
  });

  it('CT05 - Tentar cadastrar usuário com email já cadastrado', () => {
    cy.visit('https://www.automationexercise.com/')
    cy.get('a[href*=login]').click()

    cadastro.iniciarCadastro('PGATS Aut', `pgats-aut-test-1791939288941@mail.com`)

    //verificarSeMensagemDeCadastroExistenteFoiExibida
    cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida()
  });

  it('CT08: Verificar todos os produtos e a página de detalhes do produto', () => {
    cy.visit('https://www.automationexercise.com')

    // Verificar se a página inicial está visível
    cy.contains('Full-Fledged practice website for Automation Engineers')
      .should('be.visible')

    // Acessar a lista de produtos
    produtos.acessarProdutos()
    produtos.verificarListaProdutos()

    // Abrir os detalhes do primeiro produto
    produtos.abrirDetalhesProduto()

    // Validar as informações do produto
    cy.get('.product-information')
      .should('contain.text', 'Category:')
      .and('contain.text', 'Rs.')
      .and('contain.text', 'Availability:')
      .and('contain.text', 'Condition:')
      .and('contain.text', 'Brand:')
    // cy.visit('https://www.automationexercise.com')
    // cy.contains('Full-Fledged practice website for Automation Engineers').should('be.visible')
    // cy.get('a[href*="products"]').first().click()
    // cy.contains('All Products').should('be.visible')
    // cy.get('.features_items .product-image-wrapper').should('be.visible')
    // cy.get('.features_items a[href*="/product_details/"]').first().click()

    // cy.url().should('include', '/product_details/')
    // cy.get('.product-information h2').should('be.visible')
    // cy.get('.product-information').should('contain.text', 'Category:')
    //   .and('contain.text', 'Rs.')
    //   .and('contain.text', 'Availability:')
    //   .and('contain.text', 'Condition:')
    //   .and('contain.text', 'Brand:')
  });


  it('CT09: Pesquisar produtos e validar os resultados', () => {

    // 1. Acessar o site
    cy.visit('https://www.automationexercise.com/')

    // 2. Validar se a página inicial foi carregada
    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Full-Fledged practice website for Automation Engineers')

    // 3. Acessar a página de produtos
    produtos.acessarProdutos()

    // 4. Validar a página All Products
    produtos.verificarPaginaProdutos()

    // 5. Validar se a lista de produtos está disponível
    produtos.verificarListaProdutos()

    // 6. Pesquisar o produto pelo nome e validar os resultados
    produtos.pesquisarProduto('Blue Top')
  });


  it('CT10: Verificar inscrição na newsletter da página inicial', () => {

    // Acessar o site e verificar a página inicial
    cy.visit('https://www.automationexercise.com/')

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Full-Fledged practice website for Automation Engineers')

    // Localizar a área de inscrição no rodapé
    cy.get('#footer').scrollIntoView()

    cy.contains('h2', 'Subscription')
      .should('be.visible')

    // Preencher o e-mail para realizar a inscrição
    cy.get('#susbscribe_email')
      .should('be.visible')
      .type(`teste${Date.now()}@email.com`)

    // Clicar no botão para confirmar a inscrição
    cy.get('#subscribe').click()

    // Validar a mensagem de sucesso
    cy.contains('You have been successfully subscribed!')
      .should('be.visible')

  });

  it('CT15: Realizar pedido com cadastro antes do checkout', () => {

    // 1. Acessar o site e validar a página inicial
    cy.visit('https://www.automationexercise.com/')

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Full-Fledged practice website for Automation Engineers')

    // 2. Acessar a tela de cadastro
    cy.contains('a', 'Signup / Login').click()

    cy.contains('h2', 'New User Signup!')
      .should('be.visible')

    // 3. Criar uma nova conta
    cadastro.iniciarCadastro(
      'PGATS Aut',
      `pgats-aut-test-${Date.now()}@mail.com`
    )

    cadastro.preencherCadastro()

    // 4. Validar a criação da conta
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso()

    // 5. Continuar após o cadastro
    cy.get('[data-qa="continue-button"]').click()

    // 6. Confirmar que o usuário está conectado
    cy.get('.navbar-nav')
      .should('contain.text', 'PGATS Aut')

    // 7. Acessar a página de produtos
    produtos.acessarProdutos()
    produtos.verificarPaginaProdutos()
    produtos.verificarListaProdutos()

    // 8. Adicionar produto ao carrinho
    checkout.adicionarProdutoAoCarrinho()

    // 9. Acessar o carrinho
    checkout.acessarCarrinho()

    // 10. Validar o carrinho
    checkout.verificarCarrinho()

    // 11. Prosseguir para o checkout
    checkout.prosseguirParaCheckout()

    // 12. Validar os dados do endereço e o resumo do pedido
    checkout.verificarDadosCheckout()

    // 13. Preencher comentário do pedido
    checkout.preencherComentario()

    // 14. Acessar a tela de pagamento
    checkout.acessarPagamento()

    // 15. Preencher os dados e realizar o pagamento
    checkout.realizarPagamento()

    // 16. Validar a confirmação do pedido
    checkout.verificarPedidoRealizado()

    // 17. Excluir a conta criada no teste
    cy.contains('a', 'Delete Account').click()

    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain.text', 'Account Deleted!')

    cy.get('[data-qa="continue-button"]').click()
  });



  it.only('CT16: Realizar pedido com login antes do checkout', () => {

    // 1. Acessar o site e validar a página inicial
    cy.visit('https://www.automationexercise.com/')

    cy.get('body')
      .should('be.visible')
      .and('contain.text', 'Full-Fledged practice website for Automation Engineers')

    // 2. Acessar a tela de login
    cy.contains('a', 'Signup / Login').click()

    // 3. Realizar login com uma conta já cadastrada
    login.preencherLogin(
      'pgats-aut-test-1791939288941@mail.com',
      '1234'
    )

    // 4. Validar se o login foi realizado
    login.verificarSeLoginFoiEfetuadoComSucesso()

    // 5. Acessar a página de produtos
    produtos.acessarProdutos()
    produtos.verificarPaginaProdutos()
    produtos.verificarListaProdutos()

    // 6. Adicionar produto ao carrinho
    checkout.adicionarProdutoAoCarrinho()

    // 7. Acessar o carrinho
    checkout.acessarCarrinho()

    // 8. Validar se o carrinho está sendo exibido
    checkout.verificarCarrinho()

    // 9. Prosseguir para o checkout
    checkout.prosseguirParaCheckout()

    // 10. Validar endereço e resumo do pedido
    checkout.verificarDadosCheckout()

    // 11. Preencher comentário do pedido
    checkout.preencherComentario()

    // 12. Clicar em Place Order
    checkout.acessarPagamento()

    // 13. Preencher dados e realizar o pagamento
    checkout.realizarPagamento()

    // 14. Validar a confirmação do pedido
    checkout.verificarPedidoRealizado()

    // 15. Excluir a conta utilizada no teste
    cy.contains('a', 'Delete Account').click()

    // 16. Validar a exclusão da conta
    cy.get('[data-qa="account-deleted"]')
      .should('be.visible')
      .and('contain.text', 'Account Deleted!')

    // 17. Continuar após a exclusão
    cy.get('[data-qa="continue-button"]').click()

  });

});
