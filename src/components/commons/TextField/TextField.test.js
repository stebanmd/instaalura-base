import React from 'react';
import user from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import TextField from './index';
import { render } from '../../../infra/test/testUtils';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="Nome"
        value="Test"
        name="nome"
        onChange={() => {}}
      />
      ,
    );

    const textField = screen.getByPlaceholderText(/nome/i);
    expect(textField).toMatchSnapshot();
  });

  describe('when field is valid', () => {
    describe('and user is typing', () => {
      test('the value must be updated', () => {
        const onChangeMock = jest.fn();
        render(
          <TextField
            placeholder="Nome"
            value=""
            name="nome"
            onChange={onChangeMock}
            isTouched
          />
          ,
        );

        const textField = screen.getByPlaceholderText(/nome/i);
        user.type(textField, 'Simple Test');
        expect(onChangeMock).toHaveBeenCalledTimes(11);
      });
    });
  });

  describe('when field is invalid', () => {
    test('displays the respective error message', () => {
      render(
        <TextField
          placeholder="Email"
          value="dev@test.com"
          name="email"
          onChange={() => {}}
          isTouched
          error="O campo email é obrigatório"
        />
        ,
      );

      const inputEmail = screen.getByPlaceholderText(/email/i);
      expect(inputEmail).toHaveValue('dev@test.com');
      expect(screen.getByRole('alert')).toHaveTextContent('O campo email é obrigatório');
      expect(inputEmail).toMatchSnapshot();
    });
  });
});
