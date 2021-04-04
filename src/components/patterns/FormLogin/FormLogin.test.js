import React from 'react';
import user from '@testing-library/user-event';
import FormLogin from './index';
import {
  render, act, screen, waitFor,
} from '../../../infra/test/testUtils';

const onSubmit = jest.fn();
onSubmit.mockImplementation((e) => {
  e.preventDefault();
});

describe('<FormLogin />', () => {
  describe('when form fields are valid', () => {
    test('complete the submission', async () => {
      await act(async () => {
        render(
          <FormLogin
            onSubmit={onSubmit}
          />
          ,
        );
      });

      const btnSubmit = screen.getByRole('button');
      expect(btnSubmit).toBeDisabled();

      const inputUsuario = screen.getByPlaceholderText(/usuário/i);
      user.type(inputUsuario, 'someusername');
      await waitFor(() => expect(inputUsuario).toHaveValue('someusername'));

      const inputSenha = screen.getByPlaceholderText(/senha/i);
      user.type(inputSenha, 'somepassword');
      await waitFor(() => expect(inputSenha).toHaveValue('somepassword'));

      expect(btnSubmit).not.toBeDisabled();
      user.click(btnSubmit);

      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the form fields are invalid', () => {
    test('display the respective errors', async () => {
      render(<FormLogin onSubmit={onSubmit} />);

      const inputUsuario = screen.getByPlaceholderText(/usuário/i);
      inputUsuario.focus();
      inputUsuario.blur();

      await waitFor(() => screen.getByRole('alert'));
      expect(screen.getByRole('alert')).toHaveTextContent('Campo obrigatório');

      user.type(inputUsuario, 'a');
      await waitFor(() => screen.getByRole('alert'));
      expect(screen.getByRole('alert')).toHaveTextContent('Preencha pelo menos 3 caracteres');
    });
  });
});
