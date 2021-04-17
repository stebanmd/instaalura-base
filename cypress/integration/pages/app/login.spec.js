/// <reference types="cypress" />
import LoginScreenPageObject from '../../../../src/components/screens/app/LoginScreen/LoginScreen.pageObject';
import { LOGIN_COOKIE_APP_TOKEN } from '../../../../src/services/login/loginService';

describe('/pages/app/login', () => {
  describe('when fill and submit a form login request', () => {
    it('go to the profile page', () => {
      // pré-teste
      cy.intercept('https://instalura-api-git-master-omariosouto.vercel.app/api/login')
        .as('userLogin');

      // cenário
      const loginScreen = new LoginScreenPageObject(cy);
      loginScreen
        .fillTheFormFields({ user: 'steban', password: 'senhasegura' })
        .submitForm();

      // Asserçoes
      cy.url().should('include', '/app/profile');

      cy.wait('@userLogin').then((res) => {
        const { token } = res.response.body.data;

        cy.getCookie(LOGIN_COOKIE_APP_TOKEN)
          .should('exist')
          .should('have.property', 'value', token);
      });
    });
  });
});
