/// <reference types="cypress" />

export default class LoginScreenPageObject {
  constructor(cy) {
    this.cy = cy;
    this.cy.visit('/app/login');
  }

  fillTheFormFields({ user, password }) {
    this.cy.get('#formCadastro input[name="usuario"]').type(user);
    this.cy.get('#formCadastro input[name="senha"]').type(password);
    return this;
  }

  submitForm() {
    this.cy.get('#formCadastro button[type="submit"]').click();
    return this;
  }
}
