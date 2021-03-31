/// <reference types="cypress" />

describe('/pages/app/login', () => {
  it('preencha os campos e vá para página de perfil', () => {
    cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/login')
      .as('userLogin');

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

    // temos o token
    cy.wait('@userLogin').then((res) => {
      const { token } = res.response.body.data;

      cy.getCookie('APP_TOKEN')
        .should('exist')
        // token do cookie é o mesmo retornado no response da api
        .should('have.property', 'value', token);
    });
  });
});
