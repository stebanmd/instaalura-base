/// <reference types="cypress" />

describe('/pages/app/login', () => {
  it('preencha os campos e vá para página de perfil', () => {
    cy.visit('/app/login');

    // preencher usuário
    cy.get('#formCadastro input[name="usuario"]')
      .type('steban');

    // preencher senha
    cy.get('#formCadastro input[name="senha"]')
      .type('senhasegura');

    // clicar em submit
    cy.get('#formCadastro button[type="submit"]').click();

    // checkar o esperado
    cy.url().should('include', '/app/profile');
  });
});
